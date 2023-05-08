import fs from "fs";
import path from "path";
import { createSpinner } from "nanospinner";
import chalk from "chalk";
import BuildCards from "../modules/card_builder.js";
import { Project } from "../types/project.js";
import jsdom from "jsdom";
const { JSDOM } = jsdom;
import Parser from "../modules/parser.js";

export default {
  command: "build",
  describe: "build the whole cardgen project",
  aliases: "B",
  builder: {},
  handler: async function (argv: Object) {
    let project: Project = JSON.parse(
      await fs.readFileSync("./cardgen.json").toString()
    );

    console.log(chalk.green("buidling project: " + project.name));

    for (let cardType of project.cards) {
      console.log(chalk.blue("building card type: " + cardType.name));

      let cardFolder = cardType.source
        ? cardType.source
        : "./cards/" + cardType.name;
      let cardFiles = await fs.promises.readdir(cardFolder);
      for (let cardFile of cardFiles) {
        let card = JSON.parse(
          fs.readFileSync(cardFolder + "/" + cardFile).toString()
        );
        let template = fs
          .readFileSync(
            cardType.template
              ? cardType.template
              : `./templates/${cardType.name}.html`
          )
          .toString();

        let parsedCard = Parser.parse(card, template);
        fs.mkdirSync("./build/cards", { recursive: true });
        fs.writeFile(
          `./build/cards/${cardType.name}.html`,
          parsedCard.serialize(),
          (err) => {
            if (err) throw err;
          }
        );
      }
    }

    // let cardsData: Object = {};
    // let cardFiles = fs.readdirSync(project.cards_folder);
    // cardFiles.forEach((file) => {
    //   if (path.extname(file) == ".csv") {
    //     const spinner = createSpinner("loading: " + file).start();
    //     let data = fs.readFileSync(project.cards_folder + file);
    //     // cardsData[path.parse(file).name] = parse(data, {
    //     //   delimiter: ",",
    //     //   columns: true,
    //     // });
    //     spinner.success();
    //   }
    // });

    // for (let type in cardsData) {
    //   let template = project.templates_folder + type + ".html";
    //   let style = project.styles_folder + type + ".css";
    //   if (
    //     project.bindings != undefined &&
    //     project.bindings[type] != undefined
    //   ) {
    //     if (project.bindings[type].template != undefined) {
    //       template = project.templates_folder + project.bindings[type].template;
    //     }
    //     if (project.bindings[type].style != undefined) {
    //       style = project.styles_folder + project.bindings[type].style;
    //     }
    //   }
    //   //   BuildCards(type, cardsData[type], template, style, true);
    // }
  },
};
