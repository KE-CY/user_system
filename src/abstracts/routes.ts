import { Router } from 'express';

export default abstract class BasicRoute {
  private prefix = "";
  protected router = Router();
  protected abstract setRoutes(): void;

  public getPrefix() {
    return this.prefix;
  }

  public getRouter() {
    return this.router;
  }
  public setPrefix(s: string) {
    this.prefix = s;
  }
}