import mongoose from 'mongoose'

const db = mongoose.connect("mongodb://Rodriigo:Arkpexps4@cluster0.sy38t.mongodb.net/ng-task-app?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db => {
    console.log("Database Conected");
}).catch(err => {
    console.log(err);
})


module.exports = db