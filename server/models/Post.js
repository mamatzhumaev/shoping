import {Schema, model} from "mongoose";

const PostSchema= new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    images:String,
    created:{
        type:Date,
        default:Date.now()
    }
})
export default model("Post", PostSchema)