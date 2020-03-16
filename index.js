#!/usr/bin/env node
const fs = require('fs');
const Listr = require('listr');

const parseArgs = (args) => {
  return args
    .slice(2)
    .reduce((obj, cur) => {
      // long arg
      if (cur.startsWith('--')) {
        const [flag, value = true] = cur.split('=');
        const name = flag.slice(2);
        obj[name] = value;
      }
      // flags
      else if (cur.startsWith('-')) {
        const flags = cur.slice(1).split('');
        flags.forEach(flag => {
          obj[flag] = true;
        });
      }
      return obj
    }, {});
}

const { 
  name = 'genrcBlank',
  path = '',
  s: styles = false
} = parseArgs(process.argv);

const pathWithoutLastSlash = path.replace(/\/$/g, '');
const pathWithName = path ? `${pathWithoutLastSlash}/${name}` : `${name}`;

const createDir = (dirPath) => {
  return new Promise((resolve, reject) => {
    fs.mkdir(dirPath, { recursive: true }, (err) => {
      if (err) reject(err)
      else resolve()
    })
  })
}

const createFile = (filePath, fileName, content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(`${filePath}/${fileName}`, content, (err) => {
      if (err) reject(err)
      else resolve()
    });
  })
}

const createFileInDir = createFile.bind(null, pathWithName);
const indexBlank = `export { default } from './${name}';`;
const componentBlank = `
import React, { FC } from 'react';
${styles ? "import { useStyles } from './styles';" : ''}
type OwnProps = {};

type Props = OwnProps;

const ${name}: FC<Props> = (props) => {
  ${styles ? 'const styles = useStyles();' : ''}
  return (
    <div>${name}</div>
  );
};

export default ${name};
`

const stylesBlank = `
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {},
}));
`

const tasks = new Listr([
  {
    title: `Creating folder ${pathWithName}`,
    task: () => createDir(pathWithName)
  },
  {
    title: 'Creatings files',
    task: () => {
      return new Listr([
				{
					title: 'index.ts',
					task: () => createFileInDir('index.ts', indexBlank)
				},
				{
					title: `${name}.tsx`,
					task: () => createFileInDir(`${name}.tsx`, componentBlank)
        },
        {
          title: 'styles.ts',
          skip: () => !styles,
          task: () => createFileInDir('styles.ts', stylesBlank)
        }
			], {concurrent: true});
    }
  }
]);


//execute
try {
  tasks.run()
} catch (e) {
  console.log(e)
}
