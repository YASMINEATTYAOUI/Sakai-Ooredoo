import { Role } from './role';

export class User {
  id?: any;
  username?: string;
  fullName?: string ;
  email?: string;
  phoneNumber?: number;
  status?:Boolean
  password?: string;
  creationDate?: Date;
  lastModifiedDate?: Date;
  role: Role;
 
}




