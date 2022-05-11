import { AntDesign } from '@expo/vector-icons';
import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import {
    ActivityIndicator,
    Dimensions,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import FilterGroups from '../../components/FilterGroups/FilterGroups';
import GroupCard from '../../components/GroupCard/GroupCard';
import { GroupObj } from '../../interfaces/types';

type GroupOverviewprops = {
    setLocations: Dispatch<SetStateAction<string[]>>;
    setLanguages: Dispatch<SetStateAction<string[]>>;
    searchPhrase: string;
    setSearchPhrase: Dispatch<SetStateAction<string>>;
    navigateToMakeGroup: () => void;
    filter: () => { [id: string]: GroupObj };
    findImage: (image: string) => string;
    joinGroup: (id: string) => void;
    memberOfGroup: (id: string) => boolean;
    showLessGroups: () => void;
    loadMoreGroups: () => void;
};

/**
 * Renders the groupOverview screen
 */

export const GroupOverview: React.FC<GroupOverviewprops> = ({
    setLocations,
    setLanguages,
    searchPhrase,
    setSearchPhrase,
    navigateToMakeGroup,
    filter,
    findImage,
    joinGroup,
    memberOfGroup,
    showLessGroups,
    loadMoreGroups
}) => {
    const { t } = useTranslation();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                invertStickyHeaders={true}
                contentContainerStyle={styles.contentContainer}
            >
                <View style={styles.filter}>
                    <FilterGroups
                        setLocations={setLocations}
                        setLanguages={setLanguages}
                        searchPhrase={searchPhrase}
                        setSearchPhrase={setSearchPhrase}
                    />
                </View>
                <TouchableOpacity
                    style={styles.newGroupButton}
                    onPress={() => {
                        navigateToMakeGroup();
                    }}
                >
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <AntDesign
                            name="addusergroup"
                            size={36}
                            color="black"
                        />
                        <Text style={styles.newGroupText}>
                            {t('Create new Group')}
                        </Text>
                    </View>
                </TouchableOpacity>
                {Object.keys(filter()).length > 0 ? (
                    Object.keys(filter()).map((key) => {
                        const imageContent = findImage(filter()[key].image);
                        return (
                            <View key={key}>
                                <GroupCard
                                    groupId={key}
                                    groupname={filter()[key].groupname}
                                    description={filter()[key].description}
                                    admin={filter()[key].admin}
                                    groupmembers={filter()[key].groupmembers}
                                    language={filter()[key].language}
                                    image={imageContent}
                                    joinGroup={joinGroup}
                                    memberOfGroup={memberOfGroup}
                                />
                            </View>
                        );
                    })
                ) : (
                    <View>
                        <ActivityIndicator size="small" color="#0000ff" />
                        <Text>Det finnes ingen grupper nå for tiden..</Text>
                    </View>
                )}
                <View style={styles.buttonView}>
                    <View style={{ margin: 15, marginRight: 25 }}>
                        <TouchableOpacity
                            style={styles.buttons}
                            accessible={true}
                            onPress={() => loadMoreGroups()}
                            accessibilityLabel="Vis mer!"
                        >
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <AntDesign
                                    name="arrowdown"
                                    size={35}
                                    color="black"
                                />
                                <Text style={styles.btnText}>
                                    {' '}
                                    {t('SHOW MORE')}{' '}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={styles.buttons}
                            accessible={true}
                            onPress={() => showLessGroups()}
                            accessibilityLabel="Vis mindre"
                        >
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <AntDesign
                                    name="arrowup"
                                    size={35}
                                    color="black"
                                />
                                <Text style={styles.btnText}>
                                    {t('SHOW LESS')}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        marginLeft: 0,
        backgroundColor: 'white'
    },
    contentContainer: {
        width: Dimensions.get('window').width
    },
    newGroupButton: {
        alignContent: 'center',
        borderColor: 'black',
        backgroundColor: 'white',
        width: '92%',
        paddingBottom: 10,
        borderWidth: 2,
        marginVertical: 20,
        marginRight: 20,
        left: 15,
        paddingHorizontal: 30,
        borderRadius: 10
    },
    newGroupText: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
        color: 'black',
        marginTop: 10
    },
    buttonView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        paddingBottom: 10
    },
    buttons: {
        width: '100%',
        right: 10,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 2,
        paddingTop: 5,
        paddingBottom: 5
    },
    btnText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'black',
        marginVertical: 5,
        padding: 5
    },
    filter: {
        alignItems: 'stretch',
        backgroundColor: '#ffffff',
        marginTop: 20
    }
});
