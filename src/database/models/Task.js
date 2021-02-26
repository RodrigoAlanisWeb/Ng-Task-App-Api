import { Schema,model } from 'mongoose'


const TaskSchema = new Schema({
    title: String,
    content: String,
    done: {
        type: Boolean,
        default: false
    },
    author: {type: Schema.Types.ObjectId,ref:'User'}
})

module.exports = model('Task',TaskSchema)