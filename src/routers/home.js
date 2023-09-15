import { Router } from "express";


export const homeRouter = Router()

homeRouter.get('/home', (req, res) => {
    res.render('home', {
        title: "Black Shop | TheUsmonov"
    });
});