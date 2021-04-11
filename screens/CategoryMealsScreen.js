import React from 'react';
import { CATEGORIES } from '../data/dummy-data';
import MealsList from '../components/MealsList';
import { useSelector } from 'react-redux';
import DefaultText from '../components/DefaultText';
import { StyleSheet } from 'react-native'



const CategoryMealsScreen = props => {

    //This is how we receieve the id from navigated page
    const catId = props.navigation.getParam('categoryId');

    //In the state, under the reducer which is defined as meals (key) => get meals under of that.
    const availableMeals = useSelector(state => state.meals.filteredMeals);

    const displayedMeals = availableMeals.filter(meal => meal.categoryIds.indexOf(catId) >= 0);

    if (displayedMeals.length === 0) {
        return (
            <View style={styles.content}>
                <DefaultText>
                    ...No meals found with the given filter options.
                </DefaultText>
            </View>
        )
    }


    //Return flatlist by using the renderMealItem function which actually renders a special component which is designed to display meal data.
    return (
        <MealsList listData={displayedMeals} navigation={props.navigation} />
    );
};

CategoryMealsScreen.navigationOptions = navigationData => {
    const catId = navigationData.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

    return {
        headerTitle: selectedCategory.title
    };
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CategoryMealsScreen;