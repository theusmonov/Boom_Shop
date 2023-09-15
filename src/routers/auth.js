import { Router } from "express";



export const authRouter = Router()


authRouter.get("/login", (req, res) => {
    res.render('login', {
        title: "Login | :)"
    })
})
authRouter.post("/login", (req, res) => {
    res.redirect("/home")
})


authRouter.get("/register", (req, res) => {
    res.render('register', {
        title: "Register | :)"
    })
})
authRouter.post("/register", (req, res) => {
    console.log(req.body);
    res.redirect("/home")
})