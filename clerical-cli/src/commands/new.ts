import { Command, flags } from '@oclif/command';
import { join } from 'path';
import * as fs from 'fs-extra';
import * as cp from 'child_process';

export default class New extends Command {
    static description = 'describe the command here'

    static examples = [
        `$ clerical new myclericalapp`,
    ]

    static flags = {
        help: flags.help({ char: 'h' }),
        directory: flags.string({ char: 'd', description: 'directory to create the project', default: '{name}' }),
        'dry-run': flags.boolean({ char: 'r', description: 'do not generate any files', default: false }),
        force: flags.boolean({ char: 'f' })
    }

    static args = [{ name: 'name', required: true }]

    async run() {
        const { args, flags } = this.parse(New);
        const { name } = args;
        const { directory, force } = flags;
        if (!name) {
            this.error('A name is required.');
        }
        const dir = join(process.cwd(), directory.replace(/{name}/, name));
        if (!flags['dry-run']) {
            if (fs.existsSync(dir) && !force) {
                this.error(`The directory already exists: ${dir}. Please use force or remove the directory if you would like to use it.`);
            }
            fs.ensureDirSync(dir);    
        }

        this.log(`Generating a project with the name ${name} in the directory ${dir}`);
        const commands = [
            { type: 'cmd', cmd: 'npm init --yes' },
            { type: 'cmd', cmd: 'tsc --init' },
            { type: 'cp', file: 'app.config.ts', to: 'src' },
            { type: 'cp', file: 'app.config.ts', to: 'src' },
            { type: 'cp', file: 'index.html', to: 'src' },
            { type: 'cp', file: 'main.ts', to: 'src' },
            { type: 'cp', file: 'main.css', to: 'src' },
            { type: 'cp', file: 'app.config.ts', to: 'src' },
            { type: 'cp', file: 'webpack.config.js', to: '.' },
            { type: 'cmd', cmd: 'npm install @clerical/core @webcomponents/webcomponentsjs --save' },
            { type: 'cmd', cmd: 'npm install rimraf ts-loader style-loader css-loader typescript webpack webpack-cli webpack-dev-server copy-webpack-plugin --save-dev' },
            { type: 'script', name: 'start', cmd: 'webpack-dev-server --config webpack.config.js' },
            { type: 'script', name: 'build', cmd: 'webpack --config webpack.config.js' },
            { type: 'script', name: 'test', cmd: 'echo No testing setup yet' }
        ]
        for (const cmd of commands) {
            if (cmd.type === 'cmd') {
                this.log(cmd.cmd);
                if (!flags['dry-run']) {
                    cp.execSync(cmd.cmd!, { cwd: dir });
                }
            } else if (cmd.type === 'cp') {
                this.log(`Creating file: ${cmd.file}`)
                if (!flags['dry-run']) {
                    await this.copyFileWithConfig(cmd.file!, cmd.to!, dir, name);
                }
            } else if (cmd.type === 'script') {
                this.log(`Adding script ${cmd.name} to package.json.`);
                if (!flags['dry-run']) {
                    await this.addScriptToPackage(cmd.name!, cmd.cmd!, dir);
                }
            }
        }
    }

    async copyFileWithConfig(file: string, toRelative: string, destinationDir: string, name: string) {
        const from = join(__dirname, 'new/config', `${file}template`);
        const to = join(destinationDir, toRelative, file);
        await fs.ensureDir(join(destinationDir, toRelative));
        const contents = (await fs.readFile(from, 'utf-8')).replace(/{{name}}/g, name);
        await fs.writeFile(to, contents, 'utf-8');
    }

    async addScriptToPackage(name: string, cmd: string, destinationDir: string) {
        const packagejson = join(destinationDir, 'package.json');
        const contents = JSON.parse(await fs.readFile(packagejson, 'utf-8'));
        contents.scripts[name] = cmd;
        await fs.writeFile(packagejson, JSON.stringify(contents, null, 4), 'utf-8');
    }
}
