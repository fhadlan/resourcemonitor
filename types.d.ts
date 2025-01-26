type Statistics = {
  cpuUsage: number;
  ramUsage: number;
  storageUsage: number;
};

type StaticData = {
  cpuModel: string;
  totalMemoryGB: number;
  totalStorage: number;
};

type EventPayloadMapping = {
  statistics: Statistics;
  getStaticData: StaticData;
};

interface Window {
  electron: {
    subscribeStatistics: (callback: (statistic: Statistics) => void) => void;
    getStaticData: () => Promise<StaticData>;
  };
}
