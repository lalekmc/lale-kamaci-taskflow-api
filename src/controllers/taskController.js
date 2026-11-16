const { readTasks, writeTasks, nextId } = require('../utils/fileDb');
const { STATUSES, PRIORITIES } = require('../config/constants');

const EDITABLE_FIELDS = ['title', 'description', 'status', 'priority', 'assignee', 'project', 'dueDate'];

function checkFields(body, isCreate) {
  if (isCreate && (!body.title || !String(body.title).trim())) {
    return 'title alanı zorunludur';
  }
  if (!isCreate && body.title !== undefined && !String(body.title).trim()) {
    return 'title boş olamaz';
  }
  if (body.status !== undefined && !STATUSES.includes(body.status)) {
    return `status şunlardan biri olmalıdır: ${STATUSES.join(', ')}`;
  }
  if (body.priority !== undefined && !PRIORITIES.includes(body.priority)) {
    return `priority şunlardan biri olmalıdır: ${PRIORITIES.join(', ')}`;
  }
  return null;
}

function findIndex(tasks, id) {
  return tasks.findIndex((t) => t.id === Number(id));
}

exports.createTask = (req, res) => {
  const body = req.body || {};
  const error = checkFields(body, true);
  if (error) return res.status(400).json({ success: false, message: error });

  const tasks = readTasks();
  const now = new Date().toISOString();
  const task = {
    id: nextId(tasks),
    title: String(body.title).trim(),
    description: body.description || '',
    status: body.status || 'pending',
    priority: body.priority || 'medium',
    assignee: body.assignee || null,
    project: body.project || null,
    dueDate: body.dueDate || null,
    createdAt: now,
    updatedAt: now
  };

  tasks.push(task);
  writeTasks(tasks);
  res.status(201).json({ success: true, message: 'Görev oluşturuldu', data: task });
};

exports.getTasks = (req, res) => {
  const tasks = readTasks();
  res.json({ success: true, count: tasks.length, data: tasks });
};

exports.getTaskById = (req, res) => {
  const tasks = readTasks();
  const task = tasks[findIndex(tasks, req.params.id)];
  if (!task) return res.status(404).json({ success: false, message: 'Görev bulunamadı' });
  res.json({ success: true, data: task });
};

exports.updateTask = (req, res) => {
  const body = req.body || {};
  const error = checkFields(body, false);
  if (error) return res.status(400).json({ success: false, message: error });

  const tasks = readTasks();
  const index = findIndex(tasks, req.params.id);
  if (index === -1) return res.status(404).json({ success: false, message: 'Görev bulunamadı' });

  EDITABLE_FIELDS.forEach((field) => {
    if (body[field] !== undefined) tasks[index][field] = field === 'title' ? String(body.title).trim() : body[field];
  });
  tasks[index].updatedAt = new Date().toISOString();

  writeTasks(tasks);
  res.json({ success: true, message: 'Görev güncellendi', data: tasks[index] });
};

exports.deleteTask = (req, res) => {
  const tasks = readTasks();
  const index = findIndex(tasks, req.params.id);
  if (index === -1) return res.status(404).json({ success: false, message: 'Görev bulunamadı' });

  const [deleted] = tasks.splice(index, 1);
  writeTasks(tasks);
  res.json({ success: true, message: 'Görev silindi', data: deleted });
};
