export interface IPrice{
    id:number;
    variant_id:number;
    price:number;
    updated_at:Date;
}
export interface IPriceLog{
    id:number;
    variant_id:number;
    old_price:number;
    new_price:number;
    updated_at:Date;
}