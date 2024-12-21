import { NextFunction, Request, Response } from 'express';
import handleSuccess from '../services/handleSuccess';
import User from '../models/userModel';
import appError from '../services/appError';

const messageController = {
  send: async (req: Request, res: Response) => {
    const { user } = req;
    handleSuccess(res, '');
  }
};

export default messageController;
