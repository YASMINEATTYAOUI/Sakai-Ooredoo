import { SafeUrl } from '@angular/platform-browser';

export interface User {
  id?: any;
  username?: string;
  fullName?: string ;
  phoneNumber?: number;
  email?: string;
  password?: string;
  creationDate?: Date;
  lastModifiedDate?: Date;
}

export interface UserDto {
  id?: any;
  username?: string;
  fullName?: string ;
  phoneNumber?: number;
  email?: string;
  password?: string;
  creationDate?: Date;
  lastModifiedDate?: Date;
}

