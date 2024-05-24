import { Brand } from "./brand";
import { Category } from "./category";

export class Product {
  id?: any;
  reference?: string;
  description?: string;
  image?: string;
  price?: any;
  soldQuantity?: any;
  avalableQuantity?: any;
  creationDate?: Date;
  lastModifiedDate?: Date;

  brands?:Brand[];
  categories?:Category[];
}