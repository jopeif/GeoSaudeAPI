import { swaggerSpec } from './swagger';
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import swaggerUi from "swagger-ui-express";



import AgentRoutes from './infra/web/routes/user.routes'
import AuthRoutes from './infra/web/routes/auth.routes'



dotenv.config()

const app = express()

app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'http://localhost:5500',
        'http://127.0.0.1:5500'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));



app.use(express.json())

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/auth', AuthRoutes)
app.use('/user', AgentRoutes)

export default app

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando em ${process.env.URL}:${process.env.PORT}`);
    console.log(process.env["DATABASE_URL"])
});