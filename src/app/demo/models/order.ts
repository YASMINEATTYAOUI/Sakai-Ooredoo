export interface Order {
  id?: any;
  numberOrder?: number;
  articlesNumber?:number;
  totalPrice?:any ;
  orderStatus?: string;
  deliveryType?: string;
  creationDate?: Date;
  creatorId?: any;
}

export interface OrderDto {
  id?: any;
  numberOrder?: number;
  articlesNumber?:number;
  totalPrice?:any ;
  orderStatus?: string;
  deliveryType?: string;
  creationDate?: Date;
  creatorId?: any;
}