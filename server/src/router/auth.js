const express = require('express');
const appRouter = express.Router()
const { User } = require('../models/user')
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require("jsonwebtoken");

appRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            throw new Error('User not found signup first !')
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (isPasswordValid) {
            const token = await jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' },)

            res.cookie("token", token, {
                expires: new Date(Date.now() + 60 * 10000), // 10 minute
            })
            res.send({
                message: "Login Successfully !",
                user: {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    photoUrl: user.photoURL
                }
            })
        } else {
            throw new Error("Invalid Credentials !")
        }

    } catch (error) {
        res.status(400).send("Error: " + error.message)
    }
})

appRouter.post('/register', async (req, res) => {
    try {
        const { firstName, email, password } = req.body;

        if (!firstName) {
            throw new Error("Name not found !")
        } else if (!validator.isEmail(email)) {
            throw new Error("Invalid Email !")
        } else if (!validator.isStrongPassword(password)) {
            throw new Error("Type a Strong password !")
        }

        const passwordHashed = await bcrypt.hash(password, 10);

        const user = await User({
            firstName,
            email,
            password: passwordHashed
        })

        await user.save()  // await lagayen

        const token = await jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' })

        res.cookie("token", token, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day (pehle 10 min tha)
        })

        // Frontend ke liye token aur user data bhejen
        res.json({
            message: 'User Added Successfully!',
            token: token,
            user: {
                id: user._id,
                name: user.firstName,
                email: user.email,
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.firstName)}`
            }
        })

    } catch (error) {
        res.status(400).json({ message: error.message })  // JSON format mein error
    }
})
appRouter.post('/logout', async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now() * 0),
    })

    res.send("Logout Successfully !")
})


module.exports = {
    appRouter
}