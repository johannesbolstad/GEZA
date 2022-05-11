import React from 'react';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';
import CustomHeader from '../../components/CustomHeader';

jest.mock('@react-navigation/native');
describe('DefaultHeader snaphot', () => {
    const tree = renderer
        .create(<CustomHeader />)
        .toJSON() as ReactTestRendererJSON[];

    it('renders correctly across screens', () => {
        expect(tree).toMatchSnapshot();
    });
});
