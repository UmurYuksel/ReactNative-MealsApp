import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Platform, TouchableNativeFeedback } from 'react-native';



const CategpryGridTile = props => {

    let TouchableComponent = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        let TouchableComponent = TouchableNativeFeedback;
    }

    return (
        <View style={styles.gridItem}>
            <TouchableComponent
                style={{flex:1}}
                onPress={props.onSelect}>
                <View style={{ ...styles.container, ...{ backgroundColor: props.color } }}>
                    <Text style={styles.title} numberOfLines={2}>{props.title}</Text>
                </View>
            </TouchableComponent>
        </View>

    );
}

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 9,
        height: 150,
        borderRadius:10,
       //overflow:'hidden',

    },
    container: {
        flex: 1,
        borderRadius: 11,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        elevation:3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        padding: 13,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    title: {

        fontFamily: 'open-sans-bold',
        
        fontSize: 13,
        textAlign: 'right'
    }
    
});


export default CategpryGridTile;