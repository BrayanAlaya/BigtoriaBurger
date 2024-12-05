export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discount: number;
  eliminado?: boolean;
  image?: string;
}