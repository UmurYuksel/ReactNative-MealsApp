import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

//COMPONENTS
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FilterScreen from '../screens/FiltersScreen';
//

// To lower code repeating, I assigned these defaul values to one object so that I can use it multiple place with a single name
const defaultStackNavOptions = {
    headerStyle: { backgroundColor: '#2a9df4' },
    headerTitleStyle: { color: 'white', fontFamily:'open-sans-bold' },
    headerBackTitleStyle: { color: 'white', fontFamily:'open-sans' }
}

const MealsNavigator = createStackNavigator({
    Categories: {
        screen: CategoriesScreen,
    },
    CategoryMeals: {
        screen: CategoryMealsScreen
    },
    MealDetail: MealDetailScreen
}, {

    defaultNavigationOptions: defaultStackNavOptions
}
);

const FavoritesNavigator = createStackNavigator({
    Favorites: {
        screen: FavoritesScreen,
        navigationOptions: {
            headerTitle: 'My Favorites',
        }
    },
    MealDetail: {
        screen: MealDetailScreen
    },
    Categories:{
        screen:CategoriesScreen
    }

}, {
    defaultNavigationOptions: defaultStackNavOptions
}
);

//Tab navigation setup, routing, styling etc.
const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => { return <Ionicons name='ios-restaurant' size={30} color={tabInfo.tintColor} /> },
            tabBarColor: "#2a9df4"
        }
    },
    Favorites: {
        screen: FavoritesNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => { return <Ionicons name='ios-star' size={30} color={tabInfo.tintColor} /> },
            tabBarColor: '#2a9df4'
        }
    }
};


const MealsFavTabNavigator =
    Platform.OS === 'android' ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeTintColor: '#2a9df4',
        shifting: true,
        barStyle:{
            backgroundColor:'#2a9df4'
        }
    }) : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
            activeTintColor: '#2a9df4',
            labelStyle:'open-sans'
        }
    });

const FiltersNavigator = createStackNavigator({
    Filters: { screen: FilterScreen, navigationOptions: { headerTitle: 'Filter' } }
}, {
    // navigationOptions:{drawerLabel:'Filters'},
    defaultNavigationOptions: defaultStackNavOptions
}
);

const MainNavigator = createDrawerNavigator({
    MealsFavs: {screen:MealsFavTabNavigator, navigationOptions:{drawerLabel:'Meals'}},
    Filters: FiltersNavigator
}, {
 contentOptions: {
     labelStyle: {
         fontFamily:'open-sans-bold'
     } 
 }
}
);

export default createAppContainer(MainNavigator);