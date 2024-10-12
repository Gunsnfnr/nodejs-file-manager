import os from "os";

const changeDirectory = (chunk) => {
  let userProvidedPath = chunk
    .toString()
    .replace(/^cd /, "")
    .replace(os.EOL, "");
  try {
    process.chdir(userProvidedPath);

    console.log(`You are currently in ${process.cwd()}`);
  } catch (err) {
    console.error("Operation failed");
    console.error("Incorrect path provided");
  }
};
export { changeDirectory };
