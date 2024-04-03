import { ResponseData } from './responseData';

export class BaseResponse {
  headers: {};
  body: | null;
  statusCode: string;
  statusCodeValue: string;

  constructor(data: any = {}) {
    console.log('cons in base class', data);
    this.body = data;
  }
  obj: {};
  private data_fun(obj) {}
}
