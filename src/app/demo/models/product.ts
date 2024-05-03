export interface Product {
  id?: any;
  reference?: string;
  description?: string;
  tags?: string;
  price?: string;
  pictureId?: string;
  soldQuantity?: string;
  avalableQuantity?: string;
  creatorId?:string ;
  creationDate?: Date;
  lastModifierId?: Date;
  lastModifiedDate?: Date;
}

export interface ProductDto {
  id?: any;
  reference?: string;
  description?: string;
  tags?: string;
  price?: string;
  pictureId?: string;
  soldQuantity?: string;
  avalableQuantity?: string;
  creatorId?:string ;
  creationDate?: Date;
  lastModifierId?: Date;
  lastModifiedDate?: Date;
}