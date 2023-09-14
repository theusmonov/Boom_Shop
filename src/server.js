import express from "express"
import "dotenv/config"
import { engine } from "express-handlebars"
import path from "path"


let port = process.env.APP_PORT || 4500
let host = process.env.APP_HOST || "localhost"




async function startTheServer() {
    try {
        const app = express();

        app.engine('handlebars', engine());
        app.set('view engine', 'handlebars');
        const __dirname = path.dirname(new URL(import.meta.url).pathname);
        app.set('views', path.join(__dirname, './views'));
        app.get('/', (req, res) => {
            res.render('main');
        });

        app.listen(port, () => {
            console.log(`Server is running http://${host}:${port}`);
        });
    } catch (err) {
        console.error(err.message);
    }
}

startTheServer();
