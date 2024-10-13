import * as fsPromises from "node:fs/promises";
import path from "node:path";
import os from "os";

const create = async (userInput) => {
  const filename = userInput.slice(4).replace(os.EOL, "");
  try {
    await fsPromises.writeFile(path.join(process.cwd(), filename), "", {
      flag: "wx",
    });
    console.log(
      `file ${filename} was successfully created in ${process.cwd()}`
    );
  } catch (err) {
    console.error("Operation failed.");
  }
};

export { create };
