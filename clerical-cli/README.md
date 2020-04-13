Clerical CLI
============

The Clerical CLI tool

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/clerical-cli.svg)](https://npmjs.org/package/clerical-cli)
[![Downloads/week](https://img.shields.io/npm/dw/clerical-cli.svg)](https://npmjs.org/package/clerical-cli)
[![License](https://img.shields.io/npm/l/clerical-cli.svg)](https://github.com/clerical-ui/clerical/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @clerical/cli
$ clerical COMMAND
running command...
$ clerical (-v|--version|version)
@clerical/cli/0.0.3 darwin-x64 node-v13.6.0
$ clerical --help [COMMAND]
USAGE
  $ clerical COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`clerical help [COMMAND]`](#clerical-help-command)
* [`clerical new NAME`](#clerical-new-name)

## `clerical help [COMMAND]`

display help for clerical

```
USAGE
  $ clerical help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

## `clerical new NAME`

describe the command here

```
USAGE
  $ clerical new NAME

OPTIONS
  -d, --directory=directory  [default: {name}] directory to create the project
  -f, --force
  -h, --help                 show CLI help
  -r, --dry-run              do not generate any files

EXAMPLE
  $ clerical new myclericalapp
```

_See code: [src/commands/new.ts](https://github.com/clerical-ui/clerical/blob/v0.0.3/src/commands/new.ts)_
<!-- commandsstop -->
