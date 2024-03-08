import { PropsWithChildren, createContext, useContext, useState } from 'react';
import TuoToast from '../../components/TuoToast';

interface ITuoToastContextProps {
  toastContent: string;
  showToast: (content: string) => void;
  hideToast: () => void;
}

const TuoToastContext = createContext<ITuoToastContextProps>({} as ITuoToastContextProps);

export const TuoToastProvider = ({ children }:PropsWithChildren) => {
  const [toastContent, setToastContent] = useState<string>('');

  const showToast = async (content: string) => {
    await new Promise<void>((res) => {
      setToastContent('');
      res();
    });
    setToastContent(content);
  };

  const hideToast = () => {
    setToastContent('');
  };

  return (
    <TuoToastContext.Provider value={{ toastContent, showToast, hideToast }}>
      {children}
      {
        toastContent !== '' &&
      <TuoToast
          content={toastContent} />
      }
    </TuoToastContext.Provider>
  );
};

export const useTuoToast = () => {
  return useContext(TuoToastContext);
};