import { Socket } from 'socket.io';

export class CustomError extends Error {
  statusCode: number;

  constructor(
    public status: number,
    public message: string
  ) {
    super(message);
    this.name = 'CustomError';
    this.statusCode = status;
  }
}

export function withErrorHandling(
  eventHandler: (socket: Socket, data: any) => Promise<void>
) {
  return async (socket: Socket, data: any) => {
    try {
      await eventHandler(socket, data);
    } catch (err: any) {
      if (err instanceof CustomError) {
        const errorResponse = {
          message: err.message || '未知錯誤',
          status: err.statusCode || 500
        };
        console.error({
          message: '錯誤',
          statusCode: err.status,
          errorMessage: err.message,
          stack: err.stack
        });
        socket.emit('error', errorResponse);
      } else {
        console.error({
          message: '錯誤',
          errorMessage: err.message,
          stack: err.stack
        });
        socket.emit('error', { message: err.message, status: 500 });
      }
    }
  };
}
