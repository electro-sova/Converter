import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Switch } from 'react-native';
import Dropdown from 'react-native-input-select';

export const Moneys = () => {
  const [amount, setAmount] = useState('');
  const [sourceCurrency, setSourceCurrency] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [switchCurrencies, setSwitchCurrencies] = useState(false);

  const convertCurrency = () => {
    // Валюты
    const conversionRates = {
      EUR: {
        USD: 1.08,
        RUB: 98.84,
        KZT: 496,
        AED: 3.96,
      },
      USD: {
        EUR: 0.9,
        RUB: 91.64,
        KZT: 459,
        AED: 3.67,
      },
      RUB: {
        EUR: 0.01,
        USD: 0.01,
        KZT: 5,
        AED: 0.04,
      },
      KZT: {
        EUR: 0.002,
        USD: 0.002,
        AED: 0.007,
        RUB: 0.19,
      },
      AED: {
        EUR: 0.25,
        USD: 0.27,
        RUB: 24.95,
        KZT: 125.23,
      },
    };

    if (sourceCurrency === targetCurrency) {
      // Исключение
      setConvertedAmount(`Нельзя конвертировать ${sourceCurrency} в ${targetCurrency}`);
      return;
    }

    if (conversionRates[sourceCurrency] && conversionRates[sourceCurrency][targetCurrency]) {
      const rate = conversionRates[sourceCurrency][targetCurrency];
      const result = parseFloat(amount) * rate;
      setConvertedAmount(result.toFixed(2));
    } 
  };

  const handleSwitchCurrencies = () => {
    const tempCurrency = sourceCurrency;
    setSourceCurrency(targetCurrency);
    setTargetCurrency(tempCurrency);
  };

  const handleCurrencySwap = () => {
    handleSwitchCurrencies();
    setSwitchCurrencies(!switchCurrencies);
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
        label="Какую валюту перевести"
        placeholder="Выбирайте валюту"
        options={[
          { label: 'USD', value: 'USD' },
          { label: 'EUR', value: 'EUR' },
          { label: 'RUB', value: 'RUB' },
          { label: 'AED', value: 'AED' },
          { label: 'KZT', value: 'KZT' },
        ]}
        selectedValue={sourceCurrency}
        onValueChange={(value) => setSourceCurrency(value)}
        primaryColor={'green'}
      />

      <Button title="Поменять" onPress={handleCurrencySwap} />

      <Dropdown
        label="В какую валюту перевести"
        placeholder="Выбирайте валюту"
        options={[
          { label: 'USD', value: 'USD' },
          { label: 'EUR', value: 'EUR' },
          { label: 'RUB', value: 'RUB' },
          { label: 'AED', value: 'AED' },
          { label: 'KZT', value: 'KZT' },
        ]}
        selectedValue={targetCurrency}
        onValueChange={(value) => setTargetCurrency(value)}
        primaryColor={'green'}
      />

      <Button title="Convert" onPress={convertCurrency} />

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