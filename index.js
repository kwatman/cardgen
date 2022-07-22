#!/usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
var argv = require('yargs/yargs')(process.argv.slice(2))
    .commandDir('commands')
    .usage('Usage: $0 [options]')
    .help('h')
    .alias('h', 'help')
    .argv;

