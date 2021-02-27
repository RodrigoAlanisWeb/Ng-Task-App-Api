import mongoose from 'mongoose'

const db = mongoose.connect("mongodb+srv://Rodriigo:Arkpexps4@cluster0.sy38t.mongodb.net/ng-task-app",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db => {
    console.log("Database Conected");
}).catch(err => {
    console.log(err);
})


module.exports = db