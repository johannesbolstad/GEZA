import React from 'react';
import {
    Dimensions,
    FlatList,
    Modal,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';

const deviceHeight = Dimensions.get('window').height;

interface MyState {
    show: boolean;
    value: string;
}

interface MyProps {
    data: Array<any>;
    title: string;
    onTouchOutside: () => void;
    handleChange: () => void;
}

/**
 * This component is a popupmeny that gets shown on the lower half of the screen.
 *  he component takes four props
 * @param data a list of possible choices.
 * @param title the title of the popupmeny.
 * @param onTouchOutside a function who handles touch outside of the popupmeny.
 * @param handleChange a function who handles when a item is selected.
 */

export class BottomPopup extends React.Component<MyProps, MyState> {
    constructor(props: any) {
        super(props);
        this.state = {
            show: false,
            value: ''
        };
    }

    renderOutsideTouchable(onTouch: any) {
        const view = <View style={{ flex: 1, width: '100%' }} />;
        if (!onTouch) return view;
        return (
            <TouchableWithoutFeedback
                onPress={onTouch}
                style={{ flex: 1, width: '100%' }}
            >
                {view}
            </TouchableWithoutFeedback>
        );
    }

    updateValue = async (value: string) => {
        const { handleChange } = this.props;

        await this.setState({ value: value });

        handleChange();
    };


     /**
    * Returns the value of the BottomPopup the user choose 
    */
    returnLocation = () => {
        return this.state.value;
    };

    renderTitle = () => {
        let { title } = this.props;
        return (
            <View style={{ alignItems: 'center' }}>
                <Text
                    style={{
                        color: '#182E44',
                        fontSize: 25,
                        marginTop: 15,
                        marginBottom: 30
                    }}
                >
                    {title}
                </Text>
            </View>
        );
    };

    renderContent = () => {
        const { data } = this.props;
        return (
            <View>
                <FlatList
                    style={{ marginBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                    data={data}
                    renderItem={this.renderItem}
                    extraData={data}
                    keyExtractor={(index) => index.toString()}
                    ItemSeparatorComponent={this.renderSeperator}
                    contentContainerStyle={{
                        paddingBottom: 40
                    }}
                />
            </View>
        );
    };

    renderItem = ({ item }: any) => {
        return (
            <TouchableOpacity onPress={() => this.updateValue(item.name)}>
                <View
                    style={{
                        height: 50,
                        flex: 1,
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        marginLeft: 20
                    }}
                >
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: 'normal',
                            color: '#182E44'
                        }}
                    >
                        {item.name}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };


    /**
    * Renders a seperator between the itmes in the modal. 
    */
    renderSeperator = () => {
        return (
            <View
                style={{ opacity: 0.5, backgroundColor: 'black', height: 1 }}
            />
        );
    };

    /**
    * Shows the modal
    */

    show = () => {
        this.setState({ show: true });
    };

    /**
    * Hides the modal
    */
    close = () => {
        this.setState({ show: false });
    };

    render() {
        let { show } = this.state;
        const { onTouchOutside } = this.props;

        return (
            <Modal
                animationType={'fade'}
                transparent={true}
                visible={show}
                onRequestClose={this.close}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: '#000000AA',
                        justifyContent: 'flex-end'
                    }}
                >
                    {this.renderOutsideTouchable(onTouchOutside)}
                    <View
                        style={{
                            backgroundColor: '#87B18A',
                            width: '100%',
                            borderTopRightRadius: 10,
                            borderTopLeftRadius: 10,
                            paddingHorizontal: 10,
                            maxHeight: deviceHeight * 0.5
                        }}
                    >
                        {this.renderTitle()}
                        {this.renderContent()}
                    </View>
                </View>
            </Modal>
        );
    }
}
