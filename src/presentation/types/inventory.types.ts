import { StockStatusEnum } from '@/domain/enums/inventory/audit/StockStatusEnum';
import { InventoryCategoriesEnum } from '@/domain/enums/inventory/shared/InventoryCategoriesEnum';

export interface StockCorrectionDTO {
  productId: string;
  quantityDelta: number;
  reason: string;
}

export interface CreateProductDTO {
  name: string;
  category: InventoryCategoriesEnum;
  isPhysical: boolean;
  costPrice: number;
  salePrice: number;
  specialty: string;
  description?: string;
  minStock?: number;
  maxStock?: number;
}

export interface SaleItemDTO {
  productId: string;
  quantity: number;
  price: number;
}

export interface ProcessSaleDTO {
  items: SaleItemDTO[];
  paymentMethod: string;
  patientId?: string;
  consultationId?: string;
}

export interface StockStatusItem {
  id: string;
  name: string;
  sku: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  status: StockStatusEnum;
}

export interface StockStatusReport {
  critical: StockStatusItem[];
  low: StockStatusItem[];
  overstocked: StockStatusItem[];
  normal: StockStatusItem[];
}
