import { Product } from "./Product.interface";

export interface Cart {
    id: number,
    product_id: number,
    user_id: number,
    amount: number,
    products: Product
}