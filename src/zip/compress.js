import { pipeline } from "node:stream/promises";
import * as fs from "node:fs";
import * as zlib from "node:zlib";
import path from "node:path";
import { access } from "node:fs/promises";

const compress = async (pathToFile, pathToDestination) => {
  let isSourceFileExist = false;
  let isDestinationFileExist = false;
  try {
    await access(pathToFile).then(() => {
      isSourceFileExist = true;
    });

    await access(pathToDestination)
      .then((data) => {
        isDestinationFileExist = true;
        throw new Error(
          `Operation failed. File ${pathToDestination} already exists.`
        );
      })
      .catch((err) => {
        if (isDestinationFileExist)
          throw new Error(
            `Operation failed. File ${pathToDestination} already exists.`
          );
      });

    await pipeline(
      fs.createReadStream(pathToFile),
      zlib.createBrotliCompress(),
      fs.createWriteStream(pathToDestination)
    );
    console.log("File compressed successfully.");
  } catch (err) {
    if (isSourceFileExist && !isDestinationFileExist)
      throw new Error("Operation failed.");
    throw err;
  }
};
export { compress };
