import ApiError from "../../common/utils/api-error.ts";
import jwt from "jsonwebtoken";
import User from "./auth.model.ts";
import type { NextFunction, Request, Response } from "express";

async function verifyJWT(req: Request, _: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) return next();

    if (!authHeader.startsWith("Bearer ")) {
        throw ApiError.unauthorized("Unauthorized")
    };

    const token = authHeader.split(" ")[1];

    if (!token) {
        throw ApiError.unauthorized("Unauthorized");
    };

    const decoded = jwt.verify(token, process.env.AUTH_ACCESS_SECRET!) as { id: string, iat: number };

    if (!decoded) {
        throw ApiError.unauthorized("Unauthorized");
    };

    const user = await User.findById(decoded.id).select("+logoutAt");

    if (!user) {
        throw ApiError.unauthorized("Unauthorized");
    };

    if (user.logoutAt && decoded.iat * 1000 < user.logoutAt.getTime()) {
        throw ApiError.unauthorized("Unauthorized");
    };

    const userObj = user.toObject();
    
    delete userObj.logoutAt;

    req.user = { ...userObj, _id: user._id.toString() };
    next();
};

function requireAuth(req: Request, _: Response, next: NextFunction) {
    if (!req.user) {
        throw ApiError.unauthorized("Unauthorized");
    }
    next();
};

export { verifyJWT, requireAuth };
