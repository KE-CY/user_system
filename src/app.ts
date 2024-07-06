import express from 'express';
import connectDB from './config/db';
import router from './routes/routes';
import { handleError } from './middlerwares/errorHandler';
import { Request, Response, NextFunction } from "express";



export class App {
  private app: express.Application = express();
  constructor() {
    this.app.use(express.json());
    connectDB();
    this.setRoutes();
    this.app.use(handleError);
  }

  private setRoutes(): void {
    for (const route of router) {
      this.app.use(`/api/${route.getPrefix()}`, route.getRouter());
    }
  }

  public boot(): void {
    const port = process.env.PORT || 3000;

    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }

}