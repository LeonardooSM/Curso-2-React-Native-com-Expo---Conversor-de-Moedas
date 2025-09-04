import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Button } from './src/components/Button';
import { styles } from './App.styles';
import { currencies } from './src/constants/currencies';
import { Input } from './src/components/input';
import { ResultCard } from './src/components/ResultCard';
import { exchangeRateApi } from './src/services/api';
import { useState } from 'react';
import { convertCurrency } from './utils/convertCurrency';

export default function App() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('BRL');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(null);

  async function fetchExchangeRate() {
    const data = await exchangeRateApi(fromCurrency);
    const rate = data.rates[toCurrency]
    const convertedAmount = convertCurrency(amount, rate)
    console.log(convertedAmount)
    setResult(convertedAmount)
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: '#0f172a' }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={[styles.scrollView, { backgroundColor: '#0f172a' }]}
        contentContainerStyle={{ backgroundColor: '#0f172a' }}
        keyboardShouldPersistTaps="handled"
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.content, { backgroundColor: '#0f172a' }]}>
          <StatusBar style="light" />

          <View style={styles.header}>
            <Text style={styles.title}>Conversor de Moedas</Text>
            <Text style={styles.subTitle}>
              Converta valores entre diferentes moedas
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>De:</Text>

            <View style={styles.currencyGrid}>
              {currencies.map((currency) => (
                <Button
                  variant="primary"
                  key={currency.code}
                  currency={currency}
                  onPress={() => setFromCurrency(currency.code)}
                  isSelected={fromCurrency === currency.code}
                />
              ))}
            </View>

            <Input label="Valor:" value={amount} onChangeText={setAmount} />

            <TouchableOpacity style={styles.swapButton}>
              <Text style={styles.swapButtonText}>↑↓</Text>
            </TouchableOpacity>

            <Text style={styles.label}>Para: </Text>

            <View style={styles.currencyGrid}>
              {currencies.map((currency) => (
                <Button
                  variant="secondary"
                  key={currency.code}
                  currency={currency}
                  onPress={() => setToCurrency(currency.code)}
                  isSelected={toCurrency === currency.code}
                />
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={styles.convertpButton}
            onPress={fetchExchangeRate}
          >
            <Text style={styles.swapButtonText}>Converter</Text>
          </TouchableOpacity>

          <ResultCard />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
