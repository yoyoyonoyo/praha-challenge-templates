import {
  asyncSumOfArray,
  asyncSumOfArraySometimesZero,
  getFirstNameThrowIfLong,
  sumOfArray,
} from "../functions";

describe("sumOfArrayのテスト", () => {
  test("引数が[1.1]の場合、2が返る", () => {
    expect(sumOfArray([1, 1])).toBe(2);
  });

  test("引数が[]の場合、例外が発生する", () => {
    expect(() => sumOfArray([])).toThrow();
  });

  test("引数がstring型の場合、例外が発生する", () => {
    // @ts-ignore
    expect(() => sumOfArray("aaa")).toThrow();
  });
});

describe("asyncSumOfArray", () => {
  test("引数が[1.1]の場合、2が返る", async () => {
    await expect(asyncSumOfArray([1, 1])).resolves.toBe(2);
  });

  test("引数が[]の場合、例外が発生する", async () => {
    await expect(asyncSumOfArray([])).rejects.toThrow();
  });

  test("引数がstring型の場合、例外が発生する", async () => {
    // @ts-ignore
    await expect(asyncSumOfArray("aaa")).rejects.toThrow();
  });
});

describe("asyncSumOfArraySometimesZero", () => {
  test("databaseが正常に保存できて、引数が[1.1]の場合、2が返却される", async () => {
    const testDatabaseSave = (input: number[]) => {};
    await expect(
      asyncSumOfArraySometimesZero([1, 1], testDatabaseSave)
    ).resolves.toBe(2);
  });

  test("databaseが異常な場合0が返却される", async () => {
    const testDatabaseSave = (input: number[]) => {
      throw new Error("databaseError");
    };
    await expect(
      asyncSumOfArraySometimesZero([1, 1], testDatabaseSave)
    ).resolves.toBe(0);
  });

  test("databaseが正常に保存できて、引数が[]の場合、0が返却される", async () => {
    const testDatabaseSave = (input: number[]) => {};
    await expect(
      asyncSumOfArraySometimesZero([], testDatabaseSave)
    ).resolves.toBe(0);
  });
});

describe("getFirstNameThrowIfLong", () => {
  test("名前がmaxNameLengthより小さい場合、名前が返却される", async () => {
    await expect(getFirstNameThrowIfLong(12, "tanaka tarou")).resolves.toBe(
      "tanaka tarou"
    );
  });

  test("名前がmaxNameLengthより大きい場合、エラーがthrowされる", async () => {
    await expect(getFirstNameThrowIfLong(12, "tanaka tarouE")).rejects.toThrow(
      new Error("first_name too long")
    );
  });
});
