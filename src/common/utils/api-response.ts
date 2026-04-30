import type { Response } from "express";

class ApiResponse {
  
  static created<T>(res: Response, message = "user created", data: T | null = null) {
    return res.status(201).json({
      success: true,
      message,
      data
    });
  }
  
  static ok<T>(res: Response, message: string, data: T | null = null) {
    return res.status(200).json({
      success: true,
      message,
      data
    })
  }
};

export default ApiResponse;
