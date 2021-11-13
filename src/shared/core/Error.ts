interface IError {
  message: string | string[] | object;
  statusCode?: number;
}

export default class Error {
  public readonly message: string | string[] | object;

  public readonly statusCode: number;

  constructor({ message, statusCode = 400 }: IError) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
