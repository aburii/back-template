import { HttpException, HttpStatus } from '@nestjs/common';

export class QueryFailedException extends HttpException {
  constructor(
    private readonly errorMessage: string,
    private readonly errorString: any,
  ) {
    super(
      errorMessage,
      errorString == 'ER_DUP_ENTRY'
        ? HttpStatus.CONFLICT
        : HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
