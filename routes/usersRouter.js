var express = require('express');
var router = express.Router();
const userController= require("../controllers/userController")
/* GET users listing. */
router.post('/addUser',userController.addUser);
router.delete('/deleteUser/:id',userController.deleteUser);


module.exports = router;
