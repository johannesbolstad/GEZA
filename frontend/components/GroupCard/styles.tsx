import { StyleSheet } from 'react-native';

// Styles for the groupCard
const styles = StyleSheet.create({
    groupCard: {
        margin: 10,
        flexDirection: 'column',
        width: 300,
        height: 150
    },
    groupTitle: {
        width: '55%',
        textAlign: 'center',
        paddingTop: 13,
        backgroundColor: 'slategrey',
        borderColor: 'red',
        paddingEnd: 20,
        fontWeight: 'bold',
        color: 'white',
        left: 1,
        top: 15,
        fontSize: 20,
        position: 'absolute'
    },
    soundIconContainer: {
        flexDirection: 'column',
        display: 'flex',
        top: 15.5,
        left: '55.3%',
        justifyContent: 'flex-end'
    },
    soundIcon: {
        backgroundColor: '#C8FFEB',
        width: 39,
        borderWidth: 2,
        borderColor: '#C8FFEB'
    }
});

export default styles;
