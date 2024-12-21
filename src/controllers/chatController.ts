import { NextFunction, Request, Response } from 'express';
import handleSuccess from '../services/handleSuccess';
import User from '../models/userModel';
import appError from '../services/appError';

const chatController = {
  getUsers: async (req: Request, res: Response) => {
    const { user } = req;
    handleSuccess(res, '');
  },
  createChat: async (req: Request, res: Response) => {
    const { user } = req;
    handleSuccess(res, '');
  },
  getChats: async (req: Request, res: Response) => {
    const { user } = req;
    handleSuccess(res, '');
  },
  getChatMessages: async (req: Request, res: Response) => {
    const { user } = req;
    handleSuccess(res, '');
  },
  updateReadStatus: async (req: Request, res: Response) => {
    const { user } = req;
    handleSuccess(res, '');
  }
};

export default chatController;
