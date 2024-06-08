import { Privilege } from "./privilege";

export class Role {
  id?: any;
  name?: string;
  description?:string;
  active?:Boolean;
  creationDate?: Date;
  lastModifiedDate?: Date;

  privileges?:Privilege[]
}

