import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import * as Joi from 'joi';

const error = (err: ErrorRequestHandler, _req: Request, res: Response, _next: NextFunction) => {
  const errorJoi = Joi.isError(err);

  if (errorJoi) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
};

export default error;
