import os from "os";
import path from "node:path";

const getFilePathsForCompressOps = (userInput, sliceStartCharIndex) => {
  const pathToFileAndPathToNewDir = userInput
    .trim()
    .slice(sliceStartCharIndex)
    .replace(os.EOL, "")
    .trim()
    .split(" ");

  if (pathToFileAndPathToNewDir.length !== 2) {
    throw new Error("Invalid input.");
  }

  const [pathToFile, pathToDestination] = pathToFileAndPathToNewDir;
  return [pathToFile, pathToDestination];
};

export { getFilePathsForCompressOps };
