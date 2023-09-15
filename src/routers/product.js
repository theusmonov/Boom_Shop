import { Router } from "express";

export const productRouter = Router()


productRouter.get("/mahsulotlar", (req, res) => {
    res.render('mahsulot', {
        title: "Mahsulot | :)",
        isProduct: true
    })
});
productRouter.get("/yangimahsulot", (req, res) => {
    res.render('yangimahsulot', {
        title: "Yangi mahsulot | :)",
        isProduct2: true
    })
})