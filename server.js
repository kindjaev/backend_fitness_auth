// require("dotenv").config()

// const express = require('express')
// const mongoose = require('mongoose')
// const cors = require('cors')
// const User = require('./models/userModel')
// const jwt = require('jsonwebtoken')

import env from "dotenv"
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
// import User from "./models/userModel.cjs"
// import jwt from 'jsonwebtoken'
import requireAuth from "./middleware/requireAuth.js"
import userRouter from "./routes/userRouter.js"

import {exercisesHomePage, specificExercise} from "./controllers/exercisesController.js"

env.config()
const app = express()

mongoose
    .set('strictQuery', true)
    .connect(process.env.MONGO_URI, {useNewUrlParser: true})
        .then(() => console.log("Database connected"))
        .catch(err => console.log(err))

app.use(cors({
    origin: "*",
  }))
app.use(express.json())


// const createToken = (id) => {
//     return jwt.sign({_id: id}, process.env.SECRET_CODE, {expiresIn: "3d"})
// }
app.use(userRouter)

app.get('/', requireAuth, exercisesHomePage)

app.get('/exercise/:id', requireAuth, specificExercise)

app.listen(3000, () => {
    console.log("Listening on Port 3000" )
})