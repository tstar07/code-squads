import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/errors/app.error";

export const appErrorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {


    const statusCode = err.statusCode || 500;  // Default to 500 if statusCode is undefined

    res.status(statusCode).json({
        success: false,
        message: err.message
    });
}

export const genericErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {    
    console.log(err)
    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
}