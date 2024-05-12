import { SafeUrl } from '@angular/platform-browser';
import { Role } from './role';

export interface User {
  id?: any;
  username?: string;
  fullName?: string ;
  email?: string;
  phoneNumber?: number;
  password?: string;
  creationDate?: Date;
  lastModifiedDate?: Date;
  roles: Role[];
}

export interface UserDto {
  id?: any;
  username?: string;
  fullName?: string ;
  email?: string;
  phoneNumber?: number;
  password?: string;
  creationDate?: Date;
  lastModifiedDate?: Date;
  roles: Role[];
}

