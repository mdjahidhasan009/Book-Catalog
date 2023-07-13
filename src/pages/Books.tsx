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
import { useEffect, useState } from 'react';
import SearchBox from "@/components/ui/SearchBox.tsx";

export default function Books() {
  const [booksData, setBooksData] = useState([]);

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

  const searchBooks = (e) => {
    e.preventDefault();
    let fields = ['title', 'author', 'genre'];
    const filteredBooks = data?.data.filter(book =>
      fields.some(field => book[field].toLowerCase().includes(e.target.value.toLowerCase()))
    );
    setBooksData(filteredBooks);
  }

  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto relative ">
      <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
        <div>
          <h1 className="text-2xl uppercase">Availability</h1>
          <div
            onClick={() => dispatch(toggleState())}
            className="flex items-center space-x-2 mt-3"
          >
            <SearchBox searchBooks={searchBooks} />
            {/*<Label htmlFor="in-stock">In stock</Label>*/}
          </div>
        </div>
        <div className="space-y-3 ">
          <h1 className="text-2xl uppercase">Price Range</h1>
          <div className="max-w-xl">
            <Slider
              defaultValue={[150]}
              max={150}
              min={0}
              step={1}
              onValueChange={(value) => handleSlider(value)}
            />
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
