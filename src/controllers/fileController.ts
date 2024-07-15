import { Request, Response } from "express";
import { fetchData, transformData } from "../services/dataService";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 600 });

export const getFileData = async (req: Request, res: Response) => {
  try {
    let data = cache.get("fileData");

    if (!data) {
      console.log("Cache miss. Fetching data...");
      const fetchedData = await fetchData();

      if (!Array.isArray(fetchedData)) {
        throw new Error("Data fetched is not in expected format");
      }

      data = transformData(fetchedData);
      cache.set("fileData", data);
      console.log("Data fetched and cached successfully");
    } else {
      console.log("Cache hit. Serving cached data...");
    }

    res.json(data);
  } catch (error) {
    console.error("Error processing request:", error);

    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};
