"use client";
import {
  createContext,
  useContext,
  useRef,
  ReactNode,
  MutableRefObject,
} from "react";

interface SheetContextType {
  sheetTriggerRef: MutableRefObject<HTMLButtonElement | null>;
  openSheet: () => void; // Add this method to the context
}

const SheetContext = createContext<SheetContextType | undefined>(undefined);

export const SheetProvider = ({ children }: { children: ReactNode }) => {
  const sheetTriggerRef = useRef<HTMLButtonElement | null>(null);

  // Function to programmatically trigger the sheet
  const openSheet = () => {
    if (sheetTriggerRef.current) {
      sheetTriggerRef.current.click();
    }
  };

  return (
    <SheetContext.Provider value={{ sheetTriggerRef, openSheet }}>
      {children}
    </SheetContext.Provider>
  );
};

export const useSheet = () => {
  const context = useContext(SheetContext);
  if (!context) {
    throw new Error("useSheet must be used within a SheetProvider");
  }
  return context;
};
