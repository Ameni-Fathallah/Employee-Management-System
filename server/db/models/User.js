//Model APP User
import mongoose from "mongoose";// mongoose is used for MongoDB object modeling

//the Schema for our user : this is the structure of suser document in the Mongodb database
const userSchema =new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},//it will be hashed before saving the databse
    role:{type:String,enum:["admin","employee"],required:true},
    profileImage:{type:String},
    createAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now},
})

//User model
// mongoose.model() creates a new model based on the userSchema and binds it to the "User" collection in MongoDB
const User=mongoose.model("User",userSchema)

export default User;
/*User Model : Définit la structure des données pour chaque utilisateur dans MongoDB, incluant le nom, l'email, le mot de passe et le rôle.*/