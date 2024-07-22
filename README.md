cardgen
=================

A new CLI generated with oclif


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/cardgen.svg)](https://npmjs.org/package/cardgen)
[![Downloads/week](https://img.shields.io/npm/dw/cardgen.svg)](https://npmjs.org/package/cardgen)


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g cardgen
$ cardgen COMMAND
running command...
$ cardgen (--version)
cardgen/0.0.0 linux-x64 node-v20.14.0
$ cardgen --help [COMMAND]
USAGE
  $ cardgen COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`cardgen hello PERSON`](#cardgen-hello-person)
* [`cardgen hello world`](#cardgen-hello-world)
* [`cardgen help [COMMAND]`](#cardgen-help-command)
* [`cardgen plugins`](#cardgen-plugins)
* [`cardgen plugins add PLUGIN`](#cardgen-plugins-add-plugin)
* [`cardgen plugins:inspect PLUGIN...`](#cardgen-pluginsinspect-plugin)
* [`cardgen plugins install PLUGIN`](#cardgen-plugins-install-plugin)
* [`cardgen plugins link PATH`](#cardgen-plugins-link-path)
* [`cardgen plugins remove [PLUGIN]`](#cardgen-plugins-remove-plugin)
* [`cardgen plugins reset`](#cardgen-plugins-reset)
* [`cardgen plugins uninstall [PLUGIN]`](#cardgen-plugins-uninstall-plugin)
* [`cardgen plugins unlink [PLUGIN]`](#cardgen-plugins-unlink-plugin)
* [`cardgen plugins update`](#cardgen-plugins-update)

## `cardgen hello PERSON`

Say hello

```
USAGE
  $ cardgen hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ cardgen hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [src/commands/hello/index.ts](https://github.com/cardgen/cardgen/blob/v0.0.0/src/commands/hello/index.ts)_

## `cardgen hello world`

Say hello world

```
USAGE
  $ cardgen hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ cardgen hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/cardgen/cardgen/blob/v0.0.0/src/commands/hello/world.ts)_

## `cardgen help [COMMAND]`

Display help for cardgen.

```
USAGE
  $ cardgen help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for cardgen.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.6/src/commands/help.ts)_

## `cardgen plugins`

List installed plugins.

```
USAGE
  $ cardgen plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ cardgen plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.3.8/src/commands/plugins/index.ts)_

## `cardgen plugins add PLUGIN`

Installs a plugin into cardgen.

```
USAGE
  $ cardgen plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into cardgen.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the CARDGEN_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the CARDGEN_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ cardgen plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ cardgen plugins add myplugin

  Install a plugin from a github url.

    $ cardgen plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ cardgen plugins add someuser/someplugin
```

## `cardgen plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ cardgen plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ cardgen plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.3.8/src/commands/plugins/inspect.ts)_

## `cardgen plugins install PLUGIN`

Installs a plugin into cardgen.

```
USAGE
  $ cardgen plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into cardgen.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the CARDGEN_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the CARDGEN_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ cardgen plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ cardgen plugins install myplugin

  Install a plugin from a github url.

    $ cardgen plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ cardgen plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.3.8/src/commands/plugins/install.ts)_

## `cardgen plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ cardgen plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ cardgen plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.3.8/src/commands/plugins/link.ts)_

## `cardgen plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ cardgen plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ cardgen plugins unlink
  $ cardgen plugins remove

EXAMPLES
  $ cardgen plugins remove myplugin
```

## `cardgen plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ cardgen plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.3.8/src/commands/plugins/reset.ts)_

## `cardgen plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ cardgen plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ cardgen plugins unlink
  $ cardgen plugins remove

EXAMPLES
  $ cardgen plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.3.8/src/commands/plugins/uninstall.ts)_

## `cardgen plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ cardgen plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ cardgen plugins unlink
  $ cardgen plugins remove

EXAMPLES
  $ cardgen plugins unlink myplugin
```

## `cardgen plugins update`

Update installed plugins.

```
USAGE
  $ cardgen plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.3.8/src/commands/plugins/update.ts)_
<!-- commandsstop -->
