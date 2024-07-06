import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/userService";
import Joi, { ValidationError } from 'joi';

class UserController {
  public readonly service: UserService;
  constructor(service: UserService) {
    this.service = service;
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    const bodySchema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
      avatar: Joi.string().required(),
    }).options({ stripUnknown: true });

    try {
      await bodySchema.validateAsync(req.body);
      const { username, password, avatar } = req.body;
      const response = await this.service.createUser(username, password, avatar);
      return res.status(200).json(response);
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).json({ error: error.details[0].message });
      }
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const bodySchema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    }).options({ stripUnknown: true });

    try {
      await bodySchema.validateAsync(req.body);
      const { username, password } = req.body;

      await this.service.validateForLogin(username, password);

      const { accessToken, refreshToken } = this.service.createToken(username);

      return res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
      next(error);
    }
  }

  async getDummyData(req: Request, res: Response, next: NextFunction) {
    return res.status(200).json({ 
      msg: "You get me."
     });
  }

}

export default UserController;