import BasicRoutes from '../abstracts/routes';
import UserController from '../controller/user';
import { UserService } from '../services/userService';
import { authenticateToken } from '../utils/jwt';


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
    this.router.post('/login', controller.login.bind(controller));
    this.router.get('/dummy-data', authenticateToken, controller.getDummyData.bind(controller))
    this.router.post('/change-password', authenticateToken, controller.updatePassword.bind(controller));
  }

}