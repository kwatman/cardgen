
import { ITemplateHandler } from "../../types/ITemplateHandler.js";
import { IDataHandler } from "../../types/IDataHandler.js";
import EjsTemplateHandler from "./EjsTemplateHandler.js";

export default class TemplateHandlerFactory {
    private handlers: { [key: string]: ITemplateHandler } = {};

    constructor() {
        this.handlers['ejs'] = new EjsTemplateHandler();
    }

    public getHandler(type: string): ITemplateHandler {
        const handler = this.handlers[type];
        if (!handler) {
            throw new Error(`No handler found for type: ${type}`);
        }
        return handler;
    }
}