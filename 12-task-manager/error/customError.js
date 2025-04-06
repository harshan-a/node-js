class CustomError extends Error {
  constructor(msg, statusCode, success) {
    super(msg);
    this.statusCode = statusCode;
    this.success = success;
  }
}

module.exports = CustomError;