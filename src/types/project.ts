export type Project = {
  name: string;
  outDir: string;
  cards: cardType[];
};

type cardType = {
  name: string;
  template: string;
  source: string;
  style: string;
};
