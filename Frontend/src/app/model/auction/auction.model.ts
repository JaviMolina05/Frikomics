import { Comic } from "../comic/comic.model";

export interface Auction {
  id: number;
  comic_id: number;
  start_time: string;
  end_time: string;
  starting_price: number;
  current_price: number;
  active: boolean;
  image?: string;
  comic: Comic;
}
