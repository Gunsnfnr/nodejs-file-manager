import * as fsPromises from "node:fs/promises";
import os from "os";
import path from "node:path";
import { access } from "node:fs/promises";
import { createReadStream, createWriteStream } from "fs";
import { getFilePathsFromUserInput } from "./utils/get-file-paths-from-user-input";

const copy = async (pathToFile, newPathToFile, isCopyOperation) => {
  let isSourceFileExist = false;
  let isDestinationFileExist = false;
  try {
    await access(pathToFile).then(() => {
      isSourceFileExist = true;
    });

    await access(newPathToFile)
      .then((data) => {
        isDestinationFileExist = true;
        throw new Error(
          `Operation failed. File ${newPathToFile} already exists.`
        );
      })
      .catch((err) => {
        if (isDestinationFileExist)
          throw new Error(
            `Operation failed. File ${newPathToFile} already exists.`
          );
      });

    const readStream = createReadStream(pathToFile, "utf-8");
    const writeStream = createWriteStream(newPathToFile, "utf-8");
    readStream.pipe(writeStream);

    writeStream.on("finish", () => {
      if (isCopyOperation) console.log("File copied successfully.");
      writeStream.close();
    });
  } catch (err) {
    if (isSourceFileExist && !isDestinationFileExist) return;
    throw err;
  }
};

export { copy };
