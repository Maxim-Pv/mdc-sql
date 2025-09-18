export type Rates = {
  code: string;
  nominal: number;
  currencyName: string;
  date: string;
  prevDate: string;
  rate: { value: number; diff: number; percent: number };
  previous: {
    value: number;
    diff: number;
    percent: number;
    prevDate: string;
    prevValue: number;
  };
};
