import type { NextFunction, Response, Request } from "express";

function errorHandle(err: any, req: Request, res: Response, next: NextFunction) {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({ status: "error", message });
}

export default errorHandle;
