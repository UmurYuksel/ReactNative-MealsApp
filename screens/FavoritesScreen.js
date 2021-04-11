import React from 'react';
import MealList from '../components/MealsList';
import { View, Text, StyleSheet, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import DefaulText from '../components/DefaultText';
import { useSelector } from 'react-redux';

const FavoritesScreen = props => {


  const favMeals = useSelector(state => state.meals.favoriteMeals);

  if (favMeals.length === 0 || !favMeals) {
    return (
      <View style={styles.content}>
        <DefaulText>
          No Favorite Meals found. Please add some favorites.
        </DefaulText>
        <View style={styles.button}>
          <Button title="Ok" onPress={() => {
            props.navigation.navigate('Categories')
          }} />
        </View>

      </View>
    )
  }

  //const favMeals = availableMeals.filter(meal => meal.id === 'm1' || meal.id === 'm2');
  return (
    <MealList listData={favMeals} navigation={props.navigation} />
  );
};

FavoritesScreen.navigationOptions = navData => {
  return {
    headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}><Item title="ToggleMenu" iconName="ios-menu" onPress={() => {
      navData.navigation.toggleDrawer();
    }} /> </HeaderButtons>
  }
}


const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#2a9df4',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'transparent',
    width:'30%',
    marginVertical:15
  }
});

export default FavoritesScreen;