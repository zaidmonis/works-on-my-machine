import React from "react";

type PlaygroundContextValue = {
  code: string;
  language: "javascript" | "typescript";
  setCode: (code: string) => void;
  setLanguage: (language: "javascript" | "typescript") => void;
};

const PlaygroundContext = React.createContext<PlaygroundContextValue | undefined>(undefined);

export const PlaygroundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [code, setCode] = React.useState("console.log('Hello from the playground!');");
  const [language, setLanguage] = React.useState<"javascript" | "typescript">("javascript");

  return (
    <PlaygroundContext.Provider value={{ code, language, setCode, setLanguage }}>
      {children}
    </PlaygroundContext.Provider>
  );
};

export const usePlayground = () => {
  const context = React.useContext(PlaygroundContext);
  if (!context) {
    throw new Error("usePlayground must be used within PlaygroundProvider");
  }
  return context;
};
