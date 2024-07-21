import axios, { isAxiosError } from "axios";

export const bubbleSort = (numbers: number[]): number[] => {
  const numbersArray = numbers;

  for (let i = 0; i < numbersArray.length; i++) {
    for (let j = numbersArray.length - 1; j > i; j--) {
      if (numbersArray[j] < numbersArray[j - 1]) {
        const tmp = numbersArray[j];
        numbersArray[j] = numbersArray[j - 1];
        numbersArray[j - 1] = tmp;
      }
    }
  }

  return numbersArray;
};

export function fib(n: number): number {
  const result = [0, 1];

  for (let i = 2; i <= n; i++) {
    result.push(result[i - 1] + result[i - 2]);
  }
  return result[n];
}

export async function getYesOrNo(): Promise<string> {
  try {
    const { data } = await axios.get("https://yesno.wtf/api");
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.data) {
      return error.response.data;
    }
    throw error;
  }
}
