import { Button } from '@/components/ui/button';
import banner from '@/assets/images/banner.png';
import Footer from '@/layouts/Footer';
import {IBook} from "@/types/globalTypes.ts";
import BookCard from "@/components/bookCard.tsx";
import {useGetLastTenBooksQuery} from "@/redux/features/books/bookApi.ts";

export default function Home() {
  const { data, isLoading, error } = useGetLastTenBooksQuery(undefined);

  let booksData = data?.data || [];

  return (
    <>
      <div className="flex justify-between items-center h-[calc(100vh-80px)] max-w-7xl mx-auto ">
        <div>
          <h1 className="text-6xl font-black text-primary mb-2">
            HAYLOU <br /> SOLAR PLUSE
          </h1>
          <p className="text-secondary font-semibold text-xl">
            Effortless communication at your fingertips
          </p>
          <div className="text-primary mt-20">
            <p>Bluetooth 5.2 for easy, secure communication</p>
            <p>Precise 143 Amoled display for clear visuals</p>
          </div>
          <Button className="mt-5">Learn more</Button>
        </div>
        <div className="relative -right-14">
          <img src={banner} alt="" />
        </div>
      </div>
      <div className="p-10">
        <p className="text-center text-4xl my-10">Latest 10 books</p>
        <div className="col-span-9 grid grid-cols-3 gap-10 pb-20">
          {booksData?.map((book: IBook) => (
            <BookCard book={book} />
          ))}
        </div>
        {/*<div>*/}
        {/*  <img className="mx-auto" src={hero} alt="" />*/}
        {/*</div>*/}
        {/*<div className="flex flex-col items-center justify-center">*/}
        {/*  <h1 className="text-5xl font-black text-primary uppercase mt-10">*/}
        {/*    The future of tech is here*/}
        {/*  </h1>*/}
        {/*  <Button className="mt-10" asChild>*/}
        {/*    <Link to="/products">Brows all products</Link>*/}
        {/*  </Button>*/}
        {/*</div>*/}
      </div>
      {/*<Footer />*/}
    </>
  );
}
