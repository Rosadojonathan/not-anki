import React from "react";
import { StyleSheet, Text, View,StatusBar } from "react-native";
import DeckList from "./components/DeckList";
import { TabNavigator, StackNavigator } from "react-navigation";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { purple, white } from "./utils/colors";
import { Constants } from 'expo';
import AddDeck from "./components/AddDeck";
import DeckView from "./components/DeckView";
import { Provider } from "react-redux";
import reducer from "./reducers";
import { createStore } from "redux";
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';
import Settings from "./components/Settings";
import { AsyncStorage } from 'react-native';

AsyncStorage.clear();

function AppStatusBar({backgroundColor,...props}){
  return (
    <View style={{ backgroundColor,height:Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}



const Tabs = TabNavigator(
  {
    DeckList: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: "Decks",
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons name="cards" size={30} color={tintColor} />
        )
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: "Decks",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="plus-square" size={30} color={tintColor} />
        )
      }
    },
    Settings:{
      screen:Settings,
      navigationOptions:{
        tabBarLabel:"Settings",
        tabBarIcon:({tintColor}) => (
          <FontAwesome name="gear" size={30} color={tintColor} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: purple,
      style: {
        height: 56,
        backgroundColor: white
      }
    }
  }
);

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: {
      title: "Deck Info",
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },
  AddCard:{
    screen:AddCard,
    navigationoptions:{
      title:"Add Card",
      headerTintColor:white,
      headerStyle:{
        backgroundColor:purple
      }
    }
  },
  Quiz:{
    screen: Quiz,
    navigationOptions:{
      title:'Quiz',
      headerTintColor:white,
      headerStyle:{
        backgroundColor:purple
      }
    }
  }
});

export default class App extends React.Component {
  render() {
    return (

      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <AppStatusBar backgroundColor={purple} barStyle="light-content"/>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
