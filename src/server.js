import express, { urlencoded } from "express"
import "dotenv/config"
import { engine, create } from "express-handlebars"
import path from "path"
import { homeRouter } from "./routers/home.js"
import { authRouter } from "./routers/auth.js"
import { productRouter } from "./routers/product.js"
import dbConnect from "./config/db.connect.js"
import bodyParser from 'body-parser';
import flash from "connect-flash"
import session from "express-session"







let port = process.env.APP_PORT || 4500
let host = process.env.APP_HOST || "localhost"


const hbs = create({
    defaultLayout: "main",
    extname: "hbs"
})

async function startTheServer() {
    try {
        const app = express();
      
        app.engine('hbs', hbs.engine);
        app.set('view engine', 'hbs');
        app.set('views', path.join(process.cwd(), "src", "views"));
        app.use(session({
            secret: 'asad',
            resave: true,
            saveUninitialized: true,
          }))
        app.use(flash())
        app.use(express.json())
        app.use(express.urlencoded({extended: true}))
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        app.use(express.static("public"))
        app.use(homeRouter, authRouter, productRouter)
        
        await dbConnect()
        .then(() => {
           console.log("Db is connected!")
        })
        .catch((err) => {
            console.log(err.message)
        })

       
        

        app.listen(port, () => {
            console.log(`Server is running http://${host}:${port}`);
        });
    } catch (err) {
        console.error(err.message);
    }
}

startTheServer();
