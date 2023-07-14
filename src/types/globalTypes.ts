export interface IBook {
  _id: number;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  reviews: [string];
  image: string;
  price: number;
  quantity?: number;
}

export interface IReadingBook extends IBook{
  isFinished: boolean
}