import express from 'express';

export class App {
  private app: express.Application = express();
  constructor() {

  }

  public boot(): void {
    const port = process.env.PORT || 3000;

    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }

}