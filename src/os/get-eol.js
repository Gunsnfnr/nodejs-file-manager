import os from "os";

const getEol = () => {
  console.log(`The default system end-of-line is ${JSON.stringify(os.EOL)}.`);
};

export { getEol };
