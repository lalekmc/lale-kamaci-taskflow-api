const { readTasks } = require('../utils/fileDb');
const { STATUSES, PRIORITIES } = require('../config/constants');

function countBy(tasks, key, keys) {
  const result = {};
  (keys || []).forEach((k) => (result[k] = 0));
  tasks.forEach((t) => {
    const value = t[key] || 'atanmamış';
    result[value] = (result[value] || 0) + 1;
  });
  return result;
}

function isOverdue(task, today) {
  return task.status !== 'completed' && task.dueDate && task.dueDate.slice(0, 10) < today;
}

exports.getCompleted = (req, res) => {
  const completed = readTasks().filter((t) => t.status === 'completed');
  res.json({ success: true, data: { count: completed.length, tasks: completed } });
};

exports.getPending = (req, res) => {
  const pending = readTasks().filter((t) => t.status === 'pending');
  res.json({ success: true, data: { count: pending.length, tasks: pending } });
};

exports.getSummary = (req, res) => {
  const tasks = readTasks();
  const today = new Date().toISOString().slice(0, 10);
  const completed = tasks.filter((t) => t.status === 'completed').length;

  res.json({
    success: true,
    data: {
      totalTasks: tasks.length,
      completedTasks: completed,
      pendingTasks: tasks.filter((t) => t.status === 'pending').length,
      inProgressTasks: tasks.filter((t) => t.status === 'in-progress').length,
      overdueTasks: tasks.filter((t) => isOverdue(t, today)).length,
      completionRate: tasks.length ? Math.round((completed / tasks.length) * 10000) / 100 : 0,
      byStatus: countBy(tasks, 'status', STATUSES),
      byPriority: countBy(tasks, 'priority', PRIORITIES),
      byAssignee: countBy(tasks, 'assignee'),
      byProject: countBy(tasks, 'project'),
      generatedAt: new Date().toISOString()
    }
  });
};
