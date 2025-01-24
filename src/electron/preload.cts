const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  subscribeStatistics: (callback: (statistic: any) => void) => callback({}),
  getStaticData: () => console.log("static"),
});
