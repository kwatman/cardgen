import fs from "fs";
import path from 'path';
import { createSpinner } from 'nanospinner';
import chalk from 'chalk';
import { parse } from "csv-parse/sync";
import BuildCards from "../modules/card_builder.js";
let module = {};
module.command = 'build';
module.describe = 'build the whole cardgen project';
module.aliases = "B";
module.builder = {};
module.handler = async function (argv) {
  let project = JSON.parse(fs.readFileSync("./cardgen.json"));
  console.log(chalk.green("buidling project: " + project.name));
  let cardsData = {};
  let cardFiles = fs.readdirSync(project.cards_folder);
  cardFiles.forEach(file => {
    if (path.extname(file) == '.csv') {
      const spinner = createSpinner("loading: " + file).start();
      let data = fs.readFileSync(project.cards_folder + file);
      cardsData[path.parse(file).name] = parse(data, {
        delimiter: ",",
        columns: true
      });
      spinner.success();
    }
  });
  for (let type in cardsData) {
    let template = project.templates_folder + type + ".html";
    let style = project.styles_folder + type + ".css";
    if (project.bindings != undefined && project.bindings[type] != undefined) {
      if (project.bindings[type].template != undefined) {
        template = project.templates_folder + project.bindings[type].template;
      }
      if (project.bindings[type].style != undefined) {
        style = project.styles_folder + project.bindings[type].style;
      }
    }
    BuildCards(type, cardsData[type], template, style, true);
  }
};
export default module;