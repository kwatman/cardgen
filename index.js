#!/usr/bin/env node

import yargs from  'yargs/yargs'
import { hideBin } from 'yargs/helpers'
import {commands} from './commands/collection.js'

yargs(hideBin(process.argv))
    .command(commands)
    .help('h')
    .alias('h', 'help')
    .argv;

