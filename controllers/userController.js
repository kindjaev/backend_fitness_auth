// const User = require("../models/userModel")
import User from "../models/userModel.cjs"
// const jwt = require('jsonwebtoken')
import jwt from "jsonwebtoken"
import env from "dotenv"

env.config()

const createToken = (id) => {
    return jwt.sign({_id: id}, process.env.SECRET_CODE, {expiresIn: "3d"})
}


export const signup = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.signup(email, password)
        const token = createToken(user._id)
        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


