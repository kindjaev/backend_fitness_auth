// const jwt = require("jsonwebtoken")
// const User = require("../models/userModel")
import jwt from "jsonwebtoken"
import User from '../models/userModel.cjs'

async function requireAuth(req, res, next) {
    const {authorization} = req.headers

    if(!authorization){
        console.log("Authorization token required!")
        return res.status(401).json({error: 'Authorization token required!'})
    }
    const token = authorization.split(" ")[1]

    try {
        const {_id} = jwt.verify(token, process.env.SECRET_CODE)
        req.user = await User.findById(_id).select('_id')
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({error: "Request is not authorized"})
    }
    // next()
}

export default requireAuth