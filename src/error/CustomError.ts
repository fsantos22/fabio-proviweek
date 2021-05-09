export class CustomError extends Error {
  constructor(public statusCode: number = 500, message: string) {
    super(message);
  }
}
