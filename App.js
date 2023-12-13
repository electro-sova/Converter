import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from './views/home';
import { Moneys } from './views/moneys';
import { Weights } from './views/Weights';
import { Lengths } from './views/Lengths';
import { Areas } from './views/ploshad';
import { Temperature } from './views/temperatura';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='Moneys' component={Moneys}/>
        <Stack.Screen name='Weights' component={Weights}/>
        <Stack.Screen name='Lengths' component={ Lengths }/>
        <Stack.Screen name='Area' component={ Areas }/>
        <Stack.Screen name='Temperature' component={ Temperature }/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
