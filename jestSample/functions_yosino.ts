import axios from "axios";

// Akira
export const shoutRandomly = (message: string) => {
  if (Math.random() > 0.5) {
    console.log(`${message.toUpperCase()}!!!!!`);
  } else {
    console.log(`${message.toLocaleLowerCase()}.....`);
  }
};

const fetch = () =>
  axios.get<string>("https://random-data-api.com/api/name/random_name");

export const fetchMultipleTimes = async (num: number) => {
  const arr = Array.from(Array(num).keys());
  const res = await Promise.all(arr.map(async () => fetch()));
  return res.map((r) => r.data);
};

export class Calculator {
  public divide = (
    top: { a: number; b: number },
    bottom: { a: number; b: number }
  ): number => {
    const sumResult = this.add(top.a, top.b);
    const subResult = this.subtract(bottom.a, bottom.b);
    return sumResult / subResult;
  };
  public multiply = (
    multiplicand: { a: number; b: number },
    multiplier: { a: number; b: number }
  ): number => {
    return (
      this.add(multiplicand.a, multiplicand.b) *
      this.add(multiplier.a, multiplier.b)
    );
  };
  private add = (a: number, b: number): number => {
    return a + b;
  };
  private subtract = (a: number, b: number): number => {
    return a - b;
  };
}

export const calculate = (
  numPair1: { a: number; b: number },
  numPair2: { a: number; b: number },
  calculator: Calculator
) => {
  const answer1 = calculator.divide(numPair1, numPair2);
  const answer2 = calculator.multiply(numPair1, numPair2);
  return answer1 + answer2;
};
