/*
 * The list of regions for the BottomPopup and FilterGroups components
 *
 */
export const regionsList = [
    {
        id: 1,
        name: 'Oslo'
    },
    {
        id: 2,
        name: 'Rogaland'
    },
    {
        id: 3,
        name: 'Møre og Romsdal'
    },
    {
        id: 4,
        name: 'Nordland'
    },
    {
        id: 5,
        name: 'Viken'
    },
    {
        id: 5,
        name: 'Innlandet'
    },
    {
        id: 6,
        name: 'Vestfold og Telemark'
    },
    {
        id: 7,
        name: 'Agder'
    },
    {
        id: 8,
        name: 'Vestland'
    },
    {
        id: 9,
        name: 'Trønderlag'
    },
    {
        id: 10,
        name: 'Troms og Finnmark'
    }
];

/*
 * The list of languages and flags for the drop down down menu and FilterGroups components.
 *
 */
export const languagesWithFlags = [
    { name: 'український', image: require('../images/Ukraine.png') },
    { name: 'English', image: require('../images/British.png') },
    { name: 'Norsk', image: require('../images/Norge.png') },
    { name: 'Français ', image: require('../images/France.png') },
    { name: 'Español', image: require('../images/Spain.png') },
    { name: 'Deutsch', image: require('../images/Deutschland.png') },
    { name: 'عربي', image: require('../images/Arabic.png') }
];

export const getLanguage = (language: string) => {
    return languagesWithFlags.find(
        (item) => item.name.slice(0, 2).toLowerCase() === language
    );
};
