import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { limitToLast, onValue, orderByKey, query, ref } from 'firebase/database';
import React from 'react';
import { Alert } from 'react-native';
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import { database } from '../../firebase.config';
import { PostObj } from '../../interfaces/types';
import { GroupStackParamList } from '../../navigation/GroupNavigation';
import { Posts } from '../../view/group/Posts';

type PostContainerRouteProp = RouteProp<GroupStackParamList, 'PostContainer'>;
type CreatePostRouteProp = RouteProp<GroupStackParamList, 'CreatePost'>;
type CreatePostNavigationprop = StackNavigationProp<
    GroupStackParamList,
    'CreatePost'
>;

/**
 * Displays the posts in the group with the given group ID for the users
 * PostsContainer contains the logic for this screen and renders the posts view
 */
export const PostsContainer = () => {
    const navigation = useNavigation<CreatePostNavigationprop>();
    const postContainerRoute = useRoute<PostContainerRouteProp>();
    const createPostRoute = useRoute<CreatePostRouteProp>();
    const groupId = createPostRoute.params.groupId;
    const groupName = createPostRoute.params.groupName;
    const image = postContainerRoute.params.image;

    const navigateToCreatePost = () => {
        navigation.navigate('CreatePost', {
            groupName: groupName,
            groupId: groupId
        });
    };
    const [loadMore, setLoadMore] = React.useState<number>(2);
    const [posts, setPosts] = React.useState<{
        [id: string]: PostObj;
    }>({});

    const loadMorePosts = () => {
        if(loadMore <= Object.keys(posts).length){
            setLoadMore(loadMore + 2);
        }
        else{
            Alert.alert("Reached all posts!")
        }
    };

    const showLessPosts = () => {
        if (loadMore > 2) {
            setLoadMore(loadMore - 2);
        } else {
            Alert.alert('Cannot show less groups');
        }
    };

    //Retrieves posts from database
    React.useEffect(() => {
        const refs = ref(database, `groups/${groupId}/posts/`);
        const unsub = onValue(
            query(refs, orderByKey(), limitToLast(loadMore)),
            (snapshot) => {
                if (snapshot.exists()) {
                    const posts: { [id: string]: PostObj } = {};
                    const keys = Object.keys(snapshot.val()).reverse();
                    keys.forEach((key) => {
                        const values = snapshot.val()[key];
                        posts[key] = values;
                    });
                    setPosts(posts);
                }
            }
        );
        return () => {
            unsub();
            setPosts({});
        };
    }, [loadMore]);

    return (
        <Posts
            image={image}
            posts={posts}
            loadMorePosts={loadMorePosts}
            showLessPosts={showLessPosts}
            navigateToCreatePost={navigateToCreatePost}
        />
    );
};
