import os from "os";
import path from "node:path";

const getFilePathsFromUserInput = (userInput) => {
  const pathToFileAndPathToNewDir = userInput
    .trim()
    .slice(3)
    .replace(os.EOL, "")
    .trim()
    .split(" ");

  if (pathToFileAndPathToNewDir.length !== 2) {
    throw new Error("Invalid input.");
  }

  const [pathToFile, pathToNewDir] = pathToFileAndPathToNewDir;
  const newPathToFile = path.join(pathToNewDir, path.parse(pathToFile).base);
  return [pathToFile, newPathToFile];
};

export { getFilePathsFromUserInput };
