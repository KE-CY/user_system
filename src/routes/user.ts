import BasicRoutes from '../abstracts/routes';
import UserController from '../controller/user';
import { UserService } from '../services/userService';

export default class UserRoute extends BasicRoutes {
  constructor() {
    super();
    this.setPrefix("user");
    this.setRoutes();
  }

  protected setRoutes() {

    const controller = new UserController(
      new UserService(),
    );

    this.router.post('/register', controller.createUser.bind(controller));
  }

}