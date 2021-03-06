import 'reflect-metadata';
import '@/index';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import config from 'config';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { createConnection } from 'typeorm';
import { dbConnection } from '@databases';
import { IRoutes } from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import AuthRoute from './routes/auth.route';
import IndexRoute from './routes/index.route';
import ItemsRoute from './routes/items.route';
import UsersRoute from './routes/users.route';

class App {
  public app: express.Application;
  public port: string | number;
  public env: string;
  private routes;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV || 'development';

    if (this.env !== 'test') {
      try {
        this.connectToDatabase().then(() => {
          this.routes = [new IndexRoute(), new UsersRoute(), new AuthRoute(), new ItemsRoute()];
          this.initializeMiddlewares();
          this.initializeRoutes(this.routes);
          this.initializeSwagger();
          this.initializeErrorHandling();

          logger.info('Database, Middlewares, Routes, ErrorHandlers, and Swagger integration was successfully established.');
        });
      } catch (err: any) {
        logger.error(err);
      }
    }
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private async connectToDatabase() {
    try {
      await createConnection(dbConnection);
    } catch (err) {
      console.error(err);
    }
  }

  private initializeMiddlewares() {
    this.app.use(morgan(config.get('log.format'), { stream }));
    this.app.use(cors({ origin: config.get('cors.origin'), credentials: config.get('cors.credentials') }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: IRoutes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Example docs',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
