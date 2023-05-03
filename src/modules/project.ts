import fs from 'fs'

let projectModule = {}

projectModule.init = (projectName,cards_folder,templates_folder,styles_folder) => {
    let project = {
        name: projectName,
        cards_folder: cards_folder,
        templates_folder: templates_folder,
        styles_folder: styles_folder
    }
    fs.writeFileSync('./cardgen.json',JSON.stringify(project, null, "\t"))
}

export default projectModule;

