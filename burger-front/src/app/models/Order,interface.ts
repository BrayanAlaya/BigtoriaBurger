import { User } from "./User.intercae";

export interface Order {
    id: number,
    date: string,
    method: string,
    user_id: number,
    address: string,
    users: User
}