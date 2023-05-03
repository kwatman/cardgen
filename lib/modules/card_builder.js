import jsdom from "jsdom";
const {
  JSDOM
} = jsdom;
import fs from "fs";
import image from "./image.js";
async function BuildCards(name, cardData, template, style, generateImage) {
  // create new jsdom and link corresponding style
  let base = new JSDOM("");
  var head = base.window.document.getElementsByTagName('head')[0];
  var link = base.window.document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = style.replace(/^.*[\\\/]/, '');
  link.media = 'all';
  head.appendChild(link);
  template = await JSDOM.fromFile(template, {
    runScripts: "dangerously"
  });

  //for each entry
  cardData.forEach(entry => {
    let card = new JSDOM(template.window.document.documentElement.outerHTML, {
      runScripts: "dangerously"
    });
    let metaName = card.window.document.createElement('meta');
    metaName.name = "card-name";
    metaName.content = entry.name;
    card.window.document.querySelector(".card").appendChild(metaName);
    if (card.window.BeforeLoad) {
      card.window.BeforeLoad(entry);
    }
    for (let element in entry) {
      let occurrences = card.window.document.querySelectorAll(`[varname=${element}]`);
      occurrences.forEach(occurence => {
        occurence.innerHTML = entry[element];
      });
    }
    base.window.document.documentElement.querySelector("body").appendChild(card.window.document.querySelector(".card"));
  });
  fs.mkdirSync('./build/' + name + '/', {
    recursive: true
  });
  fs.mkdirSync('./build/files/', {
    recursive: true
  });
  fs.writeFile("./build/files/" + name + '.html', base.serialize(), err => {
    if (err) throw err;
  });
  fs.copyFileSync(style, "./build/files/" + style.replace(/^.*[\\\/]/, ''));
  if (generateImage) {
    console.log(name);
    let cards = base.window.document.documentElement.querySelectorAll(".card");
    cards.forEach(async (card, i) => {
      let cardName = card.querySelector('meta[name="card-name"]').content;
      console.log("   generating:" + cardName);
      await image(card.outerHTML, style, cardName, name);
    });
  }
}
export default BuildCards;