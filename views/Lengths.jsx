import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Switch } from 'react-native';
import Dropdown from 'react-native-input-select';

export const Lengths = () => {
  const [value, setValue] = useState('');
  const [sourceUnit, setSourceUnit] = useState('');
  const [targetUnit, setTargetUnit] = useState('');
  const [convertedValue, setConvertedValue] = useState('');
  const [switchUnits, setSwitchUnits] = useState(false);

  const convertLength = () => {
    // Единицы измерения длины
    const conversionRates = {
      mm: {
        cm: 0.1,
        m: 0.001,
        km: 0.000001,
      },
      cm: {
        mm: 10,
        m: 0.01,
        km: 0.00001,
      },
      m: {
        mm: 1000,
        cm: 100,
        km: 0.001,
      },
      km: {
        mm: 1000000,
        cm: 100000,
        m: 1000,
      },
    };

    if (sourceUnit === targetUnit) {
      // Исключение
      setConvertedValue(`Нельзя конвертировать ${sourceUnit} в ${targetUnit}`);
      return;
    }

    if (conversionRates[sourceUnit] && conversionRates[sourceUnit][targetUnit]) {
      const rate = conversionRates[sourceUnit][targetUnit];
      const result = parseFloat(value) * rate;
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
          { label: 'mm', value: 'mm' },
          { label: 'cm', value: 'cm' },
          { label: 'm', value: 'm' },
          { label: 'km', value: 'km' },
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
          { label: 'mm', value: 'mm' },
          { label: 'cm', value: 'cm' },
          { label: 'm', value: 'm' },
          { label: 'km', value: 'km' },
        ]}
        selectedValue={targetUnit}
        onValueChange={(value) => setTargetUnit(value)}
        primaryColor={'green'}
      />

      <Button title="Convert" onPress={convertLength} />

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