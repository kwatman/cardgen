export interface ITemplateHandler {
    render: (template: string, data: Object) => Promise<string>;
}