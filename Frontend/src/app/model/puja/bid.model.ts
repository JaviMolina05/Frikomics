export interface Bid {
  id?: number;
  auction_id: number;
  user_id?: number;
  amount: number;
  is_winning_bid?: boolean;
  created_at?: string;
  updated_at?: string;
}
