import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export const Home = ({ navigation  }) => {
  return (
    <View style={styles.container}>
        <Text>Деньги</Text>
        <Button title='Деньги' onPress={() => navigation.navigate('Moneys')}></Button>
        <Text>Вес</Text>
        <Button title='Вес' onPress={() => navigation.navigate('Weights')}></Button>
        <Text>Длина</Text>
        <Button title='Длина' onPress={() => navigation.navigate('Lengths')}></Button>
        <Text>Площадь</Text>
        <Button title='Площадь' onPress={() => navigation.navigate('Area')}></Button>
        <Text>Температура</Text>
        <Button title='Температура' onPress={() => navigation.navigate('Temperature')}></Button>
    </View>
  );
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});
