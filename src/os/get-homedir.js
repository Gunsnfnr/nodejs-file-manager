import os from "os";

const getHomedir = () => {
  console.log(`Home directory is ${os.homedir()}`);
};

export { getHomedir };
