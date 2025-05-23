import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import bcrypt from 'bcryptjs';


const UserSchema=new Schema({
    id:{type:String, unique:true},
    userId:{type:String, default:''},
    type:{type:String, default:''},
    password:{type:String, default:''},
    isAuthorised:{type:Boolean, default:false}
})

UserSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

UserSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }

    const salt =await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const UserModel = mongoose.model('user', UserSchema);
export default UserModel;
