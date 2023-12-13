import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Switch } from 'react-native';
import Dropdown from 'react-native-input-select';

export const Weights = () => {
  const [amount, setAmount] = useState('');
  const [sourceUnit, setSourceUnit] = useState('');
  const [targetUnit, setTargetUnit] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [switchUnits, setSwitchUnits] = useState(false);

  const convertWeight = () => {
    // Conversion rates (example values)
    const conversionRates = {
      kg: {
        lb: 2.2,
        g: 1000,
        oz: 35.3,
      },
      lb: {
        kg: 0.5,
        g: 453.6,
        oz: 16,
      },
      g: {
        kg: 0.001,
        lb: 0.002,
        oz: 0.04,
      },
      oz: {
        kg: 0.03,
        lb: 0.06,
        g: 28.3,
      },
    };

    if (sourceUnit === targetUnit) {
      // No conversion needed for the same units
      setConvertedAmount(`Нельзя конвертировать ${sourceUnit} в ${targetUnit}`);
      return;
    }

    if (conversionRates[sourceUnit] && conversionRates[sourceUnit][targetUnit]) {
      const rate = conversionRates[sourceUnit][targetUnit];
      const result = parseFloat(amount) * rate;
      setConvertedAmount(result.toFixed(2));
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
      <Text>Amount:</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      <Dropdown
        label="Какой вес конвертировать"
        placeholder="Выберите измерение веса"
        options={[
          { label: 'kg', value: 'kg' },
          { label: 'lb', value: 'lb' },
          { label: 'g', value: 'g' },
          { label: 'oz', value: 'oz' },
        ]}
        selectedValue={sourceUnit}
        onValueChange={(value) => setSourceUnit(value)}
        primaryColor={'green'}
      />

      <Button title="Swap" onPress={handleUnitSwap} />

      <Dropdown
        label="В какой вес конвертировать"
        placeholder="Выберите измерение веса"
        options={[
          { label: 'kg', value: 'kg' },
          { label: 'lb', value: 'lb' },
          { label: 'g', value: 'g' },
          { label: 'oz', value: 'oz' },
        ]}
        selectedValue={targetUnit}
        onValueChange={(value) => setTargetUnit(value)}
        primaryColor={'green'}
      />

      <Button title="Convert" onPress={convertWeight} />

      {convertedAmount !== '' && (
        <Text>{convertedAmount}</Text>
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