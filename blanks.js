const propsName = (name) => `I${name}Props`; 

const indexBlank = (name) => `export { default } from './${name}';
`;


const componentBlank = (name, withStyles) => `import React, { FC } from 'react';

${withStyles ? `import { Styled${name} } from './styled';` : ''}
import { ${propsName(name)} } from './types';

const ${name}: FC<${propsName(name)}> = ({ children, ...props }) => {
  return ${withStyles ? `<Styled${name} {...props}>${name}</Styled${name}>;` : `<div {...props}>${name}</div>;`}
};

export default ${name};
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
import { shallow } from 'enzyme';
import ${name} from '.';

describe('<${name}/>', () => {
  describe('rendering', () => {
    it('should match snapshot', () => {
      const component = shallow(<${name} />);
      expect(component).toMatchSnapshot();
    });
  });
  describe('interactions', () => {});
  describe('lifecycle invocations', () => {});
});
`

module.exports = {
  testBlank,
  stylesBlank,
  typesBlank,
  componentBlank,
  indexBlank
}