import * as fsPromises from "node:fs/promises";
import path from "node:path";
import os from "os";

const remove = async (pathToFile, isMoveOperation) => {
  try {
    await fsPromises.rm(pathToFile);
    if (isMoveOperation) {
      console.log(`File ${pathToFile} was moved successfully.`);
    } else {
      console.log(`File ${pathToFile} was deleted successfully.`);
    }
  } catch (err) {
    console.error("Operation failed.");
  }
};

export { remove };
