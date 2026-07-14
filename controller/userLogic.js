import User from "../model/user.js";

const createUser = async (req,res)=>{
    try{
        const{name,email,empId}=req.body;

        console.log(name,email,empId);
        
        if(!name|| !email||!empId){
            return res.status(404).json({
                message:'data not found'
            })
        }

        const user= await User.create ({name,email,empId})
        console.log(user);

        // send response to user

        res.status(200).json({
            success:true,
            user,
            message:'data created successfully',
        })


    }catch(error){
        res.status(404).json({
            success:false,
            message:"data not created",error
        })
    }
}
const getUser = async(req,res)=>{
    try{
        console.log('hii');
        let user = await User.find()

        if(!user){
            return res.status(404).json({
                message:"data not found....",
                success:false
            })
        }
        res.status(200).json({
            success:true,
            user
        })
    } catch(error){
        res.status(500).json({
            success:true,
            message:'server error',error

        })
    }

}

const updateUser = async(req,res)=>{
    try {
         const {name, email, empId} = req.body

        let {userid} = req.params    // coming from api
        let user = await User.findById(userid)       //get data from userId

        if(!user){
            return res.status(404).json({
                message:'user not found...',
                success:false
            })
        }

        let updatedUser = user


        if(name){
            updatedUser = await User.findByIdAndUpdate(userid, {name}, {new:true})  //{new:true} => store new value to updatedUser
        }
        
        if(email){
            updatedUser = await User.findByIdAndUpdate(userid, {email}, {new:true})

        }

        if(empId){
            updatedUser = await User.findByIdAndUpdate(userid, {empId}, {new:true})

        }


        res.status(200).json({
            message:'data updated successfully...',
            updateUser,
            success:true
        })

    } catch (error) {
            res.status(500).json({
                message:'failed to updated data internal server error',
                success:false
            })
    }
}

const deleteUser = async (req,res)=>{
    try {
        const {userid} = req.params

       let deleteduser = await  User.findByIdAndDelete(userid)

       res.status(200).json({
        success:true,
        message:'user deleted successfully....',
        deleteUser
       })



        


    } catch (error) {
        res.status(500).json({
            success:false,
            message:'failed to delete user'
        })
    }

}


export { createUser, getUser, updateUser, deleteUser}