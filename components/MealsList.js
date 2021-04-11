import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import MealItem from '../components/MealItem';
import {useSelector} from 'react-redux';

const MealsList = props => {

    const favoriteMeals = useSelector(state=>state.meals.favoriteMeals);



    const renderMealItem = itemData => {
        const isFavorite= favoriteMeals.find(meal=>meal.id===itemData.item.id);
        return (
            <MealItem
                title={itemData.item.title}
                duration={itemData.item.duration}
                complexity={itemData.item.complexity}
                affordability={itemData.item.affordability}
                image={itemData.item.imageUrl}
                onSelectMeal={() => {
                    props.navigation.navigate({
                        routeName: 'MealDetail',
                        params: {
                            mealId: itemData.item.id,
                            mealTitle: itemData.item.title,
                            isFav : isFavorite
                        }
                    });
                }}
            />
        );
    }

    return (
        <View style={styles.list}>
            <FlatList keyExtractor={(item, index) => item.id} data={props.listData} renderItem={renderMealItem} style={{ width: '100%', padding: 13 }} />
        </View>
    );
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
export default MealsList;