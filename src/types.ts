export interface Review {
  id: number;
  platform: string;
  rating: number;
  text: string;
  date: string;
}

export interface ReviewsState {
  reviews: Review[];
  loading: boolean;
  error: string | null;
}