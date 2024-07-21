import axios from "axios";
import {
  Calculator,
  calculate,
  fetchMultipleTimes,
  shoutRandomly,
} from "../functions_yosino";
import fc from "fast-check";

describe("shoutRandomlyのテスト", () => {
  const spyMathRandom = jest.spyOn(Math, "random");
  const spyConsoleLog = jest.spyOn(console, "log");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("ランダムの値が0.5の場合に関数を実行すると、messageは小文字になる", () => {
    // Given: ランダムの値が0.5の場合
    spyMathRandom.mockReturnValue(0.5);

    // When: 関数を実行すると
    fc.assert(
      fc.property(fc.string(), (message) => {
        spyConsoleLog.mockClear();
        shoutRandomly(message);
        // Then: messageは小文字になる
        expect(spyConsoleLog).toHaveBeenCalledWith(
          message.toLocaleLowerCase() + "....."
        );
      })
    );
  });

  test("ランダムの値が0.5より大きい場合に関数を実行すると、messageは大文字になる", () => {
    // Given: ランダムの値が0.5より大きい
    spyMathRandom.mockReturnValue(0.5000001);

    // When: 関数を実行すると
    fc.assert(
      fc.property(fc.string(), (message) => {
        spyConsoleLog.mockClear();
        shoutRandomly(message);
        // Then: messageは大文字になる
        expect(spyConsoleLog).toHaveBeenCalledWith(
          message.toUpperCase() + "!!!!!"
        );
      })
    );
  });
});

describe("asyncSufetchMultipleTimes", () => {
  let spyAxiosGet: jest.SpyInstance;

  beforeEach(() => {
    spyAxiosGet = jest.spyOn(axios, "get");
    jest.clearAllMocks();
  });

  test("全ての通信が成功した場合、すべてのレスポンスデータが返却される", async () => {
    // When: 全ての通信が成功した場合
    spyAxiosGet.mockResolvedValue({ data: "test" });

    // Then: すべてのレスポンスデータが返却
    expect(await fetchMultipleTimes(5)).toStrictEqual([
      "test",
      "test",
      "test",
      "test",
      "test",
    ]);
  });

  test.each([Array.from(Array(5).keys())])(
    "どこかの通信が失敗した場合、エラーがthwowされる",
    async (num) => {
      expect.hasAssertions();

      // When: どこかの通信が失敗した場合
      (() => {
        for (let i = 0; i < 5; i++) {
          if (i === num) {
            spyAxiosGet.mockRejectedValueOnce("error");
          } else {
            spyAxiosGet.mockResolvedValueOnce({ data: "test" });
          }
        }
      })();

      try {
        await fetchMultipleTimes(5);
      } catch (error) {
        // Then: エラーがthwowされる
        expect(error).toBe("error");
      }
    }
  );
});

describe("calcCalculator", () => {
  const calculate = new Calculator();

  describe("devideメソッド", () => {
    test("関数を実行すると、引数の計算値が返される", () => {
      // When: 関数を実行すると
      fc.assert(
        fc.property(
          fc.integer(),
          fc.integer(),
          fc.integer(),
          fc.integer(),
          (a, b, c, d) => {
            // Then: 引数の計算値が返される
            expect(calculate.divide({ a, b }, { a: c, b: d })).toBe(
              (a + b) / (c - d)
            );
          }
        )
      );
    });
  });

  describe("multiplyメソッド", () => {
    test("関数を実行すると、引数の計算値が返される", () => {
      // When: 関数を実行すると
      fc.assert(
        fc.property(
          fc.integer(),
          fc.integer(),
          fc.integer(),
          fc.integer(),
          (a, b, c, d) => {
            // Then: 引数の計算値が返される
            expect(calculate.multiply({ a, b }, { a: c, b: d })).toBe(
              (a + b) * (c + d)
            );
          }
        )
      );
    });
  });
});

describe("calculate", () => {
  const mockDivide = jest.fn();
  const mockMultiply = jest.fn();

  const mockCalculator = {
    divide: mockDivide,
    multiply: mockMultiply,
  } as unknown as Calculator;

  test("divideメソッドとmultiplyメソッドが正しく機能している場合、2つのメソッドの返却値の合計が返される", () => {
    mockDivide.mockReturnValueOnce(1);
    mockMultiply.mockReturnValueOnce(2);

    expect(calculate({ a: 1, b: 2 }, { a: 3, b: 4 }, mockCalculator)).toBe(3);
    expect(mockDivide).toHaveBeenCalledWith({ a: 1, b: 2 }, { a: 3, b: 4 });
    expect(mockMultiply).toHaveBeenCalledWith({ a: 1, b: 2 }, { a: 3, b: 4 });
  });
});
