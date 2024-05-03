import { SafeUrl } from '@angular/platform-browser';

export interface User {
  id?: any;
  userName?: string;
  firstName?: string ;
  lastName?: string;
  phoneNumber?: number;
  email?: string;
  password?: string;
  creationDate?: Date;
  lastModifiedDate?: Date;
}

export interface UserDto {
  id?: any;
  userName?: string;
  firstName?: string ;
  lastName?: string;
  phoneNumber?: number;
  email?: string;
  password?: string;
  creationDate?: Date;
  lastModifiedDate?: Date;
}

