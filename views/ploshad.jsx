import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Switch } from 'react-native';
import Dropdown from 'react-native-input-select';

export const Areas = () => {
  const [value, setValue] = useState('');
  const [sourceUnit, setSourceUnit] = useState('');
  const [targetUnit, setTargetUnit] = useState('');
  const [convertedValue, setConvertedValue] = useState('');
  const [switchUnits, setSwitchUnits] = useState(false);

  const convertArea = () => {
    // Единицы измерения площади
    const conversionRates = {
      sqmm: {
        sqcm: 0.01,
        sqm: 0.000001,
        sqkm: 0.0000000001,
      },
      sqcm: {
        sqmm: 100,
        sqm: 0.0001,
        sqkm: 0.00000001,
      },
      sqm: {
        sqmm: 1000000,
        sqcm: 10000,
        sqkm: 0.000001,
      },
      sqkm: {
        sqmm: 10000000000,
        sqcm: 100000000,
        sqm: 1000000,
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
          { label: 'sqmm', value: 'sqmm' },
          { label: 'sqcm', value: 'sqcm' },
          { label: 'sqm', value: 'sqm' },
          { label: 'sqkm', value: 'sqkm' },
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
          { label: 'sqmm', value: 'sqmm' },
          { label: 'sqcm', value: 'sqcm' },
          { label: 'sqm', value: 'sqm' },
          { label: 'sqkm', value: 'sqkm' },
        ]}
        selectedValue={targetUnit}
        onValueChange={(value) => setTargetUnit(value)}
        primaryColor={'green'}
      />

      <Button title="Convert" onPress={convertArea} />

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