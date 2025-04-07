import { config } from 'dotenv';
import { join } from 'path';

// Carrega o arquivo .env da raiz do monorepo
const result = config({
  path: join(__dirname, '../../../../.env'),
});

if (!result.parsed) {
  // Se não encontrar o arquivo na raiz do monorepo, tenta o arquivo local
  config();
}

interface IEnvironment {
  NODE_ENV: string;
  SERVER_PORT: number;
  DATABASE_URL: string;
  CORS_ORIGIN: string;
}

export const env: IEnvironment = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  SERVER_PORT: parseInt(process.env.SERVER_PORT ?? '3333', 10),
  DATABASE_URL: process.env.DATABASE_URL ?? 'postgres://postgres:postgres@localhost:5432/map_delivery',
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
}; 