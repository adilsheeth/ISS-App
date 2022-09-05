import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View } from 'react-native';
import Home from './screens/Home';
import ISSLocation from './screens/ISSLocation';
import Meteors from './screens/Meteors';
import Updates from './screens/Updates';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"Home"}
        screenOptions={{ hearderShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ISSLocation" component={ISSLocation} />
        <Stack.Screen name="Meteors" component={Meteors} />
        <Stack.Screen name='Updates' component={Updates} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  }
}