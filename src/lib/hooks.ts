import { petContext } from "@/components/contexts/pet-context-provider";
import { searchContext } from "@/components/contexts/search-context-provider";
import { useContext } from "react";

export function usePetContext() {
  const context = useContext(petContext);
  
  if (!context) {
    throw new Error('usePetContext must be used within a PetContextProvider');
  }

  return context;
}

export function useSearchContext() {
  const context = useContext(searchContext)

  if (!context) {
    throw new Error("useSearchContext must be used within SearchContextProvider")
  }

  return context;
}