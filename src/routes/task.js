import { Router } from 'express'
import Task from '../database/models/Task'
import User from '../database/models/User'
import verifyToken from '../utils/verifyToken'

const router = Router()

router.post('/create', verifyToken, async (req, res) => {
    try {
        const { title, content } = req.body
        const task = await Task.create({
            title: title,
            content: content,
            author: req.user
        })
        const user = await User.findOne({ _id: req.user })
        user.tasks.push(task.id)
        user.save()

        return res.json({
            res: true,
            auth: true,
            task: task
        })
    } catch (error) {
        console.log(error);
        return res.json({
            res: false,
            auth: false,
            msg: "Error"
        })
    }
})

router.get('/tasks', verifyToken, async (req, res) => {
    try {
        const data = await User.findOne({ _id: req.user }).populate('tasks')

        return res.json({
            res: true,
            auth: true,
            data: data
        })
    } catch (error) {
        console.log(error);
        return res.json({
            res: false,
            auth: false,
            msg: "Error"
        })
    }
})

router.put('/update/:id', verifyToken, async (req, res) => {
    try {
        const { title, content } = req.body
        await Task.findOneAndUpdate({ _id: req.params.id, author: req.user }, {
            title: title,
            content: content
        })

        return res.json({
            res: true,
            auth: true,
        })
    } catch (error) {
        console.log(error);
        return res.json({
            res: false,
            auth: false,
            msg: "Error"
        })
    }
})

router.delete('/delete/:id',verifyToken,async (req,res) => {
    try {
        const { title, content } = req.body
        await Task.findOneAndDelete({ _id: req.params.id, author: req.user })

        return res.json({
            res: true,
            auth: true,
        })
    } catch (error) {
        console.log(error);
        return res.json({
            res: false,
            auth: false,
            msg: "Error"
        })
    }
})

router.get('/done/:id',verifyToken,async (req,res) => {
    try {
        const { title, content } = req.body
        await Task.findOneAndUpdate({ _id: req.params.id, author: req.user },{
            done: true
        })

        return res.json({
            res: true,
            auth: true,
        })
    } catch (error) {
        console.log(error);
        return res.json({
            res: false,
            auth: false,
            msg: "Error"
        })
    }
})

router.get('/get/:id',verifyToken,async (req,res) => {
    try {
        const task = await Task.findOne({_id: req.params.id,author: req.user})

        return res.json({
            res: true,
            auth: true,
            task: task
        })
    } catch (error) {
        console.log(error);
        return res.json({
            res: false,
            auth: false,
            msg: "Error"
        })
    }
})

module.exports = router