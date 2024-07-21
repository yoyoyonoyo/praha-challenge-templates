import axios, { AxiosError, AxiosHeaders } from "axios";
import { bubbleSort, fib, getYesOrNo } from "../functions_masuyama";
import { error } from "console";

describe("bubbleSort", () => {
  test("引数が[]の場合、[]が返る", () => {
    expect(bubbleSort([])).toStrictEqual([]);
  });

  test("引数が整理されている数列の場合、同じ配列が返る", () => {
    expect(bubbleSort([1, 2, 3, 4, 5])).toStrictEqual([1, 2, 3, 4, 5]);
  });

  test("引数がバラバラの数列の場合、整理された配列が返る", () => {
    expect(bubbleSort([5, 2, 3, 6, 7])).toStrictEqual([2, 3, 5, 6, 7]);
  });
});

describe("fib", () => {
  test("引数が数字の場合、対応するフィボナッチ数が返る", () => {
    expect(fib(7)).toBe(13);
  });
});

describe("getYesOrNo", () => {
  const spyAxiosGet = jest.spyOn(axios, "get");

  test("正常に通信できる場合、APIのレスポンスが返却", async () => {
    spyAxiosGet.mockResolvedValueOnce({ data: "yes" });

    expect(await getYesOrNo()).toBe("yes");
  });

  test("Axiosのエラーの場合、Axiosのレスポンスが返却", async () => {
    spyAxiosGet.mockRejectedValueOnce(
      new AxiosError("error", "500", { headers: new AxiosHeaders() }, null, {
        status: 500,
        statusText: "500",
        headers: new AxiosHeaders(),
        config: { headers: new AxiosHeaders() },
        data: "error",
      })
    );

    expect(await getYesOrNo()).toBe("error");
  });

  test("Axiosのエラーの場合、Axiosのレスポンスが返却", async () => {
    spyAxiosGet.mockRejectedValueOnce(
      new AxiosError("error", "500", { headers: new AxiosHeaders() }, null)
    );

    try {
      await getYesOrNo();
    } catch (error) {
      expect(error).toStrictEqual(
        new AxiosError("error", "500", { headers: new AxiosHeaders() }, null)
      );
    }
  });

  test("その他エラーの場合、エラーがthrow", async () => {
    expect.hasAssertions();

    spyAxiosGet.mockRejectedValueOnce("error");

    try {
      await getYesOrNo();
    } catch (error) {
      expect(error).toBe("error");
    }
  });
});
