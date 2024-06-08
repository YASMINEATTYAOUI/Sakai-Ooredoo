import { Brand } from "./brand";
import { Category } from "./category";

export class Product {
  id?: number;
  reference?: string;
  description?: string;
  image?: string;
  price?: any;
  soldQuantity?: any;
  availableQuantity?: any;
  creationDate?: Date;
  lastModifiedDate?: Date;

  brand?:Brand;
  category?:Category;
}