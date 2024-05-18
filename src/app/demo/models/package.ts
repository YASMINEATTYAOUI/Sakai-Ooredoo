import { Brand } from './brand';

export class Package {
  id?: any;
  reference?: string;
  description?: string;
  nbProduct?: any;
  image?: string;
  price?: any;
  soldQuantity?:any;
  availableQuantity?:any;
  creatorId?:string ;
  creationDate?: Date;
  lastModifierId?: Date;
  lastModifiedDate?: Date;
  
  brands?:Brand[];
}