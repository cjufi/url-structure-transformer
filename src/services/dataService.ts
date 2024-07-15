import axios from "axios";

export const fetchData = async (): Promise<string[]> => {
  try {
    const url = "https://rest-test-eight.vercel.app/api/test";
    const response = await axios.get(url);

    let urls: string[] = [];

    if (Array.isArray(response.data.items)) {
      urls = response.data.items.map(
        (item: { fileUrl: string }) => item.fileUrl
      );
    } else {
      console.error("Unexpected data format:", response.data);
      throw new Error("Data format not supported");
    }

    return urls;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const transformData = (data: string[]): any => {
  const result: { [key: string]: any[] } = {};

  data.forEach((url) => {
    const urlObj = new URL(url);
    const ip = urlObj.hostname;
    const pathParts = urlObj.pathname.split("/").filter(Boolean);

    if (!result[ip]) {
      result[ip] = [];
    }

    let currentLevel = result[ip];

    pathParts.forEach((part, index) => {
      if (index === pathParts.length - 1) {
        currentLevel.push(part);
      } else {
        let nextLevel = currentLevel.find(
          (item) => typeof item === "object" && item.hasOwnProperty(part)
        );
        if (!nextLevel) {
          nextLevel = { [part]: [] };
          currentLevel.push(nextLevel);
        }
        currentLevel = nextLevel[part];
      }
    });
  });

  return result;
};
