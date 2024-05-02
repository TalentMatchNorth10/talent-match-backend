import { Response } from 'express';

export default function handleSuccess<T>(res: Response, data: T) {
  res
    .send({
      status: true,
      data
    })
    .end();
}
