import { NextFunction, Request, Response } from 'express';
import handleSuccess from '../services/handleSuccess';
import User from '../models/userModel';
import appError from '../services/appError';

const announcementController = {
  init: async (req: Request, res: Response) => {
    const { user } = req;
    handleSuccess(res, '');
  },
  send: async (req: Request, res: Response) => {
    const { user } = req;
    handleSuccess(res, '');
  },
  getList: async (req: Request, res: Response) => {
    const { user } = req;
    handleSuccess(res, '');
  },
  sendSystem: async (req: Request, res: Response) => {
    const { user } = req;
    handleSuccess(res, '');
  }
};

export default announcementController;
