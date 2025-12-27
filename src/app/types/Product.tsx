export interface Product {
  id: number;
  name: string;
  price: number;
  userId: string;
  createdAt: Date;
}

export interface ProductsResponse {
  products: Product[];
}
