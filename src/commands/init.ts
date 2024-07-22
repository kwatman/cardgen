import { Args, Command, Flags } from '@oclif/core'
import { colorize, stdout } from '@oclif/core/ux'
import { input } from '@inquirer/prompts';
import fs from 'fs'
import { template } from 'node_modules/@oclif/core/lib/help/util.js';

export default class Init extends Command {
  static override args = {}

  static override description = 'Initialize a new cardgen project.'

  static override examples = []

  static override flags = {
    // flag with no value (-f, --force)
    force: Flags.boolean({ char: 'f' }),
    // flag with a value (-n, --name=VALUE)
    name: Flags.string({ char: 'n', description: 'name to print' }),
  }

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Init)

    stdout(colorize('#00FFFF', 'Generating a new cardgen project'))

    let data = {
      name: '',
      templates: 'templates',
      styles: 'styles',
      data: 'data',
    }

    data.name = await input({ message: 'What is the name of the project?' })
    stdout("executing directory: " + process.cwd())
    fs.writeFileSync('./cardgen.config.json', JSON.stringify(data, null, 4))
    fs.mkdirSync('./data')
    fs.mkdirSync('./templates')
    fs.mkdirSync('./styles')
  }
}
