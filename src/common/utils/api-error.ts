class ApiError extends Error {
  public status: number;
  public isOperational: boolean;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
  
  static connectionRefuse(message = "Mongodb error, connection refuse!") {
    return new ApiError(529, message);
  }
  
  static badRequest(message = "bad request: invalid data") {
    return new ApiError(400, message);
  }
  
  static registrationFailed(message = "Internal server error: unable to register user") {
    return new ApiError(500, message);
  }
  
  static existedUser(message = "User is already existed with this email") {
    return new ApiError(400, message)
  }
  
  static userNotFound(message = "User not found with this email") {
    return new ApiError(404, message);
  }
  
  static forbidden(message = "Please verify your email first") {
    return new ApiError(403, message);
  }
  
  static unauthorized(message = "You are not authorized") {
    return new ApiError(401, message);
  }
  
  static loginFailed(message = "Internal server error: unable to login user") {
    return new ApiError(500, message);
  }
  
  static requestFailed(message = "Internal server error") {
    return new ApiError(500, message);
  }
  
  static timeout(message = "request time out") {
    return new ApiError(409, message);
  }
};

export default ApiError;
