import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';
import { languagesWithFlags, regionsList } from '../../assets/DataLists';
import { BottomPopup } from '../../components/BottomPopup';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import DropDownMenu from '../../components/DropDownMenu';
import { speakUp } from '../../translation';

type MakeGroupprops = {
    image: string | null;
    groupName: string;
    description: string;
    location: string;
    language: string;
    PickImage: () => void;
    writeGroupData: () => void;
    greyButton: boolean;
    handleOnChangeText: (val: any, fieldname: string) => void;
};

/**
 * Renders the makeGroup screen and contains some logic for pop up and translation
 */

export const MakeGroup: React.FC<MakeGroupprops> = ({
    image,
    groupName,
    description,
    location,
    language,
    PickImage,
    writeGroupData,
    greyButton,
    handleOnChangeText
}) => {
    const { i18n, t } = useTranslation();
    let popupRef = React.createRef<BottomPopup>() as any;

    const onShowPopup = () => {
        popupRef.show();
    };

    const onClosePopup = () => {
        popupRef.close();
    };
    const handleChange = () => {
        popupRef.close();
        handleOnChangeText(popupRef.returnLocation(), 'location');
    };
    return (
        <KeyboardAvoidingView behavior="position" style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.subcontainer}>
                        {image && (
                            <Image
                                source={{ uri: image }}
                                style={{
                                    width: 200,
                                    height: 200,
                                    borderRadius: 200
                                }}
                            />
                        )}
                    </View>

                    <CustomButton
                        icon="camera"
                        onPress={PickImage}
                        text={t('Choose Image')}
                    />

                    <CustomInput
                        label={t('Group name')}
                        value={groupName}
                        left={<TextInput.Icon size={35} name="account" />}
                        setValue={(value: string) =>
                            handleOnChangeText(value, 'groupName')
                        }
                        keyboardType="default"
                        maxLength={50}
                        returnKeyType="done"
                        language={i18n.language}
                    />
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.subcontainer}>
                            <TextInput
                                label={t('Description')}
                                mode="outlined"
                                returnKeyType="done"
                                multiline={true}
                                blurOnSubmit={true}
                                onSubmitEditing={() => {
                                    Keyboard.dismiss();
                                }}
                                style={{
                                    height: 120,
                                    width: 300,
                                    margin: 10,
                                    padding: 10,
                                    left: 20,
                                    marginRight: 20,
                                    textAlignVertical: 'top'
                                }}
                                onChangeText={(value: string) =>
                                    handleOnChangeText(value, 'description')
                                }
                                placeholder="Description"
                                maxLength={300}
                                value={description}
                            />
                            <IconButton
                                style={{ margin: 0, marginTop: 60 }}
                                icon="volume-high"
                                size={35}
                                onPress={() =>
                                    speakUp(i18n.language, t('Description'))
                                }
                            />
                        </View>
                    </TouchableWithoutFeedback>

                    <CustomInput
                        left={<TextInput.Icon size={35} name="home" />}
                        label={t('Location')}
                        showSoftInputOnFocus={false}
                        value={location}
                        setValue={(value: string) =>
                            handleOnChangeText(value, 'location')
                        }
                        onPressIn={onShowPopup}
                        keyboardType="default"
                        maxLength={50}
                        returnKeyType="done"
                        language={i18n.language}
                    />
                    <BottomPopup
                        ref={(target: any) => (popupRef = target)}
                        onTouchOutside={onClosePopup}
                        title={t('Location')}
                        data={regionsList}
                        handleChange={handleChange}
                    />
                    <View
                        style={{
                            flexDirection: 'row',
                            right: Platform.OS === 'ios' ? 0 : 2
                        }}
                    >
                        <DropDownMenu
                            value={language}
                            onSelect={(selectedItem: any) => {
                                handleOnChangeText(
                                    selectedItem.name,
                                    'language'
                                );
                            }}
                            list={languagesWithFlags}
                        />
                        <IconButton
                            style={{
                                margin: 0,
                                marginTop: 15,
                                left: Platform.OS === 'ios' ? 0 : 8
                            }}
                            icon="volume-high"
                            size={35}
                            onPress={() =>
                                speakUp(i18n.language, t('Select language'))
                            }
                        />
                    </View>
                    <CustomButton
                        grey={greyButton ? true : false}
                        icon="check"
                        onPress={writeGroupData}
                        text={t('Make group')}
                    />
                </SafeAreaView>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: Platform.OS === 'ios' ? 0 : 20
    },
    subcontainer: {
        flexDirection: 'row'
    }
});
