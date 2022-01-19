import 'dotenv/config';
import '@/index';
import App from '@/app';
import validateEnv from '@utils/validateEnv';
import 'reflect-metadata';

try {
  validateEnv();
  const app = new App();
  app.listen();
} catch (err) {
  console.error(err);
}
