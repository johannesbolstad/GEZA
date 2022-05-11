import React from 'react';
import renderer, { act, ReactTestRendererJSON } from 'react-test-renderer';
import CustomButton from '../../components/CustomButton';

describe('MessageComponent', () => {
    const onSubmit = jest.fn();
    const tree = renderer
        .create(
            <CustomButton icon={'check'} text={'Sign Up'} onPress={onSubmit} />
        )
        .toJSON() as ReactTestRendererJSON[];
    const tree2 = renderer.create(
        <CustomButton icon={'check'} text={'Sign Up'} onPress={onSubmit} />
    );

    it('Renders correctly', () => {
        expect(tree).toMatchSnapshot();
    });

    it('should fire onSubmit events', () => {
        const button = tree2.root.findByProps({ testID: 'myButton' }).props;
        act(() => button.onPress());
        expect(onSubmit).toHaveBeenCalled();
    });
});
