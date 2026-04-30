import type { NextFunction, Response, Request } from "express";
import ApiError from "../utils/api-error.ts";
import type BaseDto from "../dto/base.dto.ts";

const validate = (Dtoclass: typeof BaseDto) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, data } = Dtoclass.validate(req.body);
    
    if (error) {
      throw ApiError.badRequest(error.issues.map((issue) => issue.message).join(", "));
    }
    
    req.body = data;
    next();
  }
}

export default validate;
