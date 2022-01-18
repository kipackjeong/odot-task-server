import 'dotenv/config';
import '@/index';
import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import 'reflect-metadata';
import ItemsRoute from './routes/items.route';

try {
  validateEnv();
  const app = new App();
  app.listen();
} catch (err) {
  console.error(err);
}
