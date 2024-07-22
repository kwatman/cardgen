import { ITemplateHandler } from "@/types/ITemplateHandler.js";
import ejs from 'ejs';


export default class EjsTemplateHandler implements ITemplateHandler {

    async render(template: string, data: Object): Promise<string> {
        let rendered = await ejs.renderFile(template, data);

        return rendered;
    }
}