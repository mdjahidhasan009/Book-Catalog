import BookCard from '@/components/bookCard.tsx';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { useGetBooksQuery } from '@/redux/features/books/bookApi';
import {
  setPriceRange,
  toggleState,
} from '@/redux/features/books/bookSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { IBook } from '@/types/globalTypes';
import React, {useEffect, useRef, useState} from 'react';
import SearchBox from "@/components/ui/SearchBox.tsx";

export default function Books() {
  const [booksData, setBooksData] = useState([]);
  const searchString = useRef('');
  const filterGenre = useRef('');
  const filterPublicationYear = useRef('');

  const { data, isLoading, error } = useGetBooksQuery(undefined);
  console.log(data);

  const { toast } = useToast();

  const { priceRange, status } = useAppSelector((state) => state.book);
  const dispatch = useAppDispatch();

  const handleSlider = (value: number[]) => {
    dispatch(setPriceRange(value[0]));
  };
  useEffect(() => {
    if(data) {
      setBooksData(data?.data);
    }
  }, [data]);

  const searchBooks = (e: React.ChangeEvent<HTMLInputElement>, filterCriteria: string) => {
    e.preventDefault();
    let enteredString = e.target.value;

    if(filterCriteria === "search") searchString.current = enteredString;
    if(filterCriteria === "genre") filterGenre.current = enteredString;
    if(filterCriteria === "year") filterPublicationYear.current = enteredString;

    setBooksData(getFilteredBooks());
  }

  const getFilteredBooks = () => {
    let filteredBooks = data?.data;
    if(searchString.current) {
      type BookStringKeys = 'title' | 'author' | 'genre';
      let fields: BookStringKeys[] = ['title', 'author', 'genre'];

      filteredBooks = filteredBooks.filter((book: IBook) =>
        fields.some((field: BookStringKeys) => book[field].toLowerCase().includes(searchString.current.toLowerCase()))
      );
    }

    if(filterGenre.current) {
      filteredBooks = filteredBooks.filter((book: IBook) => book.genre.toLowerCase().includes(filterGenre.current.toLowerCase()));
    }

    if(filterPublicationYear.current) {
      filteredBooks = filteredBooks.filter((book: IBook) => getYear(book.publicationDate).toString().toLowerCase()
        .includes(filterPublicationYear.current.toLowerCase()));
    }
    return filteredBooks;
  }

  function getYear(dateString: string) {
    let date = new Date(dateString);
    return date.getFullYear();
  }

  function filterByGenre(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    let genre = e.target.value;
    if(genre === "" ) return;
    const filteredBooks = booksData.filter((book: IBook) => book.genre.toLowerCase().includes(genre.toLowerCase()));
    setBooksData(filteredBooks);
  }

  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto relative ">
      <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
        <div>
          <h1 className="text-2xl uppercase">Search Books</h1>
          <div
            onClick={() => dispatch(toggleState())}
            className="flex items-center space-x-2 mt-3"
          >
            <SearchBox placeholderText="Search title, author & genre" searchBooks={searchBooks} filterCriteria="search"/>
            {/*<Label htmlFor="in-stock">In stock</Label>*/}
          </div>
        </div>
        <div className="space-y-3 ">
          <h1 className="text-2xl uppercase">Filters</h1>
          <div className="max-w-xl">
            <SearchBox placeholderText="Genre" searchBooks={searchBooks} filterCriteria="genre"/>
            <SearchBox placeholderText="Year" searchBooks={searchBooks} filterCriteria="year"/>
            {/*<Slider*/}
            {/*  defaultValue={[150]}*/}
            {/*  max={150}*/}
            {/*  min={0}*/}
            {/*  step={1}*/}
            {/*  onValueChange={(value) => handleSlider(value)}*/}
            {/*/>*/}
          </div>
          {/*<div>From 0$ To {priceRange}$</div>*/}
        </div>
      </div>
      <div className="col-span-9 grid grid-cols-3 gap-10 pb-20">
        {booksData?.map((book: IBook) => (
          <BookCard book={book} />
        ))}
      </div>
    </div>
  );
}
