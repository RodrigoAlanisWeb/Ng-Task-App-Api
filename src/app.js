import express from 'express'
import mongo from './database/mongo'
import authRouter from './routes/auth'
import taskRouter from './routes/task'
import morgan from 'morgan'
import cors from 'cors'

const app = express()

app.use(cors({
    origin: "*"
}))
app.use(morgan('dev'))
app.use(express.json())

app.set('port', process.env.PORT || 3000)

app.use('/api/auth/',authRouter)
app.use('/api/task/',taskRouter)

app.listen(app.get('port'),() => {
    console.log("Server On: http://localhost:"+app.get('port'));
})