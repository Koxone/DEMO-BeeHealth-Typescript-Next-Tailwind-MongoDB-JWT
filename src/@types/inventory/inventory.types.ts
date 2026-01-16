import { CurrentUserData } from '../user/user.types';

export interface Product {
  _id: string;
  name: string;
  type: string;
  category: string;
  inStock: boolean;
  costPrice: number;
  salePrice: number;
  createdAt: string;
  specialty: CurrentUserData['specialty'];
  updatedAt: string;
}

export interface InventoryItem {
  _id: string;
  product: Product;
  productType: string;
  quantity: number;
  minStock: number;
  maxStock: number;
  createdAt: string;
  updatedAt: string;
}
