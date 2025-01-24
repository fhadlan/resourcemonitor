import osUtils from "os-utils";
import os from "os";
import fs from "fs";

const POLLING_INTERNAL = 500;

export function pollResources() {
  setInterval(async () => {
    const cpuUsage = await getCPUUsage();
    const ramUsage = getRamUsage();
    const storageData = getStorageData();
    console.log({ cpuUsage, ramUsage, storageUsage: storageData.usage });
    getCPUUsage();
  }, POLLING_INTERNAL);
}

export function getStaticData() {
  const totalStorage = getStorageData().total;
  const cpuModel = os.cpus()[0].model;
  const totalMemoryGB = Math.floor(os.totalmem() / 1024);

  return { cpuModel, totalMemoryGB, totalStorage };
}

function getCPUUsage() {
  return new Promise((resolve) => {
    osUtils.cpuUsage(resolve);
  });
}

function getRamUsage() {
  return 1 - osUtils.freememPercentage();
}

function getStorageData() {
  const stats = fs.statfsSync(process.platform === "win32" ? "C:" : "/");
  const total = stats.blocks * stats.bsize;
  const free = stats.bfree * stats.bsize;

  return {
    total: Math.floor(total / 1_000_000_000),
    usage: 1 - free / total,
  };
}
