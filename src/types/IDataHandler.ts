import { CardData } from "./CardData.js";
import DataSource from "./DataSource.js";

export interface IDataHandler {
    dataSource: DataSource;
    loadData: (sourcePath: string) => Promise<CardData[]>;
}