export interface Auction {
  id?: number;
  title: string;
  condition: 'perfecto' | 'buen estado' | 'regular' | 'muy usado';
  seller_note?: string;
  start_time: string;
  end_time: string;
  starting_price: number;
  current_price?: number;
  active?: boolean;
  image?: string;
  winner_id?: number;
}
