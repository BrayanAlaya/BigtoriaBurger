import { Order } from "./Order,interface";
import { Product } from "./Product.interface";

export interface OrderDetail {
    id: number,
    amount: number,
    product_id: number,
    order_id: number,
    orders: Order,
    products: Product
}