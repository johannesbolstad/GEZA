import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { languagesWithFlags } from '../../assets/DataLists';
import CustomButton from '../../components/CustomButton';
import DropDownMenu from '../../components/DropDownMenu';
import { speakUp } from '../../translation';

type Languageprops = {
    language: string;
    greyButton: boolean;
    writeData: () => void;
    changeLanguage: (language: string) => void;
    setLanguage: (language: string) => void;
};

/**
 * Renders the language screen
 */

export const Language: React.FC<Languageprops> = ({
    language,
    greyButton,
    writeData,
    changeLanguage,
    setLanguage
}) => {
    const { i18n, t } = useTranslation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.subcontainer}>
                <Image
                    source={require('../../assets/logo.png')}
                    style={styles.logo}
                />
            </View>

            <View style={styles.subcontainer}>
                <View
                    style={{
                        flexDirection: 'column',
                        marginLeft: Platform.OS !== 'web' ? 0 : 50
                    }}
                >
                    <DropDownMenu
                        value={language}
                        onSelect={(selectedItem: any) => {
                            setLanguage(selectedItem.title);
                            changeLanguage(
                                selectedItem.name.slice(0, 2).toLowerCase()
                            );
                        }}
                        list={languagesWithFlags}
                    />
                </View>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginRight: Platform.OS !== 'web' ? 0 : 1
                    }}
                >
                    <IconButton
                        style={styles.soundIcon}
                        icon="volume-high"
                        size={35}
                        onPress={() =>
                            speakUp(i18n.language, t('Select language'))
                        }
                    />
                </View>
            </View>
            <CustomButton
                icon="check"
                grey={greyButton ? true : false}
                onPress={writeData}
                text={t('Continue')}
            />
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#87B18A',
        alignItems: 'center',
        justifyContent: 'center'
    },
    subcontainer: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        marginRight: Platform.OS !== 'web' ? 0 : 5
    },
    logo: {
        display: 'flex',
        flexDirection: 'row',
        width: 116,
        height: 56,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    soundIcon: {
        flexDirection: 'column',
        margin: 0,
        marginTop: 10,
        ...Platform.select({
            ios: {
                right: 0
            },
            android: {
                right: 5
            },
            default: {
                right: 20
            }
        }),
        top: Platform.OS === 'ios' ? 0 : 5
    }
});
