#!/usr/bin/env node
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require("fs");
const { parse } = require("csv-parse/sync");
const init = require("./modules/init")
const image = require("./modules/image")

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
var argv = require('yargs/yargs')(process.argv.slice(2))
    .command("init","initialize an cardgen project", () => init())
    .usage('Usage: $0 [options]')
    .describe('template', 'choose a html template')
    .describe('source', 'choose a soruce file te fetch data from')
    .describe('style', 'choose a css style for your cards')
    .describe('image', 'generate images for the cards')
    .demandOption(['template','source'],"Please provide an template and a source file")
    .help('h')
    .alias('h', 'help')
    .alias('y', 'style')
    .alias('t', 'template')
    .alias('s', 'source')
    .alias('i', 'image')
    .argv;

async function cardgen(){
    //load template
    let template;

    if(argv.template){
        template = await JSDOM.fromFile(argv.template, { runScripts: "dangerously" })
    } else {
        
    }

    let source = []
    if(argv.source){
        let data = fs.readFileSync(argv.source)
        source = parse(data, {
            delimiter: ","
        });
    } else {

    }

    let final=  new JSDOM("")
    if(argv.style){
        var head  = final.window.document.getElementsByTagName('head')[0];
        var link  = final.window.document.createElement('link');
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.href = argv.style;
        link.media = 'all';
        head.appendChild(link);
    }
    let headers = source.splice(0,1)[0]

    //for each entry
    source.forEach( (entry) => {
        let newTemplate = new JSDOM(template.window.document.documentElement.outerHTML, { runScripts: "dangerously" })
        headers.forEach((element,i) => {      
            let occurrences = newTemplate.window.document.querySelectorAll(`[varname=${element}]`) 
            occurrences.forEach((occurence) => {
                let beforeLoad = occurence.getAttribute("beforeload")
                if(beforeLoad){
                   newTemplate.window[beforeLoad](entry[i])
                }
                occurence.innerHTML = entry[i]
            })
        })
        final.window.document.documentElement.querySelector("body").appendChild(newTemplate.window.document.querySelector(".card"))
    })

    fs.writeFile('cards.html', final.serialize(),(err) =>{if (err) throw err;});
    if(argv.image){
        let cards = final.window.document.documentElement.querySelectorAll(".card")
        cards.forEach(async (card,i) => {
            await image(card.outerHTML,argv.style,i)
        })
    }
}

cardgen()
