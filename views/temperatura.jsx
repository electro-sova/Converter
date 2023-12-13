import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Switch } from 'react-native';
import Dropdown from 'react-native-input-select';

export const Temperature = () => {
  const [value, setValue] = useState('');
  const [sourceUnit, setSourceUnit] = useState('');
  const [targetUnit, setTargetUnit] = useState('');
  const [convertedValue, setConvertedValue] = useState('');
  const [switchUnits, setSwitchUnits] = useState(false);

  const convertTemperature = () => {
    // Единицы измерения температуры
    const conversionRates = {
      celsius: {
        fahrenheit: (celsius) => (celsius * 9/5) + 32,
        kelvin: (celsius) => celsius + 273.15,
      },
      fahrenheit: {
        celsius: (fahrenheit) => (fahrenheit - 32) * 5/9,
        kelvin: (fahrenheit) => (fahrenheit + 459.67) * 5/9,
      },
      kelvin: {
        celsius: (kelvin) => kelvin - 273.15,
        fahrenheit: (kelvin) => (kelvin * 9/5) - 459.67,
      },
    };

    if (sourceUnit === targetUnit) {
      // Исключение
      setConvertedValue(`Нельзя конвертировать ${sourceUnit} в ${targetUnit}`);
      return;
    }

    if (conversionRates[sourceUnit] && typeof conversionRates[sourceUnit][targetUnit] === 'function') {
      const conversionFunction = conversionRates[sourceUnit][targetUnit];
      const result = conversionFunction(parseFloat(value));
      setConvertedValue(result.toFixed(2));
    } 
  };

  const handleSwitchUnits = () => {
    const tempUnit = sourceUnit;
    setSourceUnit(targetUnit);
    setTargetUnit(tempUnit);
  };

  const handleUnitSwap = () => {
    handleSwitchUnits();
    setSwitchUnits(!switchUnits);
  };

  return (
    <View style={styles.container}>
      <Text>Value:</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        keyboardType="numeric"
      />

      <Dropdown
        label="Выберите единицу измерения"
        placeholder="Выбирайте единицу"
        options={[
          { label: 'Celsius', value: 'celsius' },
          { label: 'Fahrenheit', value: 'fahrenheit' },
          { label: 'Kelvin', value: 'kelvin' },
        ]}
        selectedValue={sourceUnit}
        onValueChange={(value) => setSourceUnit(value)}
        primaryColor={'green'}
      />

      <Button title="Swap" onPress={handleUnitSwap} />

      <Dropdown
        label="Выберите единицу для конвертации"
        placeholder="Выбирайте единицу"
        options={[
          { label: 'Celsius', value: 'celsius' },
          { label: 'Fahrenheit', value: 'fahrenheit' },
          { label: 'Kelvin', value: 'kelvin' },
        ]}
        selectedValue={targetUnit}
        onValueChange={(value) => setTargetUnit(value)}
        primaryColor={'green'}
      />

      <Button title="Convert" onPress={convertTemperature} />

      {convertedValue !== '' && (
        <Text>{convertedValue}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
});