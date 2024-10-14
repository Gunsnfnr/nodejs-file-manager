import os from "os";

const getUsername = () => {
  console.log(`System user name is ${os.userInfo().username}`);
};

export { getUsername };
