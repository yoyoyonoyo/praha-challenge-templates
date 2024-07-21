export const add = (a: number, b: number, c: number): number => {
  return a + b + c;
};

export const calculateAverage = (numbers: number[]): number => {
  const total = numbers.reduce((sum, number_) => sum + number_, 0);
  return total / numbers.length;
};

export const getGitHubStarCount = async (
  ownerName: string,
  repoName: string
): Promise<number> => {
  const url = `https://api.github.com/repos/${ownerName}/${repoName}`;
  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "YourAppName",
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API returned status ${response.status}`);
    }

    const data = await response.json();
    return data.stargazers_count;
  } catch (error) {
    console.error("error");
    throw error;
  }
};
