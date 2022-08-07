import inquirer from  'inquirer';
import fs from "fs";

let module = {}

module.command = 'init'

module.describe = 'initialize a new cardgen project'

module.aliases = "n"

module.builder = {

}

module.handler = async function (argv) {
    console.log("starting creation of cardgen project");
    module.project = {}

    project = await inquirer.prompt({
        name: 'name',
        type: 'input',
        message: 'Project name: ',
        prefix: ''
    })

    project.cards_folder = await inquirer.prompt({
        name: 'cards_folder',
        type: 'input',
        message: 'Cards folder: ',
        prefix: '',
        default: './cards'
    }).then((answer) => {return answer.cards_folder})

    project.templates_folder = await inquirer.prompt({
        name: 'templates_folder',
        type: 'input',
        message: 'Templates folder: ',
        prefix: '',
        default: './templates'
    }).then((answer) => {return answer.templates_folder})

    project.styles_folder = await inquirer.prompt({
        name: 'styles_folder',
        type: 'input',
        message: 'Styles fodler: ',
        prefix: '',
        default: './styles'
    }).then((answer) => {return answer.styles_folder})

    const data = JSON.stringify(project,null,4);

    fs.writeFile('cardgen.json', data, (err) => {
        if (err) {
            throw err;
        }
        console.log("Project has been created");
    });
}

export default module