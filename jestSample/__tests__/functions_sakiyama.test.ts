import fc, { json } from "fast-check";
import {
  add,
  calculateAverage,
  getGitHubStarCount,
} from "../functions_sakiyama";

describe("addのテスト", () => {
  test("関数を実行すると、引数の計算値が返される", () => {
    // When: 関数を実行すると
    fc.assert(
      fc.property(fc.integer(), fc.integer(), fc.integer(), (a, b, c) => {
        // Then: 引数の計算値が返される
        expect(add(a, b, c)).toBe(a + b + c);
      })
    );
  });
});

describe("calculateAverage", () => {
  test("関数を実行すると、引数の計算値が返される", () => {
    // When: 関数を実行すると
    fc.assert(
      fc.property(fc.array(fc.nat()), (numberArray) => {
        // Then: 引数の計算値が返される
        expect(calculateAverage(numberArray)).toBe(
          numberArray.reduce((sum, number_) => sum + number_, 0) /
            numberArray.length
        );
      })
    );
  });
});

describe("cagetGitHubStarCount", () => {
  const testOwnerName = "testOwnerName";
  const testRepoName = "testRepoName";

  const mockFetch = jest.fn();
  const mockResponseJson = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("正常に通信できる場合、GitStarが返却される", async () => {
    global.fetch = mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        statusText: "ok",
        json: mockResponseJson,
      })
    );
    mockResponseJson.mockResolvedValueOnce({ stargazers_count: 1 });

    expect(await getGitHubStarCount(testOwnerName, testRepoName)).toBe(1);
  });

  test("エラーの場合、エラーがthwowされる", async () => {
    expect.hasAssertions();

    global.fetch = mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        statusText: "ok",
        json: mockResponseJson,
      })
    );
    mockResponseJson.mockRejectedValueOnce("error");

    try {
      await getGitHubStarCount(testOwnerName, testRepoName);
    } catch (error) {
      expect(error).toBe("error");
    }
  });

  test("エラーの場合、エラーがthwowされる", async () => {
    expect.hasAssertions();

    global.fetch = mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        statusText: "ng",
        json: mockResponseJson,
      })
    );

    try {
      await getGitHubStarCount(testOwnerName, testRepoName);
    } catch (error) {
      expect(error).toStrictEqual(
        new Error(`GitHub API returned status ${500}`)
      );
    }
  });
});
