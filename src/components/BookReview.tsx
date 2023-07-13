import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { FiSend } from 'react-icons/fi';
import {
  useGetCommentQuery,
  usePostReviewMutation, useSingleBookQuery,
} from '@/redux/features/books/bookApi.ts';
import {id} from "date-fns/locale";
import {IBook} from "@/types/globalTypes.ts";

interface BookReviewProps {
  book: IBook;
}

export default function BookReview({book} : BookReviewProps) {
  const [inputValue, setInputValue] = useState<string>('');

  // const { data } = useSingleBookQuery(id, {
  //   refetchOnMountOrArgChange: true,
  //   pollingInterval: 30000,
  // });
  const [postReview, { isLoading, isError, isSuccess }] =
    usePostReviewMutation();


  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(inputValue);

    const options = {
      id: book._id,
      data: {review: inputValue},
    };

    postReview(options);
    setInputValue('');
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto mt-5">
      <form className="flex gap-5 items-center" onSubmit={handleSubmit}>
        <Textarea
          className="min-h-[30px]"
          onChange={handleChange}
          value={inputValue}
        />
        <Button
          type="submit"
          className="rounded-full h-10 w-10 p-2 text-[25px]"
        >
          <FiSend />
        </Button>
      </form>
      <div className="mt-10">
        {book?.reviews?.map((review: string, index: number) => (
          <div key={index} className="flex gap-3 items-center mb-5">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>{review}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
