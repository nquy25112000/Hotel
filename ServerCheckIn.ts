import express from 'express';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import swaggerJsDoc from "swagger-jsdoc";
import { BookRoomRouter } from './Router/BookRoom'
import { TokenController } from './Controllers/Token'
const tokenController = new TokenController();
const bookRoomRouter = new BookRoomRouter();


class Server {
    public app: express.Application
    PORT: number = 4000;

    constructor() {
        this.app = express();
        this.config();
        this.start();
        this.router();

    }

    public config(): void {
        this.app.use(express.json())
            .use(
                session({
                    secret: "keyboard cat",
                    resave: false,
                    saveUninitialized: true,
                    cookie: { secure: false }
                })
            )
            .use(passport.initialize())
            .use(passport.session())
            .use(cors({ origin: '*' }))

    }

    public router(): void {
        this.app
            .use('/bookroom', tokenController.authorization, bookRoomRouter.Router)
    }
    public start(): void {
        this.app.listen(this.PORT, () => {

            console.log(`server check-in running at port: ${this.PORT}`);
        });
    }
}

new Server();
