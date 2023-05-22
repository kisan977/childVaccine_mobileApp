import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
const bcg = require('../../assets/check.png');
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  parentLogin,
  updateEmail,
  updatePassword,
} from '../../Redux/Reducers/loginReducer';

export default function ParentLogin() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const email = useSelector(state => state.user.email);
  const password = useSelector(state => state.user.password);
  const user = useSelector(state => state.auth.user);

  const handleEmailChange = text => {
    dispatch(updateEmail(text));
  };

  const handlePasswordChange = text => {
    dispatch(updatePassword(text));
  };

  const handleLogin = () => {
    dispatch(parentLogin(email, password));
  };

  useEffect(() => {
    if (user?.data?.status === 'success') {
      navigation.navigate('ParentDashboard');
    }
  }, [user]);

  return (
    <ImageBackground source={bcg} style={styles.background}>
      <View style={styles.pContainer}>
        <LinearGradient
          colors={['rgba(239, 239, 239, 0.86)', 'rgba(239, 239, 239, 0.1)']}
          style={styles.pCard}>
          <ScrollView>
            <View style={styles.pForm}>
              <Text style={styles.pTitle}>Parent Login</Text>
              <Text style={styles.label}>Email address*</Text>
              <TextInput
                style={styles.pInput}
                value={email}
                onChangeText={handleEmailChange}
              />

              <Text style={styles.label}>Password*</Text>
              <TextInput
                style={styles.pInput}
                value={password}
                onChangeText={handlePasswordChange}
                secureTextEntry={true}
              />
              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.forgot}>ForgotPassword?</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleLogin}>
                <Text style={styles.pBtn}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('ParentRegister')}>
                <Text style={styles.hRegisterw}>
                  No Account? <Text style={styles.hRegister}>Register</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  pTitle: {
    fontSize: 30,
    color: '#604abc',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  pContainer: {
    flex: 1,
    marginVertical: 30,
    alignItems: 'center',
  },
  pInput: {
    borderWidth: 0,
    borderRadius: 0,
    padding: 10,
    marginVertical: 10,
    marginBottom: 20,
    fontSize: 20,
    color: '#161C2D',
    fontWeight: 'bold',
    backgroundColor: '#fff',
  },
  label: {
    color: '#161C2D',
    fontSize: 15,
    fontWeight: 'bold',
  },

  pCard: {
    paddingTop: 30,
    paddingBottom: 70,
    paddingLeft: 15,
    paddingRight: 15,
    width: '90%',
    borderRadius: 5,
  },
  pBtn: {
    backgroundColor: '#604AC8',
    padding: 15,
    color: '#FFF',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    borderRadius: 10,
  },
  hRegisterw: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#161C2D',
  },
  forgot: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#161C2D',
  },
  hRegister: {
    color: '#4a01bc',
    textDecorationLine: 'underline',
  },
});
