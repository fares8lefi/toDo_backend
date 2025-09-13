const taskModel = require("../models/taskSchema");

module.exports.addTask = async (req, res) => {
  try {
    const { title, description, completed, user } = req.body;
    const task = await taskModel.create({
      title,
      description,
      completed,
      user,
    });
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getTask = async (req, res) => {
  try {
    const tasks = await taskModel.find();
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.updateTaskStatus = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    
    const findTask = await taskModel.findById(taskId);
    if (!findTask) {
      return res.status(404).json({ message: "task not found" });
    }
    const update = await taskModel.findByIdAndUpdate(
      taskId,
      {
        completed: true,
      },
      { new: true }
    );

    res.status(200).json({ update });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const findTask = await taskModel.findById(taskId);
    if (!findTask) {
      return res.status(404).json({ message: "task not found" });
    }
    const deleteTa = await taskModel.findByIdAndDelete(taskId)

    res.status(200).json({ message:"task remove succeffely" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};