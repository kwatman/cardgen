import fs from "fs";
import DataSource from "../../types/DataSource.js";
import { IDataHandler } from "../../types/IDataHandler.js";
import { CardData } from "@/types/CardData.js";
import * as csv from '@fast-csv/parse';

export class CsvDataHandler implements IDataHandler {

    dataSource = DataSource.File;

    async loadData(sourcePath: string): Promise<CardData[]> {
        let data: CardData[] = []
        console.log(sourcePath);

        return new Promise((resolve, reject) => {
            fs.createReadStream(sourcePath)
                .pipe(csv.parse({ headers: true }))
                .on('error', (error: unknown) => {
                    console.error(error);
                    reject(error);
                })
                .on('data', (row: any) => {
                    const card: CardData = { name: 'temp' };
                    // Process each key-value pair in the row
                    Object.entries(row).forEach(([key, value]) => {
                        const keys = key.split('.'); // Split key into parts
                        keys.reduce((acc, part, idx) => {
                            if (idx === keys.length - 1) {
                                acc[part] = value; // Assign value to the last key part
                            } else {
                                acc[part] = acc[part] || {}; // Create nested object if not exists
                            }
                            return acc[part];
                        }, card);
                    });
                    data.push(card);
                })
                .on('end', (rowCount: number) => {
                    console.log(`Parsed ${rowCount} rows`);
                    resolve(data);
                });
        });
    }
}