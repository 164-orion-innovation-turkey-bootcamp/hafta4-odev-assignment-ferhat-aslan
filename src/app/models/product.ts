export interface Product {
  id: number;
  title: string;
  price: string;
  description: string;
  category: string;
  images: string;
  rating: { rate: number; count: number };
}
