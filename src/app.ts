import express, {type Request, type Response} from "express";
import cookieParser from "cookie-parser";
import ApiError from "./common/utils/api-error.ts";
import notFound from "./common/middleware/notFound.middleware.ts";
import errorHandle from "./common/middleware/errorHandle.middleware.ts";
import { verifyJWT } from "./module/auth/auth.middleware.ts";
import userRouters from "./module/auth/auth.routes.ts";

function createApp() {
    try {
        const app = express();

        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(cookieParser());

        app.get("/health", (_: Request, res: Response) => {
            res.status(200).json({ status: "success", message: "API is healthy" });
        });

        app.use(verifyJWT);

        app.use("/api/v1/auth", userRouters);

        app.use(notFound);
        app.use(errorHandle);

        return app;

    } catch (error) {
        console.error("Error creating app:", error);
        throw ApiError.requestFailed("Failed to create the application");
    }
};

export default createApp;
