import React, { Dispatch, SetStateAction } from 'react';
import {
    Image,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { CheckBox } from 'react-native-elements';

interface MyProps {
    data: Array<any>;
    handleChange: Dispatch<SetStateAction<string[]>>;
}

interface MyState {
    data: any[];
}

/**
 * This component creates checkboxes for the provided data, and displays a list with the data and the associated checkboxes.
 * inspired by https://www.youtube.com/watch?v=SJQuAspVNG4
 * 
 * @param data the list of data we want chekboxes for
 * @param handleChange a function who handles when a item is selected.
 */
export class CheckboxList extends React.Component<MyProps, MyState> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: this.props.data
        };
    }

    //creates a list with the checked items and hand it over to the handleChange method
    setSelectedItems() {
        const state = this.state;
        const selectedItems: any[] = state.data.filter(
            (item) => item.checked === true
        );
        const selectedItemsNames: string[] = selectedItems.map(
            (item) => item.name
        );
        this.props.handleChange(selectedItemsNames);
    }

    //changes the status (checked/unchecked) for the checkbox with the provided ID
    valueChange(index: number) {
        const state = this.state;
        state.data[index].checked = !state.data[index].checked;
        this.setState(state);
        this.setSelectedItems();
    }

    renderItems = () => {
        return this.state.data.map((item, index) => {
            return (
                <TouchableOpacity
                    key={index}
                    style={styles.view}
                    onPress={() => this.valueChange(index)}
                >
                    <CheckBox
                        containerStyle={styles.container}
                        checkedColor="black"
                        title={item.name}
                        checked={item.checked}
                        onPress={() => this.valueChange(index)}
                    />
                    {item.image ? (
                        <Image
                            source={item.image}
                            style={styles.dropdownRowImage}
                        />
                    ) : null}
                </TouchableOpacity>
            );
        });
    };

    render() {
        return <SafeAreaView>{this.renderItems()}</SafeAreaView>;
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        width: 200
    },
    view: {
        flexDirection: 'row'
    },
    dropdownRowImage: {
        width: 40,
        height: 40,
        marginTop: 10
    }
});
