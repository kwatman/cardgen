import { Args, Command, Flags } from '@oclif/core'
import { getConfig } from '../utils/config.js'
import fs from 'fs'
import { CardgenConfig } from '../types/CardgenConfig.js'
import path from 'path';
import { colorize, stdout } from '@oclif/core/ux'
import DataHandlerFactory from '../handlers/data/DataHandlerFactory.js'
import TemplateHandlerFactory from '../handlers/template/TemplateHandlerFactory.js'
import { CardData } from '@/types/CardData.js';
import puppeteer from 'puppeteer';


export default class Build extends Command {
  static override args = {}

  static override description = 'Builds the whole cardgen project'

  static override examples = []

  static override flags = {}

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Build)
    let config: CardgenConfig = await getConfig(process.cwd())

    //remove existing build directory
    let buildPath = path.join(process.cwd(), 'dist')

    if (fs.existsSync(buildPath)) {
      fs.rmdirSync(buildPath, { recursive: true })
    }
    fs.mkdirSync(buildPath)

    for (let set of config.sets) {

      //create set directory
      let setPath = path.join(buildPath, set.name)
      fs.mkdirSync(setPath)

      stdout(colorize('#00FFFF', `Building set: ${set.name}`))

      //data
      let dataHandlerFactory = new DataHandlerFactory()
      let dataHandler = dataHandlerFactory.getHandler(set.data_handler)
      let data: CardData[] = await dataHandler.loadData(path.join(process.cwd(), set.data))

      //template rendering
      let templateHandlerFactory = new TemplateHandlerFactory()
      let templateHandler = templateHandlerFactory.getHandler(set.template_handler)

      for (let entry of data) {
        let renderedData = await templateHandler.render(path.join(process.cwd(), set.template), entry)
        console.log(renderedData);

        //create file
        let fileName = entry.name + '.html'
        let filePath = path.join(setPath, fileName)
        fs.writeFileSync(filePath, renderedData)
      }

      //get all files in the set directory
      let files = fs.readdirSync(setPath)

      //render templates to pictures
      const browser = await puppeteer.launch({ defaultViewport: null });
      const page = await browser.newPage();
      await page.setViewport({
        width: 240,
        height: 336
      })

      for (let file of files) {
        let fileData = fs.readFileSync(path.join(setPath, file))
        await page.setContent(fileData.toString())
        await page.screenshot({ path: path.join(setPath, file.replace('.html', '.png')) });
      }
      await browser.close();

      // render(path.join(process.cwd(), config.templates, file), null)
    }
  }
}
