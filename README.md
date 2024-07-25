# CardGen

cardgen is a CLI tool for generating card sets from data and templates. It processes data files and templates to produce HTML and image files for each card in the set.

## Features

- **Multiple Data Formats**: Supports JSON, CSV, and Excel files as data sources.
- **Output Formats**: Generates html, jpeg, png, and webp files for your cards.

## Installation

### Requirements
 - Latest version of Node.js installed on your system

### Installing
Install the CLI with:

```bash
# npm
npm install -g cardgen

# pnpm
pnpm install -g cardgen
```

## Usage

### Create a new cardgen project

```bash
cardgen init
```
This will create a `cardgen.config.json` file and 3 folders: `styles`, `data`, and `templates`

### Config

The `cardgen.config.json`file contains the configuration for your project. Here is an example:

```json
{
    "name": "hackerz",
    "output": "output",
    "sets": [
        {
            "name": "programs",
            "template_handler": "ejs",
            "template": "templates/program.ejs",
            "data_handler": "json",
            "data": "data/programs"
        }
    ]
}
```

#### Options

- `name`: The name of the project.
- `output`: The directory where the generated files will be saved.
- `sets`: An array of sets to be generated. Each set has the following options:
  - `name`: The name of the set.
  - `template_handler`: The template handler to use (e.g., `ejs`).
  - `template`: The path to the template file.
  - `data_handler`: The data handler to use (e.g., `json`).
  - `data`: The path to the data file.

### Building

To build the project, run:

```bash
cardgen build
```

This will generate the cards based on the configuration in your `cardgen.config.json` file.
