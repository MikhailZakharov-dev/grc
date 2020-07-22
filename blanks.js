const indexBlank = (name) => `export { default } from './${name}';
`;

const componentBlank = (name, withStyles) => `import React, { FC } from 'react';
import { Props } from './types';

${withStyles ? `import { Wrapper } from './styles';` : ''}

const ${name}: FC<Props> = () => {
  return ${withStyles ? `<Wrapper>${name}</Wrapper>;` : `<div>${name}</div>;`}
};

export default ${name};
`

const typesBlank = () => `interface IComponentOwnProps {};

export interface IComponentProps extends IComponentOwnProps {};
`

const stylesBlank = () => `import styled from 'styled-components/macro';
import { Props } from './types';

export const Wrapper = styled.div<Props>\`\`;
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