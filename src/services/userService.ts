import db from "../models/registry";
import bcrypt from 'bcrypt';


export class UserService {
  async createUser(username: string, password: string, avatar: string) {

    const isUsernameExist = await db.User.findOne({ username }).lean().exec()
    if (isUsernameExist) {
      throw new Error("Username has been used.");
    }

    const entity = {
      username,
      password: bcrypt.hashSync(password, 5),
      avatar
    };

    const user = await db.User.create(entity)
    return user
  }
}