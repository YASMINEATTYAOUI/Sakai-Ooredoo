import { Role } from './role';

export class User {
  id?: any;
  username?: string;
  fullName?: string ;
  email?: string;
  phoneNumber?: number;
  password?: string;
  creationDate?: Date;
  lastModifiedDate?: Date;
  roles: Role;
 
}




