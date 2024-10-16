import { JsonDataHandler } from "./JsonDataHandler.js";
import { IDataHandler } from "../../types/IDataHandler.js";
import { CsvDataHandler } from "./CsvDataHandler.js";

export default class DataHandlerFactory {
    private handlers: { [key: string]: IDataHandler } = {};

    constructor() {
        this.handlers['json'] = new JsonDataHandler();
        this.handlers['csv'] = new CsvDataHandler();
    }

    public getHandler(type: string): IDataHandler {
        const handler = this.handlers[type];
        if (!handler) {
            throw new Error(`No handler found for type: ${type}`);
        }
        return handler;
    }
}