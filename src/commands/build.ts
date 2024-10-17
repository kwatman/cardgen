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
      fs.rmSync(buildPath, { recursive: true })
    }
    fs.mkdirSync(buildPath)
    fs.mkdirSync(path.join(buildPath, 'html'))

    for (let set of config.sets) {

      //create set directory
      let setPath = path.join(buildPath, 'html', set.name)
      fs.mkdirSync(setPath)

      stdout(colorize('#00f73a', `Building set: ${set.name}`))

      //data
      let dataHandlerFactory = new DataHandlerFactory()
      let dataHandler = dataHandlerFactory.getHandler(set.data_handler)
      let data: CardData[] = await dataHandler.loadData(path.join(process.cwd(), set.data))

      //template rendering
      let templateHandlerFactory = new TemplateHandlerFactory()
      let templateHandler = templateHandlerFactory.getHandler(set.template_handler)

      for (let entry of data) {
        stdout(colorize('#00FFFF', `\tBuilding card: ${entry.name}`))
        let renderedData = await templateHandler.render(path.join(process.cwd(), set.template), entry)

        //create file
        let fileName = entry.name + '.html'
        let filePath = path.join(setPath, fileName)
        fs.writeFileSync(filePath, renderedData)
      }
      //get all files in the set directory
      let files = fs.readdirSync(setPath)

      //conver aspect ratio and dpi to pixels
      let [aspectHeigth, aspectWidth] = set.aspect_ratio.split(':')

      const widthPixels = Math.round(parseInt(aspectWidth) * set.dpi);
      const heightPixels = Math.round(parseInt(aspectHeigth) * set.dpi);

      //render templates to pictures
      const browser = await puppeteer.launch({ defaultViewport: null });
      const page = await browser.newPage();
      await page.setViewport({
        width: widthPixels,
        height: heightPixels
      })

      stdout(colorize('#00f73a', `Rendering set: ${set.name}`))
      for (let file of files) {
        let fileData = fs.readFileSync(path.join(setPath, file))

        stdout(colorize('#00f73a', `\tRendering card: ${file.replace('.html', '')}`))
        await page.setContent(fileData.toString())
        await page.addStyleTag({ path: set.style });

        for (let format of set.formats) {
          stdout(colorize('#00FFFF', `\t\tRendering format: ${format}`))
          if (!fs.existsSync(path.join(buildPath, format))) {
            fs.mkdirSync(path.join(buildPath, format))
            fs.mkdirSync(path.join(buildPath, format, set.name))
          }
          await page.screenshot({ type: format, path: path.join(buildPath, format, set.name, file.replace('.html', '.' + format)) });
        }
      }
      await browser.close();
    }
  }
}
