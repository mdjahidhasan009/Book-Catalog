'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label.tsx';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/redux/hook.ts';
import { loginUser } from '@/redux/features/user/userSlice.ts';
import { useNavigate } from 'react-router-dom';
import {useState} from 'react';

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

interface AddBookFormInputs {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  imageUrl: string;
  price: number;
}

export function AddBook() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddBookFormInputs>();

  const [date, setDate] = useState();
  const { user, isLoading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const onSubmit = (data: AddBookFormInputs) => {
    console.log(data);

    dispatch(loginUser({ email: data.email, password: data.password }));
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
                id="date"
                placeholder="Enter date"
                type="date"
                // autoCapitalize="none"
                // autoComplete="email"
                // autoCorrect="off"
                {...register('date', { required: 'Date is required' })}
              />
              {errors.publicationDate && <p>{errors.publicationDate.message}</p>}

              <Label className="" htmlFor="imageUrl">
                Image
              </Label>
              <Input
                id="imageUrl"
                placeholder="Enter image url title"
                type="text"
                // autoCapitalize="none"
                // autoComplete="email"
                // autoCorrect="off"
                {...register('imageUrl', { required: 'Image url is required' })}
              />
              {errors.imageUrl && <p>{errors.imageUrl.message}</p>}

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
