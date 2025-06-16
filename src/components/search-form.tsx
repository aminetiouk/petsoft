"use client"

import { useSearchContext } from "@/lib/hooks";

export default function SearchForm() {
  const {searchQuery, handleChangeSearchQuery} = useSearchContext();
  return (
    <form className="w-full h-full">
      <input
        className="w-full h-full bg-white/50 hover:bg-white/60 focus:bg-white/70 rounded-md px-5 outline-none transition placeholder:text-black/30"
        placeholder="Search pets"
        type="search"
        value={searchQuery}
        onChange={(e) => handleChangeSearchQuery(e.target.value)}
      />
    </form>
  );
}
