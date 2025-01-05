import { IAuthLogin } from '@/models/user';
import { ErrorCallBack, HttpUtil } from './config';

export interface IAuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    username: string;
    firstname: null | string;
    lastname: null | string;
  };
}

export class AuthService {
  public async signIn(
    body: IAuthLogin,
    onError?: ErrorCallBack
  ): Promise<IAuthResponse | null> {
    const res = await HttpUtil.post('/Auth/login', body, onError);
    return res;
  }
}
