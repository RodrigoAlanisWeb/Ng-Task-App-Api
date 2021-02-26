import jwt from 'jsonwebtoken'

module.exports = function verifyToken(req,res,next) {
    const token = req.header('x-access-token')

    if (!token){
        return res.json({
            res: true,
            auth: false,
            msg: 'Not Token Provided'
        })
    }

    const decoded = jwt.decode(token)

    if (!decoded) {
        return res.json({
            res: true,
            auth: false,
            msg: 'The Token Is Invalid'
        })        
    }

    req.user = decoded.id
    next()
}