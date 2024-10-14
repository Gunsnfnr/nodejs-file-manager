import os from "os";

const getCpus = () => {
  const hostMachineCpus = os.cpus();
  console.log(
    `Operating system info. Host machine has ${hostMachineCpus.length} CPUs:`
  );
  hostMachineCpus.forEach((cpu, index) => {
    console.log(
      `#${index + 1}. Speed: ${cpu.speed / 1000} GHz, model: ${cpu.model}`
    );
  });
};

export { getCpus };
