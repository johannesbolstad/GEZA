import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { t } from 'i18next';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

type DropDownMenuProps = {
    value: any;
    onSelect: (selectedItem: string) => void;
    list: Array<Object>;
};

/**
 * This component is inspired by: https://github.com/AdelRedaa97/react-native-select-dropdown
 */

const DropDownMenu: React.FC<DropDownMenuProps> = ({
    value,
    onSelect,
    list
}) => {
    return (
        <SelectDropdown
            defaultValue={value}
            data={list}
            onSelect={onSelect}
            buttonStyle={styles.dropdownButton}
            buttonTextAfterSelection={(selectedItem) => {
                return selectedItem;
            }}
            rowTextForSelection={(item) => {
                return item;
            }}
            renderCustomizedButtonChild={(selectedItem) => {
                return (
                    <View style={styles.dropdownButtonChild}>
                        {selectedItem ? (
                            <Image
                                source={selectedItem.image}
                                style={styles.dropdownButtonImage}
                            />
                        ) : (
                            <Ionicons
                                name="md-earth-sharp"
                                color={'#444'}
                                size={32}
                            />
                        )}
                        <Text style={styles.dropdownButtonText}>
                            {selectedItem
                                ? selectedItem.name
                                : t('Select language')}
                        </Text>
                        <FontAwesome
                            name="chevron-down"
                            color={'#445'}
                            size={18}
                        />
                    </View>
                );
            }}
            dropdownStyle={{ backgroundColor: '#f6f6f' }}
            rowStyle={styles.dropdownRow}
            renderCustomizedRowChild={(item) => {
                return (
                    <View style={styles.dropdownRowChild}>
                        <Image
                            source={item.image}
                            style={styles.dropdownRowImage}
                        />
                        <Text style={styles.dropdownRowTxt}>{item.name}</Text>
                    </View>
                );
            }}
        />
    );
};

const styles = StyleSheet.create({
    dropdownButton: {
        width: 290,
        height: 60,
        marginTop: 10,
        marginRight: 30,
        backgroundColor: '#f6f6f6',
        paddingHorizontal: 0,
        borderWidth: 1,
        borderRadius: 8
    },
    dropdownButtonChild: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 18
    },
    dropdownButtonImage: {
        width: 50,
        height: 45,
        resizeMode: 'cover'
    },
    dropdownButtonText: {
        color: '#445',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 22
    },
    dropdownRow: {
        backgroundColor: 'slategray',
        borderBottomColor: '#445',
        height: 50
    },
    dropdownRowChild: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 18
    },
    dropdownRowImage: {
        width: 45,
        height: 45,
        resizeMode: 'cover'
    },
    dropdownRowTxt: {
        color: '#F1F1F1',
        textAlign: 'center',
        fontSize: 24,
        marginHorizontal: 12
    }
});
export default DropDownMenu;
