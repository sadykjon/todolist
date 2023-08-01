import {Schema, model, Types} from 'mongoose';

const PostSchema = new Schema({
    owner: {
        type : Types.ObjectId,
        ref : 'User'
    },
    
    description: {
        type: String,
        required:true
    },
    
})

export default model('Post', PostSchema)