import fs from "fs";
import DataSource from "../../types/DataSource.js";
import { IDataHandler } from "../../types/IDataHandler.js";
import path from 'path';
import { CardData } from "@/types/CardData.js";
export class JsonDataHandler implements IDataHandler {

    dataSource = DataSource.Folder;

    async loadData(sourcePath: string): Promise<CardData[]> {
        let data: CardData[] = []
        let files = await fs.promises.readdir(sourcePath)

        for (let file of files) {
            if (!file.endsWith('.json')) continue;
            let fileData = await fs.promises.readFile(path.join(sourcePath, file))
            data.push(JSON.parse(fileData.toString()));
        }

        return data;
    }
}