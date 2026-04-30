import type { IUser } from "./src/common/types/user.types";

declare global {
    namespace Express {
        interface Request {
            user?: {
                _id: string;
                name: IUser["name"];
                email: IUser["email"];
                role: IUser["role"];
                isVerified?: IUser["isVerified"];
            };
        }
    }
}
