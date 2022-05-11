import { StyleSheet } from 'react-native';

// Styles for the groupModal component
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    modalView: {
        margin: 20,
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
    button: {
        borderRadius: 10,
        width: 80,
        padding: 10,
        marginRight: 10
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 15
    },
    buttonOpen: {
        backgroundColor: 'lightgreen',
        minWidth: 100
    },
    buttonClose: {
        backgroundColor: '#ff0000',
        minWidth: 100
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center'
    },
    groupInfoText: {
        fontWeight: 'bold'
    }
});

export default styles;
