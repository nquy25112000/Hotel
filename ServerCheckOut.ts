import express from 'express';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import swaggerJsDoc from "swagger-jsdoc";

import { BillRouter } from './Router/Bill'


import { TokenController } from './Controllers/Token'
const tokenController = new TokenController();




const billRouter = new BillRouter();



const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Library API-NguyenCongQuy",
            version: "1.0.0",
        },
        servers: [
            {
                url: "http://localhost:4000",
                description: "My API Documentation",
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    name: 'Authorization',
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
    },

    apis: ["./Router/*.ts"],
};

const specs = swaggerJsDoc(options);

class Server {
    public app: express.Application
    PORT: number = 5000;

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
            .use('/bill', billRouter.Router)
    }
    public start(): void {
        this.app.listen(this.PORT, () => {

            console.log(`server check-out running at port: ${this.PORT}`);
        });
    }
}

new Server();
