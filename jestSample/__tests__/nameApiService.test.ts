import axios, { Axios, AxiosResponse } from "axios";
import { NameApiService } from "../nameApiService";

describe("NameApiService", () => {
  const spyAxiosGet = jest.spyOn(axios, "get");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("axiosからレスポンスが返却されてかつmaxLengthより名前が短い場合、名前が返却される", async () => {
    const first_name = "tanaka tarou";
    spyAxiosGet.mockResolvedValueOnce({
      data: { first_name },
    } as AxiosResponse<{ first_name: string }>);
    const service = new NameApiService(12);

    await expect(service.getFirstName()).resolves.toBe(first_name);
  });

  test("axiosがエラーの場合、エラーがスローされる", async () => {
    spyAxiosGet.mockRejectedValueOnce(new Error("axios"));
    const service = new NameApiService(10);

    await expect(service.getFirstName()).rejects.toThrow(new Error("axios"));
  });

  test("axiosからレスポンスが返却されてかつmaxLengthより名前が長い場合、エラーがスローされる", async () => {
    const first_name = "tanaka tarou";
    spyAxiosGet.mockResolvedValueOnce({
      data: { first_name },
    } as AxiosResponse<{ first_name: string }>);
    const service = new NameApiService(11);
    await expect(service.getFirstName()).rejects.toThrow(
      new Error("firstName is too long!")
    );
  });
});
