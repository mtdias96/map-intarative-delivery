import cors from 'cors';
import express from 'express';
import { env } from './config/env';

const app = express();

app.use(cors({
  origin: env.CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.get('/', (_, res) => {
  res.json({ 
    message: 'API de entrega em tempo real',
    env: env.NODE_ENV 
  });
});

app.listen(env.SERVER_PORT, () => {
  console.info(`Servidor rodando na porta ${env.SERVER_PORT} em modo ${env.NODE_ENV}`);
});


