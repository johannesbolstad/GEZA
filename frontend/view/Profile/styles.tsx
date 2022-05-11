import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    male: {
        paddingLeft: 0,
        paddingBottom: 0,
        marginBottom: 0,
        marginLeft: 0
    },
    female: {
        paddingLeft: 20,
        paddingBottom: 0,
        marginBottom: 0,
        marginRight: 45
    },
    maleFemale: {
        paddingBottom: 0,
        marginBottom: 0
    },
    buttonView: {
        flexDirection: 'row',
        width: 275,
        marginRight: 10
    },
    input: {
        height: 60,
        margin: 10,
        marginRight: 1,
        marginLeft: 30,
        borderColor: 'black',
        width: '75%'
    },
    userContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        margin: 0,
        marginTop: 20
    },
    subcontainer: {
        flexDirection: 'row'
    },
    logo: {
        display: 'flex',
        flexDirection: 'row',
        width: 116,
        height: 56,
        justifyContent: 'center'
    },
    noUserContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    }
});
