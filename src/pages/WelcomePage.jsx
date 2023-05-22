import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
const wi = require('../assets/wi.png');

export default function WelcomePage() {
  const navigation = useNavigation();
  return (
    <View style={styles.welcomeContainer}>
      <View style={styles.welT}>
        <Text style={styles.welcomeText}>Welcome!</Text>
      </View>

      <View style={styles.wrapper}>
        <View style={styles.welcomeImage}>
          <Image source={wi} style={styles.welcomeImg} resizeMode="contain" />
        </View>
        <View style={styles.welcomeBtnC}>
          <TouchableOpacity onPress={() => navigation.navigate('FirstPage')}>
            <Text style={styles.welcomeBtn}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeContainer: {
    flex: 1,
  },
  wrapper: {},
  welT: {},
  welcomeText: {
    fontSize: 40,
    color: '#604abc',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 80,
    marginBottom: 100,
  },
  welcomeImg: {
    height: 300,
    width: 300,
  },
  welcomeImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 50,
  },
  welcomeBtn: {
    backgroundColor: '#604abc',
    padding: 15,
    color: '#FFF',
    fontSize: 20,
    textAlign: 'center',
  },
  welcomeBtnC: {
    marginTop: 200,
  },
});
