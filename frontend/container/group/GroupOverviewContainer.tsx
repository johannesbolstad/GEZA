import { useNavigation } from '@react-navigation/native';
import { limitToLast, onValue, orderByKey, query, ref, set } from 'firebase/database';
import { getDownloadURL, listAll, ref as refStorage } from 'firebase/storage';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Alert } from 'react-native';
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import { auth, database, storage } from '../../firebase.config';
import { GroupObj } from '../../interfaces/types';
import { GroupStackParamList } from '../../navigation/GroupNavigation';
import { GroupOverview } from '../../view/group/GroupOverview';

type MakeGroupNavigationProp = StackNavigationProp<
    GroupStackParamList,
    'MakeGroupContainer'
>;

/**
 * Displays groups for the users
 * GroupOverviwContainer contains the logic for this screen and renders the groupoverview screen view
 */

export const GroupOverviewContainer = () => {
    const [groupData, setGroupData] = React.useState<{
        [id: string]: GroupObj;
    }>({});
    const [loadMore, setLoadMore] = React.useState<number>(2);
    const [imageUrl, setImageURL] = React.useState<string[]>([]);
    const [searchPhrase, setSearchPhrase] = React.useState<string>('');
    const [languages, setLanguages] = React.useState<string[]>([]);
    const [locations, setLocations] = React.useState<string[]>([]);
    const [user] = useAuthState(auth);
    const navigation = useNavigation<MakeGroupNavigationProp>();

    const navigateToMakeGroup = () => {
        navigation.navigate('MakeGroupContainer');
    };

    const loadMoreGroups = () => {
        if(loadMore <= Object.keys(groupData).length){
            setLoadMore(loadMore + 2);
        }
        else{
            Alert.alert("Reached all groups!")
        }
    };

    const showLessGroups = () => {
        if (loadMore > 2) {
            setLoadMore(loadMore - 2);
        } else {
            Alert.alert('Cannot show less more groups!');
        }
    };

    //Retrieves data of groups from database
    React.useEffect(() => {
        const refs = ref(database, `groups`);
        const unsub = onValue(
            query(refs, orderByKey(),limitToLast(loadMore)),
            (snapshot) => {
                if (snapshot.exists()) {
                    const groups: { [id: string]: GroupObj } = {};
                    const keys = Object.keys(snapshot.val()).reverse();
                    keys.forEach((key) => {
                        const values = snapshot.val()[key];
                        groups[key] = values;
                    });
                    setGroupData(groups);
                }
            }
        );
        return () => {
            unsub();
            setGroupData({});
        };
    }, [loadMore]);

    /**
     * Checks if the user is a member of the group with the given ID
     * @param id the id of the group
     * @returns true if the user is a member, otherwise false
     */
    const memberOfGroup = (id: string) => {
        const group = groupData[id];
        const members = group.groupmembers;
        let isMember = false;
        if (user) {
            isMember =
                members.filter((member: any) => member[0] === user.uid).length >
                0;
        }
        return isMember;
    };

    /**
     * Adds the user to the group members of the group with the given ID. Writes the group members to the database
     * @param id the id of the group
     */
    const joinGroup = (id: string) => {
        const group = groupData[id];
        let members = group.groupmembers;
        if (user) {
            members.push([user.uid, user.displayName]);
            set(ref(database, `groups/${id}/groupmembers`), members);
        }
    };

    /**
     * Fetches and retrieves images of groups from firebase storage
     * Inspired by:
     * https://stackoverflow.com/questions/69228149/how-can-i-show-my-images-from-firebase-storage-to-my-website
     */
    React.useEffect(() => {
        const fetchImages = async () => {
            const groupRefs = refStorage(storage, 'groupImages/');
            const groupImages = await listAll(groupRefs).then((response) => {
                let urlPromises = response.items.map((imageRef) =>
                    getDownloadURL(imageRef)
                );
                return Promise.all(urlPromises);
            });
            return groupImages;
        };
        const loadImages = async () => {
            const urls = await fetchImages();
            setImageURL(urls);
        };
        loadImages();
    }, []);

    /**
     * Finds the url to the image with the given image Id
     * @param imageid the image's ID
     * @returns imageurl
     */
    const findImage = (imageId: string) => {
        let images = imageUrl.toString().split(',');
        imageUrl.length !== 0
            ? (images = images.filter(
                  (image) =>
                      image
                          .split('groupImages%2F')[1]
                          .split('?alt=media&token')[0] === imageId
              ))
            : (images = []);
        return images[0];
    };

    /**
     * Checks if the groups in the provided object contains the searchphrase in their name or description.
     * Creates a new object with the groups that match.
     * @param filterGroups the object with the groups to be examined
     * @returns object with the groups that match searchphrase
     */
    const filterSearch = (filterGroups: { [id: string]: GroupObj }) => {
        const filterG: { [id: string]: GroupObj } = {};
        Object.keys(filterGroups).forEach((key) => {
            const values = filterGroups[key];
            if (
                values.groupname
                    .toUpperCase()
                    .includes(
                        searchPhrase.toUpperCase().trim().replace(/\s/g, '')
                    ) ||
                values.description
                    .toUpperCase()
                    .includes(
                        searchPhrase.toUpperCase().trim().replace(/\s/g, '')
                    )
            ) {
                filterG[key] = values;
            }
        });
        return filterG;
    };

    /**
     * Checks if the groups in the provided object have one of the selected locations.
     * Creates a new object with the groups that match.
     * @param filterGroups the object with the groups to be examined
     * @returns object with the groups that match location
     */
    const filterLocation = (filterGroups: { [id: string]: GroupObj }) => {
        const filterG: { [id: string]: GroupObj } = {};
        Object.keys(filterGroups).forEach((key) => {
            const values = filterGroups[key];
            if (locations.includes(values.location)) {
                filterG[key] = values;
            }
        });
        return filterG;
    };

    /**
     * Checks if the groups in the provided object have one of the selected languages.
     * Creates a new object with the groups that match.
     * @param filterGroups the object with the groups to be examined
     * @returns object with the groups that match language
     */
    const filterLanguage = (filterGroups: { [id: string]: GroupObj }) => {
        const filterG: { [id: string]: GroupObj } = {};
        Object.keys(filterGroups).forEach((key) => {
            const values = filterGroups[key];
            if (languages.includes(values.language)) {
                filterG[key] = values;
            }
        });
        return filterG;
    };

    /**
     * Filters the groups by searchphrase, location and language.
     * @returns object with the groups that match searchphrase, location and language.
     */
    const filter = () => {
        let filterGroups: { [id: string]: GroupObj } = groupData;
        if (searchPhrase !== '') {
            filterGroups = filterSearch(filterGroups);
        }
        if (locations.length > 0) {
            filterGroups = filterLocation(filterGroups);
        }
        if (languages.length > 0) {
            filterGroups = filterLanguage(filterGroups);
        }
        return filterGroups;
    };

    return (
        <GroupOverview
            setLocations={setLocations}
            setLanguages={setLanguages}
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            navigateToMakeGroup={navigateToMakeGroup}
            filter={filter}
            findImage={findImage}
            joinGroup={joinGroup}
            memberOfGroup={memberOfGroup}
            showLessGroups={showLessGroups}
            loadMoreGroups={loadMoreGroups}
        />
    );
};
