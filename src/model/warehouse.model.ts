export interface IWarehouse {
  id: number;
  name: string;
  address: string;
  updated_at: Date;
}

export interface IWarehouseDetail {
  id: number;
  ware_house_id: number;
  variant_id: number;
  quantity: number;
  updated_at: Date;
}
