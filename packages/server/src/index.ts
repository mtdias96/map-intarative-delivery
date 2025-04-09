import cors from 'cors';
import express from 'express';
import { routeAdapter } from './application/adapters/routeAdapter';
import { makeSigninController } from './application/factories/login/makeSigninController';
import { makeSignUpController } from './application/factories/login/makeSignUpController';
import { env } from './config/env';

const app = express();

app.use(express.json());

app.use(cors({
  origin: env.CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

//Login
app.post('/sign-up', routeAdapter(makeSignUpController()));
app.post('/sign-in', routeAdapter(makeSigninController()));


app.listen(env.SERVER_PORT, () => {
  console.info(`Servidor rodando na porta http://localhost:${env.SERVER_PORT} em modo ${env.NODE_ENV}`);
});
