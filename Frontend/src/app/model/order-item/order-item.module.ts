export interface OrderItem { 
  id: number;
  total: number;
  created_at: string;
  items: OrderItem[];
}
