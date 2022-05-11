import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { t } from 'i18next';
import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import { IGroupModal } from '../../interfaces/types';
import { RootStackParamList } from '../../navigation/AppNavigator';
import styles from './styles';

type GroupModalNavigationProp = StackNavigationProp<
    RootStackParamList,
    'PostContainer'
>;

/**
 * A modal that will be displayed when a user taps on a given GroupCard
 * The modal displays description, language and name of a given group
 * and allows the user to join the group by tapping the join Button.
 */

const GroupModal: React.FC<IGroupModal> = ({
    groupId,
    groupName,
    language,
    description,
    modalVisible,
    setVisible,
    joinGroup
}: IGroupModal) => {
    const navigation = useNavigation<GroupModalNavigationProp>();

    const navigateToPosts = () => {
        navigation.navigate('PostContainer', {
            groupName: groupName,
            groupId: groupId,
            language: language,
            description: description
        });
    };

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
                        <Text style={styles.modalText}>
                            {t('Do you want to join')} "
                            <Text style={styles.groupInfoText}>
                                {groupName}
                            </Text>
                            "?
                        </Text>
                        <Text>
                            <Text style={styles.groupInfoText}>
                                {t('Description')}:
                            </Text>
                            {description}
                        </Text>
                        <Text>
                            <Text style={styles.groupInfoText}>
                                {t('Language')}:
                            </Text>
                            {language}
                        </Text>
                        <View style={styles.buttons}>
                            <Pressable
                                accessible={true}
                                accessibilityLabel={'Cancel to join group'}
                                style={[styles.button, styles.buttonClose]}
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
                            <Pressable
                                accessible={true}
                                accessibilityLabel={'Join a group'}
                                style={[styles.button, styles.buttonOpen]}
                                onPress={() => {
                                    joinGroup(groupId);
                                    navigateToPosts();
                                    setVisible();
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        marginLeft: 20
                                    }}
                                >
                                    <Feather
                                        name="check"
                                        size={30}
                                        color="white"
                                    />
                                </View>
                                <Text style={styles.textStyle}>
                                    {t('Join')}
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default GroupModal;
