
import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { styles } from './styles';

export function Input({ label, value, onChangeText, ...rest }) {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="0.00"
        placeholderTextColor="#94a3b8"
        value={value}                
        onChangeText={onChangeText}   
        keyboardType="numeric"
        {...rest}
      />
    </View>
  );
}

export default Input; 
