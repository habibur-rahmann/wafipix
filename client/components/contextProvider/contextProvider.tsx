"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { usePathname } from "next/navigation";

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
type PreviewImage = {
  isOpen: boolean;
  currentIndex: number;
  images: string[];
};
export interface GlobalContextProps {
  previewImage: PreviewImage;
  setPreviewImage: SetState<PreviewImage>;

  selectedServiceId: string;
  setServiceId: SetState<string>;

  isPackageBoxSelectMode: boolean;
  setPackageBoxSelectMode: SetState<boolean>;
}

const Context = createContext<null | GlobalContextProps>(null);

import { FC } from "react";

interface ContextProviderProps {
  children: React.ReactNode;
}

const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
  const pathName = usePathname();

  const [previewImage, setPreviewImage] = useState<PreviewImage>({
    isOpen: false,
    currentIndex: 0,
    images: [],
  });

  // for Service selection to load the Service details
  const [selectedServiceId, setServiceId] = useState<string>("");

  // for service selection package card scenario
  const [isPackageBoxSelectMode, setPackageBoxSelectMode] =
    useState<boolean>(false);

  // service package box mode change
  const changeServicePackageBoxModeCallback = useCallback(() => {
    setPackageBoxSelectMode(servicePackageBoxModeChange(pathName));
  }, [pathName]);

  useEffect(() => {
    changeServicePackageBoxModeCallback();
  });

  return (
    <Context.Provider
      value={{
        previewImage,
        setPreviewImage,

        selectedServiceId,
        setServiceId,

        isPackageBoxSelectMode,
        setPackageBoxSelectMode,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;

export const useGlobalContext = () => {
  return useContext(Context) as GlobalContextProps;
};

const servicePackageBoxModeChange = (pathName: string) =>
  pathName.includes("select-service");
