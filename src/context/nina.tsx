import * as React from "react";
import Nina from "@nina-protocol/js-sdk";
import { useEffect, useState } from "react";

Nina.client.init();

const NinaContext = React.createContext<NinaContextValue>({});

type NinaContextValue = {
  hub?: Hub;
  releases?: Release[];
};

type NinaProviderProps = {
  children?: React.ReactNode;
};

type Hub = {
  publicKey: string;
  handle: string;
  data: {
    displayName: string;
    description: string;
    externalUrl: string;
    image: string;
  };
  datetime: string;
  dataUri: string;
  authority: string;
};

type Release = {
  publicKey: string;
  mint: string;
  metadata: {
    name: string;
    symbol: string;
    description: string;
    image: string;
    animation_url: string;
    external_url: string;
    attributes: any[];
    collection: {
      name: string;
      family: string;
    };
    properties: {
      artist: string;
      title: string;
      date: Date;
      md5Digest: string;
      files: any[];
      category: string;
    };
    descriptionHtml: string;
  };
  datetime: Date;
  hubReleasePublicKey: string;
  visible: boolean;
  publishedThroughHub: string;
  publisher: string;
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
