#!/usr/bin/env node
const Listr = require('listr');
const { 
  parseArgs,
  createDir,
  createFile
} = require('./helpers');

const {
  indexBlank,
  stylesBlank,
  typesBlank,
  componentBlank,
  testBlank
} = require('./blanks');

const { 
  name = '',
  path = '',
  s: withStyles = false,
  t: withTests = false
} = parseArgs(process.argv);

if(!name) throw new Error('grc: missed flag --name')

const pathWithoutLastSlash = path.replace(/\/$/g, '');
const pathWithName = path ? `${pathWithoutLastSlash}/${name}` : `${name}`;
const createFileInDir = createFile.bind(null, pathWithName);

const tasks = new Listr([
  {
    title: `Creating folder ${pathWithName}`,
    task: () => createDir(pathWithName)
  },
  {
    title: 'Creatings files',
    task: () =>
      new Listr([
        {
          title: 'index.ts',
          task: () => createFileInDir('index.ts', indexBlank(name))
        },
        {
          title: 'types.ts',
          task: () => createFileInDir('types.ts', typesBlank())
        },
        {
          title: `${name}.tsx`,
          task: () => createFileInDir(`${name}.tsx`, componentBlank(name, withStyles))
        },
        {
          title: 'styles.ts',
          skip: () => !withStyles,
          task: () => createFileInDir('styles.ts', stylesBlank())
        },
        {
          title: 'spec.tsx',
          skip: () => !withTests,
          task: () => createFileInDir('spec.tsx', testBlank(name))
        },
      ], {concurrent: true})
  }
]);

//execute
try {
  tasks.run()
} catch (e) {
  console.log(e)
}
