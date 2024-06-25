import { NameApiService } from "./nameApiService";
import { DatabaseMock } from "./util";

export const sumOfArray = (numbers: number[]): number => {
  return numbers.reduce((a: number, b: number): number => a + b);
};

export const asyncSumOfArray = (numbers: number[]): Promise<number> => {
  return new Promise((resolve): void => {
    resolve(sumOfArray(numbers));
  });
};

export const asyncSumOfArraySometimesZero = (
  numbers: number[],
  databaseSave: (input: number[]) => void
): Promise<number> => {
  return new Promise((resolve): void => {
    try {
      databaseSave(numbers);
      resolve(sumOfArray(numbers));
    } catch (error) {
      resolve(0);
    }
  });
};

export const getFirstNameThrowIfLong = async (
  maxNameLength: number,
  firstName: string
): Promise<string> => {
  if (firstName.length > maxNameLength) {
    throw new Error("first_name too long");
  }
  return firstName;
};
