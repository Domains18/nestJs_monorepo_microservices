import express, {Request, Response, NextFunction} from 'express';
import dotenv from 'dotenv';


export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(err.stack);
    res.status(500).send('Something broke!');
}
