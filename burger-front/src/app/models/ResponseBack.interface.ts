import { OrderDetail } from "./OrderDetail.interface";

export interface ResponseBack {
    status: number,
    data?: OrderDetail[],
    message?: string
}