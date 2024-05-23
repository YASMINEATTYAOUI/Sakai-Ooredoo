import { Brand } from './brand';
import { Product } from './product';

export class Package {
  id?: any;
  reference?: string;
  description?: string;
  nbProduct?: any;
  image?: string;
  price?: any;
  soldQuantity?:any;
  availableQuantity?:any;
  creationDate?: Date;
  lastModifiedDate?: Date;
  
  brands?:Brand[];
  Products?:Product[];
}