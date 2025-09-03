import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from './src/components/Button';
import { styles } from './App.styles'
import { currencies } from './src/constants/currencies'
import { Input } from './src/components/input';


export default function App() {
  return (
    <KeyboardAvoidingView
      style={styles.contanier}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}

    >

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <StatusBar style="light" />

          <View style={styles.header}>
            <Text style={styles.title}>Conversor de Moedas</Text>
            <Text style={styles.subTitle}>
              Converta valores entre diferentes moedas
            </Text>
          </View>
          <View style={styles.card}>
            <Text styles={styles.label}>De:</Text>

            <View style={styles.currencyGrid}>
              {currencies.map(currency => (
                <Button variant='primary'
                  key={currency.code}
                  currency={currency}
                >
                </Button>
              ))}

            </View>
              <Input/>
            
          </View>


        </View>
      </ScrollView>
    </KeyboardAvoidingView>



  );
};
