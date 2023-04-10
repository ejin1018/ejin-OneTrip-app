import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './screen/Main';
import Trip from './screen/Trip';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.appWrap}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Main'>
          <Stack.Screen name="Main" component={Main} options={{title:'OneTrip'}} />
          <Stack.Screen name="Trip" component={Trip} options={{title:'여행 안내'}} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appWrap:{
    flex:1,
  }
});
