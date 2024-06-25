import axios from "axios";

export class NameApiService {
  private MAX_LENGTH: number;

  public constructor(maxLength: number) {
    this.MAX_LENGTH = maxLength;
  }

  public async getFirstName(): Promise<string> {
    const { data } = await axios.get<{ first_name: string }>(
      "https://random-data-api.com/api/name/random_name"
    );
    const firstName = data.first_name;

    if (firstName.length > this.MAX_LENGTH) {
      throw new Error("firstName is too long!");
    }

    return firstName;
  }
}
