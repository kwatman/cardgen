import fs from "fs";
import DataSource from "../../types/DataSource.js";
import { IDataHandler } from "../../types/IDataHandler.js";
import { CardData } from "@/types/CardData.js";
import * as csv from '@fast-csv/parse';
import xlsx from 'node-xlsx';

export class ExcelDataHandler implements IDataHandler {

    dataSource = DataSource.File;

    async loadData(sourcePath: string): Promise<CardData[]> {
        let data: CardData[] = []

        const [filePath, set] = sourcePath.split(':');
        const fileData = xlsx.parse(filePath);
        const setData = fileData.find(sheet => sheet.name === set);

        if (!setData) {
            throw new Error(`No set found with name: ${set} in sheet ${filePath}`);
        }
        const headers = setData.data[0];
        setData.data.shift();

        for (const row of setData.data) {
            const card: CardData = { name: 'temp' };
            headers.forEach((header, index) => {
                const keys: string[] = header.split('.');
                keys.reduce((acc, part, idx) => {
                    if (idx === keys.length - 1) {
                        acc[part] = row[index];
                    } else {
                        acc[part] = acc[part] || {};
                    }
                    return acc[part];
                }, card);
            });
            data.push(card);
        }

        return data
    }
}