import handleSuccess from '../services/handleSuccess';
import { Request, Response } from 'express';
import User from '../models/userModel';

const userController = {
  async getUsers(req: Request, res: Response) {
    /* 
      #swagger.tags = ['Users']
    */
    const users = await User.find();
    handleSuccess(res, users);
  }
};

export default userController;
