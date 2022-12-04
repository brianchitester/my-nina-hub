import * as React from "react";
import Nina from "@nina-protocol/js-sdk";
import { useEffect, useState } from "react";
import { Hub, Release } from "../types/ninaTypes";

Nina.client.init();

const NinaContext = React.createContext<NinaContextValue>({});

type NinaContextValue = {
  hub?: Hub;
  releases?: Release[];
};

type NinaProviderProps = {
  children?: React.ReactNode;
};

function NinaProvider({ children }: NinaProviderProps) {
  const [hub, setHub] = useState<Hub>();
  const [releases, setReleases] = useState<Release[]>();

  const fetchHub = async () => {
    const { hub, releases } = await Nina.Hub.fetch("corporationplaza");
    setHub(hub);
    setReleases(releases);
  };

  useEffect(() => {
    if (!hub) {
      fetchHub();
    }
  }, [hub]);

  console.log(hub);
  console.log(releases);

  const value = { hub, releases };
  return <NinaContext.Provider value={value}>{children}</NinaContext.Provider>;
}

function useNina() {
  const context = React.useContext(NinaContext);
  if (context === undefined) {
    throw new Error("useNina must be used within a NinaProvider");
  }
  return context;
}

export { NinaProvider, useNina };
