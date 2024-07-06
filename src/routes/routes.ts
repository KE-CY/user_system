import BasicRoutes from '../abstracts/routes';
import UserRoute from './user';

const router: Array<BasicRoutes> = [
    new UserRoute()
]

export default router;