import { JsonDataHandler } from "./JsonDataHandler.js";
import { IDataHandler } from "../../types/IDataHandler.js";

export default class DataHandlerFactory {
    private handlers: { [key: string]: IDataHandler } = {};

    constructor() {
        this.handlers['json'] = new JsonDataHandler();
    }

    public getHandler(type: string): IDataHandler {
        const handler = this.handlers[type];
        if (!handler) {
            throw new Error(`No handler found for type: ${type}`);
        }
        return handler;
    }
}