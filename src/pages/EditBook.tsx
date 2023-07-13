'use client';

import * as React from 'react';
import {useEffect} from 'react';

import {Button} from '@/components/ui/button.tsx';
import {Input} from '@/components/ui/input.tsx';
import {Label} from '@/components/ui/label.tsx';
import {useForm} from 'react-hook-form';
import {useAppDispatch} from '@/redux/hook.ts';
import {useNavigate, useParams} from 'react-router-dom';
import {editBook, useSingleBookQuery} from "@/redux/features/books/bookApi.ts";
import {AddBookFormInputs, EditBookFormInputs} from "@/interfaces/book.ts";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export function EditBook() {
  const { id } = useParams();
  const { data: book, isLoading, error } = useSingleBookQuery(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<EditBookFormInputs>();

  useEffect(() => {
    if(!book) return;
    let updatedBook = { ...book };
    if(book?.publicationDate) {
      console.log(book);
      let date = book.publicationDate;
      updatedBook.publicationDate = (new Date(date)).toISOString().split('T')[0];
    }
    reset(updatedBook);
  }, [book]);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const onSubmit = (data: EditBookFormInputs) => {
    console.log(data);
    const { title, author, genre, publicationDate, image, price } = data;

    dispatch(editBook({ id, title, author, genre, publicationDate, image, price }));
  };

  // useEffect(() => {
  //   if (user.email && !isLoading) {
  //     navigate('/');
  //   }
  // }, [user.email, isLoading]);

  return (
    <div className="full-height">
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="grid gap-2 w-6/12 mx-auto">
            <div className="grid gap-4">
              <Label className="" htmlFor="title">
                Title
              </Label>
              <Input
                id="title"
                placeholder="Enter book title"
                type="text"
                // autoCapitalize="none"
                // autoComplete="email"
                // autoCorrect="off"
                {...register('title', { required: 'Title is required' })}
              />
              {errors.title && <p>{errors.title.message}</p>}

              <Label className="" htmlFor="author">
                Author
              </Label>
              <Input
                id="author"
                placeholder="Enter author name"
                type="text"
                // autoCapitalize="none"
                // autoComplete="email"
                // autoCorrect="off"
                {...register('author', { required: 'Author is required' })}
              />
              {errors.author && <p>{errors.author.message}</p>}


              <Label className="" htmlFor="genre">
                Genre
              </Label>
              <Input
                id="genre"
                placeholder="Enter genre"
                type="text"
                // autoCapitalize="none"
                // autoComplete="email"
                // autoCorrect="off"
                {...register('genre', { required: 'Genre is required' })}
              />
              {errors.genre && <p>{errors.genre.message}</p>}


              <Label className="" htmlFor="publicationDate">
                Publication Date
              </Label>
              <Input
                id="publicationDate"
                placeholder="Enter date"
                type="date"
                // autoCapitalize="none"
                // autoComplete="email"
                // autoCorrect="off"
                {...register('publicationDate', { required: 'Publication date is required' })}
              />
              {errors.publicationDate && <p>{errors.publicationDate.message}</p>}

              <Label className="" htmlFor="image">
                Image
              </Label>
              <Input
                id="image"
                placeholder="Enter image url title"
                type="text"
                // autoCapitalize="none"
                // autoComplete="email"
                // autoCorrect="off"
                {...register('image', { required: 'Image url is required' })}
              />
              {errors.image && <p>{errors.image.message}</p>}

              <Label className="" htmlFor="price">
                Price
              </Label>
              <Input
                id="price"
                placeholder="Enter price title"
                type="number"
                // autoCapitalize="none"
                // autoComplete="email"
                // autoCorrect="off"
                {...register('price', { required: 'Price is required' })}
              />
              {errors.price && <p>{errors.price.message}</p>}

            </div>
            <Button>Add New Book</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
