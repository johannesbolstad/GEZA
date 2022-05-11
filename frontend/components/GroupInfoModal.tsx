import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { IGroupInfoModal } from '../interfaces/types';

/**
 * A modal that displays information about a group in postScreen
 *
 * @param groupName the groupName of the group
 * @param language the preferred language of the group
 * @param modalVisible a boolean that tells if the modal is visible
 * @param setVisible a function that opens or closes the modal
 * @param description the description of the group
 */

const GroupInfoModal: React.FC<IGroupInfoModal> = ({
    groupName,
    language,
    modalVisible,
    setVisible,
    description
}) => {
    const { t } = useTranslation();

    return (
        <View style={[styles.centeredView]}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setVisible();
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ right: 30 }}>
                            <Text>
                                <Text style={{ fontWeight: 'bold' }}>
                                    {t('Group name')}:
                                </Text>
                                {groupName}
                            </Text>
                        </View>
                        <View style={{ right: 5, marginTop: 20 }}>
                            <Text>
                                <Text style={{ fontWeight: 'bold' }}>
                                    {t('Description')}:
                                </Text>
                                {description}
                            </Text>
                        </View>
                        <View style={{ right: 75, marginTop: 20 }}>
                            <Text>
                                <Text style={{ fontWeight: 'bold' }}>
                                    {t('Language')}:
                                </Text>
                                {language}
                            </Text>
                        </View>
                        <View style={styles.buttonView}>
                            <Pressable
                                accessible={true}
                                accessibilityLabel={'Close'}
                                style={styles.buttonClose}
                                onPress={() => {
                                    setVisible();
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        marginLeft: 20
                                    }}
                                >
                                    <MaterialIcons
                                        name="cancel-presentation"
                                        size={30}
                                        color="white"
                                    />
                                </View>

                                <Text style={styles.textStyle}>
                                    {t('Cancel')}
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default GroupInfoModal;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    modalView: {
        margin: 15,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },

    buttonView: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: 20,
        paddingTop: 10
    },
    buttonClose: {
        backgroundColor: '#ff0000',
        minWidth: 100,
        borderRadius: 10,
        width: 80,
        padding: 10,
        marginRight: 10
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center'
    }
});
