export interface Order {
  id?: any;
  name?: string;
  description?:string;
  creatorId?:string ;
  creationDate?: Date;
  lastModifierId?: Date;
  lastModifiedDate?: Date;
}

export interface OrderDto {
  id?: any;
  name?: string;
  description?:string;
  creatorId?:string ;
  creationDate?: Date;
  lastModifierId?: Date;
  lastModifiedDate?: Date;
}