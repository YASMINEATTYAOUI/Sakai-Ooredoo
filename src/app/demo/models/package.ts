import { Brand } from './brand';

export class Package {
  id?: any;
  reference?: string;
  description?: string;
  nbProduct?: number;
  image?: string;
  price?: any;
  creatorId?:string ;
  creationDate?: Date;
  lastModifierId?: Date;
  lastModifiedDate?: Date;
  
  brands?:Brand[];
}