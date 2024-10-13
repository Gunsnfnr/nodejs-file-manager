import * as fsPromises from "node:fs/promises";
import os from "os";
import path from "node:path";
import { access } from "node:fs/promises";
import { createReadStream, createWriteStream } from "fs";
import { getFilePathsFromUserInput } from "./utils/get-file-paths-from-user-input";

const copy = async (pathToFile, newPathToFile, isCopyOperation) => {
  try {
    await access(newPathToFile);
    console.error("Operation failed.");
    console.error(`Invalid input: file ${newPathToFile} already exists.`);
  } catch (err) {
    try {
      await access(pathToFile);

      const readStream = createReadStream(pathToFile, "utf-8");
      const writeStream = createWriteStream(newPathToFile, "utf-8");
      readStream.pipe(writeStream);

      writeStream.on("finish", () => {
        if (isCopyOperation) console.log("File copied successfully.");
        writeStream.close();
      });
    } catch (err) {
      console.error("Operation failed.");
    }
  }
};

export { copy };
