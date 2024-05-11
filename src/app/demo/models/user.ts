import { SafeUrl } from '@angular/platform-browser';

export interface User {
  id?: any;
  username?: string;
  fullName?: string ;
  email?: string;
  phoneNumber?: number;
  password?: string;
  creationDate?: Date;
  lastModifiedDate?: Date;
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
}

