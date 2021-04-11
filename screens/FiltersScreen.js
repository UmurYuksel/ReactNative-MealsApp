import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { Switch } from 'react-native-paper';
import { setFilters } from "../store/actions/meals";
const FilterItem = props => {
    return (
        <View style={styles.filterContainer}>
            <Text style={styles.filterLabel}>
                {props.label}
            </Text>
            <Switch trackColor={{ false: 'grey', true: '#2a9df4' }} value={props.state} onValueChange={props.onChange} />
        </View>
    );
};

const FiltersScreen = props => {

    const { navigation } = props;

    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);

    const dispatch = useDispatch();
    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            vegetarian: isVegetarian
        };

        dispatch(setFilters(appliedFilters));
        
    }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);


    useEffect(() => {
        navigation.setParams({ save: saveFilters });
    }, [saveFilters]);




    return (
        <View style={styles.screen}>
            <Text style={styles.title}>
                Available Filters / Restrictions
            </Text>
            <FilterItem label='Gluten-free' state={isGlutenFree} onChange={newValue => setIsGlutenFree(newValue)} />
            <FilterItem label='Lactose-free' state={isLactoseFree} onChange={newValue => setIsLactoseFree(newValue)} />
            <FilterItem label='Vegan' state={isVegan} onChange={newValue => setIsVegan(newValue)} />
            <FilterItem label='Vegetarian' state={isVegetarian} onChange={newValue => setIsVegetarian(newValue)} />
        </View>
    );
};

FiltersScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Filter Meals',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}><Item title="ToggleMenu" iconName="ios-menu" onPress={() => {
            navData.navigation.toggleDrawer();
        }} /> </HeaderButtons>,
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}><Item title="Save" iconName="ios-check" onPress={navData.navigation.getParam('save')} /> </HeaderButtons>

    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 10
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center'

    },
    filterLabel: {
        fontFamily: 'open-sans',
        fontSize: 15
    }
});

export default FiltersScreen;