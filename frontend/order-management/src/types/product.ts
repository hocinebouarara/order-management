export interface Product {
  id: string;
  name: string;
  description: string;
  sku: string;
  category: string;
  price: number;
  quantity: number;
  imageUrl: string;
  attributes: Record<string, string>;
}
