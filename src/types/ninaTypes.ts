export type Hub = {
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

export type Release = {
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
