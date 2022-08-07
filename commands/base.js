import jsdom from  "jsdom";
const { JSDOM } = jsdom;
import fs from "fs";
import { parse } from "csv-parse/sync";
import BuildCards from "../modules/card_builder.js"

let module = {}
module.command = '$0'

module.builderdescribe = 'base command'

module.builder = {
    name: {
        describe: "choose file name",
        alias: "n",
        demandOption: false,
    },
    template: {
        describe: "choose a html template",
        alias: "t",
        demandOption: true,
    },
    source: {
        describe: "choose a soruce file te fetch data from",
        alias: "s",
        demandOption: true,
    },
    style: {
        describe: "choose a css style for your cards",
        alias: "y",
        demandOption: true,
    },
    image: {
        describe: "generate images for the cards'",
        alias: "i",
        demandOption: false,
    }
}

module.handler = async (argv)  => {

    //load template
    let template;
    if(argv.template){
        template = argv.template //await JSDOM.fromFile(argv.template, { runScripts: "dangerously" })
    }

    let source = []
    if(argv.source){
        let data = fs.readFileSync(argv.source)
        source = parse(data, {
            delimiter: ",",
            columns: true
        });
    }

    let style= null;
    if(argv.style){
        style = argv.style;
    }

    let image = false;
    if(argv.image){
        image = true;
    }

    let name = "cards";
    if(argv.name){
        name = argv.name;
    }
    BuildCards(name,source,template,style,image)
}

export default module