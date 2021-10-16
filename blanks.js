const propsName = (name) => `I${name}Props`; 

const indexBlank = (name) => `export { ${name} } from './${name}';
`;


const componentBlank = (name, withStyles) => `import React, { FC } from 'react';

${withStyles ? `import { Styled${name} } from './styled';` : ''}
import { ${propsName(name)} } from './types';

export const ${name}: FC<${propsName(name)}> = ({ children, ...props }) => {
  return ${withStyles ? `<Styled${name} {...props}>${name}</Styled${name}>;` : `<div {...props}>${name}</div>;`}
};
`

const typesBlank = (name) => `export interface ${propsName(name)} {
  className?: string;
  onClick?: () => void;
}
`

const stylesBlank = (name) => `import styled from 'styled-components/macro';

export const Styled${name} = styled.div\`\`;
`

const testBlank = (name) => `import React from 'react';
import { render } from 'utils/test-utils';
import { ${name} } from './${name}';

describe('<${name}/>', () => {
  describe('рендер', () => {
    it('должен ...', () => {
      render(<${name} />);
    });
  });
  describe('действия', () => {});
  describe('жизненные циклы', () => {});
});
`

module.exports = {
  testBlank,
  stylesBlank,
  typesBlank,
  componentBlank,
  indexBlank
}