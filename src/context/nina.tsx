import * as React from "react";

const NinaContext = React.createContext(null);

type NinaProviderProps = {
  children?: React.ReactNode;
};

function NinaProvider({ children }: NinaProviderProps) {
  return <NinaContext.Provider value={null}>{children}</NinaContext.Provider>;
}

function useNina() {
  const context = React.useContext(NinaContext);
  if (context === undefined) {
    throw new Error("useNina must be used within a NinaProvider");
  }
  return context;
}

export { NinaProvider, useNina };
