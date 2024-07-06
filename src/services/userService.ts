import db from "../models/registry";
import bcrypt from 'bcrypt';
import { CustomError } from "../middlerwares/errorHandler";
import { generateTokens, verifyAccessToken } from "../utils/jwt";

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

  async validateForLogin(username: string, password: string) {
    const condition = {
      username,
      isActive: true,
      disabled: false
    };

    const user = await db.User.findOne(condition).lean().exec();
    if (!user) {
      throw new CustomError(204, '帳號錯誤，或已經被停用')
    }

    const userPassword = user.password;
    if (!bcrypt.compareSync(password, userPassword)) {
      throw new CustomError(204, '密碼錯誤')
    }
  }

  createToken(username: string) {
    const { accessToken, refreshToken } = generateTokens({ username });
    return { accessToken, refreshToken };
  }

  async validateUsername(username: string) {
    const condition = {
      username,
      isActive: true,
      disabled: false
    };
    const user = await db.User.findOne(condition).lean().exec();

    if (!user) {
      throw new CustomError(404, 'user error');
    }
  }

  async updatePassword(username: string, password: string) {
    const condition = {
      username,
      isActive: true,
      disabled: false
    }

    const update = {
      $set: { password: bcrypt.hashSync(password, 5) },
    }

    return await db.User.updateOne(condition, update).exec()
  }
}