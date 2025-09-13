const userModel =require('../models/userSchema');
const mongoose= require("mongoose")
module.exports.addUser= async(req ,res)=>{
    try{
         const {username , password , email} = req.body
        const user= await userModel.create({
         username ,
         email ,
         password
        })

      res.status(200).json({user}) ;  
    }catch(error){
      res.status(500).json({message:error.message})     
    }
}



module.exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("user uid == ", id);

    const findUser = await userModel.findById(id);
    console.log(findUser);
    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }
    await userModel.findByIdAndDelete(id);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message });
  }
};
