import { BaseResponse } from './base/base.response';
import { ResponseData } from './base/responseData';
interface T{

}
export class LoginResponse extends BaseResponse {
  objects: {
    access_token: string;
    refresh_token: string;
    user_name: string;
    email: string;
  };
  constructor(params: any = {}) {
    super(params);
    this.objects.access_token = params.access_token;
    this.objects.refresh_token = params.refresh_token;
    this.objects.user_name = params.user_name;
    this.objects.email = params.email;
    console.log('data res', this.objects, params);
    alert(JSON.stringify(params));
    // new BaseResponse(this.objects);
  }
}
