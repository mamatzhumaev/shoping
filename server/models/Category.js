import {Schema, model} from "mongoose";

const PostSchema= new Schema({
    category:{
        type:String,
        required:true
    }
})
export default model("Category", PostSchema)