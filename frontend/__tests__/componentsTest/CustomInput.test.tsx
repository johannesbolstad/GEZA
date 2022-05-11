import React from 'react';
import renderer, { act, ReactTestRendererJSON } from 'react-test-renderer';
import CustomInput from '../../components/CustomInput';
import { speakUp } from '../../translation';

jest.mock('../../translation');

describe('CustomInput commponent', () => {
    const onPressIn = jest.fn();
    const setValue = jest.fn();
    const tree = renderer
        .create(
            <CustomInput
                label={'home'}
                value={''}
                keyboardType={undefined}
                maxLength={25}
                language={'en'}
            />
        )
        .toJSON() as ReactTestRendererJSON[];
    const tree2 = renderer.create(
        <CustomInput
            label={'home'}
            value={''}
            keyboardType={undefined}
            maxLength={25}
            language={'en'}
            onPressIn={onPressIn}
            setValue={setValue}
        />
    );

    it('Renders correctly', () => {
        expect(tree).toMatchSnapshot();
    });

    it('should fire onPressIn events', () => {
        const inputField = tree2.root.findByProps({ testID: 'MyInput' }).props;
        act(() => inputField.onPressIn());
        expect(onPressIn).toHaveBeenCalled();
    });

    it('Should call setValue when text is change', () => {
        const inputField = tree2.root.findByProps({ testID: 'MyInput' }).props;
        act(() => inputField.onChangeText());
        console.log(inputField.type);
        expect(setValue).toHaveBeenCalled();
    });

    it('icon button should call SpeakUp function when pressed', async () => {
        speakUp as jest.Mock;
        const iconButton = tree2.root.findByProps({
            testID: 'MyIconButton'
        }).props;
        act(() => iconButton.onPress());
        expect(speakUp).toBeCalled();
    });
});
