import { CardgenConfig } from '../types/CardgenConfig.js';
import fs from 'fs';
import path from 'path';

const { readdir, readFile } = fs.promises

export const getConfig = async (dirPath: string): Promise<CardgenConfig> => {
    let config: CardgenConfig | null = null;
    const configFilePath = path.join(dirPath, 'cardgen.config.json');

    // Read the configuration file
    try {
        const fileContent = await readFile(configFilePath, 'utf8');
        config = JSON.parse(fileContent);
    } catch (err) {
        throw new Error('Error reading config file: ' + err)
    }

    if (config) {
        return config;
    } else {
        throw new Error('No cardgen.config.json found.');
    }
}
