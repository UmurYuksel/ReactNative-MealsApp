import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Fonts from 'expo-font';
import { AppLoading } from 'expo';
import MealsNavigator from './navigation/MealsNavigator';
import {enableScreens} from 'react-native-screens';


//REDUX INTEGRATION
import {createStore, combineReducers} from 'redux';
import mealsReducer from './store/reducers/meals';
import {Provider} from 'react-redux';
//

enableScreens();


//Combine reducers under of a root reducer so that I can call them under one name.
const rootReducer = combineReducers({
  meals:mealsReducer
});

const store = createStore(rootReducer);
///

//Load fonts from the folder asyncronously. Async functions returns promise.(Check its detail on google.)
const fetchFonts = () => {
 return  Fonts.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}


export default function App() {

  //Create an boolean object an set it to false. When the app finishes loading the fonts. Set it to trure. => To do this operation: Use Apploading component provided by Expo.
  const[fontLoaded, setFontLoaded]= useState(false);
  
  if (!fontLoaded) {
   return <AppLoading 
   startAsync={fetchFonts} 
   onFinish={()=>setFontLoaded(true)} 
   />
  }

  return  <Provider store={store}><MealsNavigator /></Provider> 
}

