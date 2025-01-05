import { ErrorCallBack, HttpUtil } from './config';

export interface IContactResponse {
  id: string;
  email: string;
  fullname: string;
  phone: null | string;
  subject: null | string;
  message: null | string;
}

export class ContactService {
 
  public async getContacts(
    skip: number,
    take: number,
    onError?: ErrorCallBack
  ): Promise<IContactResponse[] | null> {
    try {
      const queryParams = [
        { name: 'skip', value: skip },
        { name: 'take', value: take },
      ];

      const res = await HttpUtil.get('/Contact/contacts', queryParams, false, onError);
      return res;
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
      return null;
    }
  }
}