const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require("fs");
const { parse } = require("csv-parse/sync");
const image = require("../modules/image")

exports.command = '$0'

exports.describe = 'base command'

exports.builder = {
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
        demandOption: false,
    },
    image: {
        describe: "generate images for the cards'",
        alias: "i",
        demandOption: false,
    }
}

exports.handler = async (argv)  => {
    console.log(process.cwd());
      //load template
      let template;

      if(argv.template){
          template = await JSDOM.fromFile(argv.template, { runScripts: "dangerously" })
      }
  
      let source = []
      if(argv.source){
          let data = fs.readFileSync(argv.source)
          source = parse(data, {
              delimiter: ",",
              columns: true
          });
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
      //for each entry
      source.forEach( (entry) => {
          let newTemplate = new JSDOM(template.window.document.documentElement.outerHTML, { runScripts: "dangerously" })
  
          if(newTemplate.window.BeforeLoad){
              newTemplate.window.BeforeLoad(entry)
          }
  
          for(let element in entry) {
              let occurrences = newTemplate.window.document.querySelectorAll(`[varname=${element}]`)
              occurrences.forEach((occurence) => {
                  occurence.innerHTML = entry[element]
              })
          }
  
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