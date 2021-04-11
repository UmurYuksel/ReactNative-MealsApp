import { MEALS } from '../../data/dummy-data';
import { TOGGLE_FAVORITE, SET_FILTERS } from '../actions/meals';


const initialState = {
    meals: MEALS,
    filteredMeals: MEALS,
    favoriteMeals: []
}


const mealsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FAVORITE:
            const existingIndex = state.favoriteMeals.findIndex(meal => meal.id === action.mealId);
            if (existingIndex >= 0) {
                const updatedfavMeals = [...state.favoriteMeals];

                //remoxe the specified item from the array=>
                updatedfavMeals.splice(existingIndex, 1);
                //Güncellenmiş arrayi state'de yerine koyuyoruz.
                return { ...state, favoriteMeals: updatedfavMeals }

            } else {
                //if its doesnt exists then add it to the state.
                const meal = state.meals.find(meal => meal.id === action.mealId);
                return { ...state, favoriteMeals: state.favoriteMeals.concat(meal) }
            }
        case (SET_FILTERS):
            const appliedFilters = action.filters;
            const updatedFilteredMeals = state.meals.filter(meal => {
                if (appliedFilters.glutenFree && !meal.isGlutenFree) {
                    return false;
                }
                if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
                    return false;
                }
                if (appliedFilters.vegetarian && !meal.isVegan) {
                    return false;
                }
                if (appliedFilters.vegan && !meal.isVegan) {
                    return false;
                }
                return true;
            });
            return {...state, filteredMeals:updatedFilteredMeals}
        default:
            return state;
    }


}

export default mealsReducer;