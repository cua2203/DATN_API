export interface importBill {
  id: number;
  importDate: Date;
  user_id: number;
  supplier_id: number;
  warehouse_id: number;
}

export interface importBillDetail {
  id: number;
  importBill_id: number;
  variant_id: number;
  quantity: number;
  price: number;
}
