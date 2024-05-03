export interface Package {
  id?: any;
  reference?: string;
  description?: string;
  nbProduct?: number;
  pictureId?: string;
  tags?: string;
  price?: string;
  creatorId?:string ;
  creationDate?: Date;
  lastModifierId?: Date;
  lastModifiedDate?: Date;
}

export interface PackageDto {
  id?: any;
  reference?: string;
  description?: string;
  nbProduct?: number;
  pictureId?: string;
  tags?: string;
  price?: string;
  creatorId?:string ;
  creationDate?: Date;
  lastModifierId?: Date;
  lastModifiedDate?: Date;
}