import React from 'react';
import { StyleSheet, FlatList, } from 'react-native';
import { CATEGORIES } from '../data/dummy-data';
import CategoryGridTile from '../components/CategoryGridTile';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';



const CategoriesScreen = props => {

    const renderGridItem = (itemData) => {
        return <CategoryGridTile 
        title={itemData.item.title} 
        color={itemData.item.color} 
        onSelect={() => {
            props.navigation.navigate({
                routeName: 'CategoryMeals',
                params: {
                    categoryId: itemData.item.id
                }
            });
        }}
        />;
    }


    //In new versions of react-native, if the object consists id property, flatlist automatically recognize it so no need to use keyExtractor attribute. but since this is 
    //a practice project, i used it as in below.
    return (
        <FlatList
            keyExtractor={(item, index) => item.id}
            numColumns={2}
            data={CATEGORIES}
            renderItem={(item) => renderGridItem(item)} />
    );
};

CategoriesScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Meal Categories',
        headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Menu"
                iconName='ios-menu'
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }} />
        </HeaderButtons>
    }
}



export default CategoriesScreen;