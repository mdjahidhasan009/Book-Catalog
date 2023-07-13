import React from "react";

type SearchFunction = (e: React.ChangeEvent<HTMLInputElement>, filterCriteria: string) => void;

interface SearchBoxProps {
  searchBooks: SearchFunction;
  placeholderText: string;
  filterCriteria: string;
}
const SearchBox = ({ searchBooks, placeholderText, filterCriteria }: SearchBoxProps) => {
  return (
    <form>
      <label htmlFor="default-search"
             className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
               xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
        </div>
        <input type="search" id="default-search"
               className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               placeholder={placeholderText} required onChange={(e) => searchBooks(e, filterCriteria)}>
        </input>
      </div>
    </form>
  )
}

export default SearchBox;