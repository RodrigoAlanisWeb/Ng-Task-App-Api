import { Router } from 'express'
import User from '../database/models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import verifyToken from '../utils/verifyToken'

const router = Router()


router.post('/sign-in', async (req, res) => {
    try {
        const { name, email, password } = req.body
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const user = await User.create({
            name: name,
            email: email,
            password: hash
        })

        const token = jwt.sign({ id: user._id }, "secret")

        return res.json({
            res: true,
            auth: true,
            token: token
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

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email: email })

        if (!user.verifyPassword(password)) {
            return res.json({
                res: true,
                auth: false,
                msg: 'The Password Is Invalid'
            })
        }

        const token = jwt.sign({ id: user._id }, "secret")

        return res.json({
            res: true,
            auth: true,
            token: token
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

router.get('/profile', verifyToken, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user })

        return res.json({
            res: true,
            auth: true,
            user: user
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