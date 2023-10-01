import { Router } from "express";
import { UserModel } from "../models/user.js";
import bcrypt from "bcrypt"


export const authRouter = Router()


authRouter.get("/login", (req, res) => {
    res.render('login', {
        title: "Login | :)",
        loginError: req.flash("loginError")
    })
})
authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        req.flash('loginError', "All fields is required")
        return res.redirect("/login") // return qo'shildi
    }
    const existEmail = await UserModel.findOne({
        email
    })
    if (!existEmail) {
        req.flash('loginError', "User not found")
        return res.redirect("/login") // return qo'shildi
    }
    const passWordCheck = await bcrypt.compare(password, existEmail.password)
    if (!passWordCheck) {
        req.flash('loginError', "Password wrong")
        return res.redirect("/login") // return qo'shildi
    }
    res.redirect("/home")
})



authRouter.get("/register", (req, res) => {
    res.render('register', {
        title: "Register | :)",
        registerError: "Error"
    })
})
authRouter.post("/register", async (req, res) => {
    const hashPass = await bcrypt.hash(req.body.password, 10)
    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashPass } 
        const user = await UserModel.create(userData)
    res.redirect("/home")
    
})