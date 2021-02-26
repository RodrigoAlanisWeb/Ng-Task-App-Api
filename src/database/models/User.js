import { Schema,model } from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}]
}) 

UserSchema.methods.verifyPassword = (async (password) => {
    const verify = await bcrypt.compare(password,this.password)
    return verify;
})

module.exports = model('User',UserSchema)