import shortId from 'shortid';
import UserModel from '../schema/user.js';    
    
   // authoriseUser, 
    //login

export const createUser=async(req, res)=>{
    const {userId, password, type} = req.body;
    const userIdExists=await UserModel.findOne({userId});

    if(userIdExists){
        res.status(400).json({"message":"userId already exists"});
        throw new Error('userId already Exists');
    }

    const id=shortId.generate();
    const user = await UserModel.create({
        id,
        userId,
        password,
        type
    })

    if (user) {
        res.status(201).json({
        id: user.id,
        userId: user.userId,
        password: user.password,
        type:user.type
        })
    } else {
        res.status(400).json({message:"Invalid user data"});
        throw new Error('Invalid user data')
    }
}

export const getAllUsers=async(req, res)=>{
    const allUsers=await UserModel.find();
    console.log(allUsers);
    if(allUsers){
        res.json(allUsers);
    } else {
        res.status(404);
        throw new Error('User Not Found');
    }
}


export const deleteUser=async(req, res)=>{
    const user=await UserModel.findOne({'id':req.param.id});

    if(user){
        await user.remove();
        res.json({message:'user removed'});
    } else {
        res.status(404);
        throw new Error('User Not Found');
    }
}

/* login */
export const login=async(req, res)=>{
    const {userId, password}=req.body;

    const user=await UserModel.findOne({userId});

    if(user && (await user.matchPassword(password))){
        res.json({
            id:user.id,
            userId:user.userId,
            type:user.type,
            isAuthorised:true
        })
    } else{
        res.status(401);
        throw new Error('Invalid userId or')
    }

}