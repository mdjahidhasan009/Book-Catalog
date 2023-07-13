export interface AddBookFormInputs {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  image: string;
  price: number;
}

export interface EditBookFormInputs extends AddBookFormInputs {
  id?: string;
}