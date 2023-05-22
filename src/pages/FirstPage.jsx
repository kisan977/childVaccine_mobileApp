import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
const logo = require('../assets/logo.png');

export default function FirstPage() {
  const navigation = useNavigation();
  return (
    <View style={styles.firstWrapper}>
      <View style={styles.firstImage}>
        <Image source={logo} style={styles.firstImg} resizeMode="contain" />
      </View>
      <View style={styles.firstBtnC}>
        <TouchableOpacity onPress={() => navigation.navigate('AdminLogin')}>
          <Text style={styles.firstBtn}>Admin Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ParentLogin')}>
          <Text style={styles.firstBtn}>Parent's Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ParentRegister')}>
          <Text style={styles.firstBtn}>Parent' Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('HospitalLogin')}>
          <Text style={styles.firstBtn}>Hospital Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('HospitalRegister')}>
          <Text style={styles.firstBtn}>Hospital Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  firstWrapper: {
    flex: 1,
  },

  firstImg: {
    height: 250,
    width: 250,
  },
  firstImage: {
    alignItems: 'center',
  },
  firstBtn: {
    backgroundColor: '#604abc',
    padding: 15,
    color: '#FFF',
    borderRadius: 5,
    width: 200,
    fontSize: 20,
    textAlign: 'center',
  },
  firstBtnC: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
});
