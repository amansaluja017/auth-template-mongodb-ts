import type { NextFunction, Response, Request } from "express";

function notFound(req: Request, res: Response, next: NextFunction) {
    res.status(404).json({ status: "error", message: "Route not found" });
}

export default notFound;
