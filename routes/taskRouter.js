var express = require('express');
var router = express.Router();
const taskController= require("../controllers/taskController")

router.post('/addTask',taskController.addTask)
router.get('/getTask',taskController.getTask)
router.put('/updateTaskStatus/:taskId',taskController.updateTaskStatus)
router.delete('/deleteTask/:taskId',taskController.deleteTask)

module.exports = router;