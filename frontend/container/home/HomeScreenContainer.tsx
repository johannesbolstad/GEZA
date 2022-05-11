import React from 'react';
import { HomeScreen } from '../../view/home/HomeScreen';

/**
 * Displays recent posts from groups the user is a member of. This container is not complete and only displays hardcoded data at this time.
 * HomeScreenContainer contains the logic for homescreen and displays the homescreen view
 */

export const HomeScreenContainer = () => {
    const ListOfpost = [
        {
            id: '1',
            GroupName: 'Trondheims gjengen',
            postUser: 'Line',
            postText:
                'Hey there, this is my test for a post of my social app in React NativeHey there, this is my test for a post of my social app in React Native Hey there, this is my test for a post of my social app in React Native. Hey there, this is my test for a post of my social app in React Native.'
        },
        {
            id: '2',
            GroupName: 'Kakebakerene',
            userImg: 'https://placeimg.com/150/150/any',
            postUser: 'Ben',
            postText:
                'Hey there, this is my test for a post of my social app in React Native. bla bla bla  bla bla blabla bla blabla bla blabla bla blabla bla blabla bla blabla bla blabla bla blabla bla blabla bla blabla bla blabla bla blabla bla blabla bla blabla bla blabla bla blabla bla blabla bla bla '
        },
        {
            id: '3',
            GroupName: 'Koderne',
            postUser: 'Johannes',
            postText:
                'Hey there, this is my test for a post of my social app in React Native.'
        },
        {
            id: '4',
            GroupName: 'Vi som elsker 17 mai',
            postUser: 'Hanna',
            postText:
                'Hey there, this is my test for a post of my social app in React Native.'
        },
        {
            id: '5',
            GroupName: 'Hjep til React Native.',
            postUser: 'Ida',
            postText:
                'Hey there, this is my test for a post of my social app in React Native.'
        }
    ];

    return <HomeScreen list={ListOfpost} />;
};

export default HomeScreenContainer;
