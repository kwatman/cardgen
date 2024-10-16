export type CardgenConfig = {
    name: string;
    output: string;
    sets: [
        {
            name: string;
            template: string;
            data_handler: string;
            data: string;
            template_handler: string;
            aspect_ratio: string;
            formats: ('png' | 'jpeg' | 'webp')[];
            dpi: number;
            style: string;
        }
    ],

};