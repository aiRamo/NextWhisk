import React, { createContext, useState, ReactNode, useContext } from 'react';

interface LinkContextType {
  link: string;
  updateLink: (newLink: string) => void;
}

const LinkContext = createContext<LinkContextType | undefined>(undefined);

export const LinkProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [link, setLink] = useState<string>('');

    const updateLink = (newLink: string) => {
        setLink(newLink);
    };

    return (
        <LinkContext.Provider value={{ link, updateLink }}>
            {children}
        </LinkContext.Provider>
    );
};

export const useLink = () => {
  const context = useContext(LinkContext);
  if (!context) {
    throw new Error('useLink must be used within a LinkProvider');
  }
  return context;
};
