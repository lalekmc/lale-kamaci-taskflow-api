const express = require('express');
const taskRoutes = require('./taskRoutes');
const reportRoutes = require('./reportRoutes');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'TaskFlow API çalışıyor',
    endpoints: {
      tasks: ['GET /tasks', 'GET /tasks/:id', 'POST /tasks', 'PUT /tasks/:id', 'DELETE /tasks/:id'],
      reports: ['GET /reports/completed', 'GET /reports/pending', 'GET /reports/summary']
    }
  });
});

router.use('/tasks', taskRoutes);
router.use('/reports', reportRoutes);

module.exports = router;
