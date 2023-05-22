import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  Text,
} from 'react-native';
import React from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {updateEmail, updatePassword} from '../../Redux/Reducers/loginReducer';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loginSuccess} from '../../Redux/Reducers/authReducer';
import {clearInputs} from '../../Redux/Reducers/loginReducer';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons/faUser';

const AdminLogin = () => {
  const dispatch = useDispatch();
  const email = useSelector(state => state.user.email);
  const password = useSelector(state => state.user.password);

  const handleEmailChange = text => {
    dispatch(updateEmail(text));
  };

  const handlePasswordChange = text => {
    dispatch(updatePassword(text));
  };

  const handleLogin = () => {
    axios
      .post(`http://10.0.2.2:8000/api/users/login`, {
        email: email,
        password: password,
      })
      .then(response => {
        if (response?.data?.status == 'success') {
          Toast.show({
            text1: 'Success!',
            text2: 'Successfully Login.',
            visibilityTime: 3000,
            position: 'bottom',
          });
          dispatch(loginSuccess(response.data.user));
          dispatch(clearInputs());
        }
        AsyncStorage.setItem('user', JSON.stringify(response.data));
      })
      .catch(err => {
        if (err) {
          Toast.show({
            type: 'error',
            text1: err?.response?.data?.errors[0],
            position: 'bottom',
          });
        }
      });
  };

  return (
    <View style={styles.adminContainer}>
      <View style={styles.adminCard}>
        <View style={styles.adminCircleW}>
          <View style={styles.adminCircle}>
            <FontAwesomeIcon icon={faUser} size={30} color="#fff" />
          </View>
        </View>
        <Text style={styles.adminTitle}>Welcome Admin!</Text>
        <Text style={styles.label}>Username or email address*</Text>
        <TextInput
          value={email}
          onChangeText={handleEmailChange}
          style={styles.input}
        />
        <Text style={styles.label}>Password*</Text>
        <TextInput
          value={password}
          onChangeText={handlePasswordChange}
          style={styles.input}
          secureTextEntry={true}
        />

        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.adminBtn}>Login</Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  adminContainer: {
    flex: 1,
    backgroundColor: '#604ac8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  adminCard: {
    backgroundColor: '#FFF',
    paddingTop: 40,
    paddingBottom: 80,
    paddingLeft: 20,
    paddingRight: 20,
    width: '95%',
    borderRadius: 5,
  },

  input: {
    borderWidth: 1,
    borderColor: '#604ac8',
    borderRadius: 0,
    padding: 10,
    marginVertical: 10,
    marginBottom: 20,
    fontSize: 20,
    color: '#161C2D',
    fontWeight: 'bold',
  },
  adminTitle: {
    fontSize: 30,
    color: '#604ac8',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  label: {
    color: '#161C2D',
    fontSize: 15,
    fontWeight: 'bold',
  },
  adminBtn: {
    backgroundColor: '#604ac8',
    padding: 15,
    color: '#FFF',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    borderRadius: 10,
  },
  adminCircleW: {
    alignItems: 'center',
  },
  adminCircle: {
    width: 80,
    height: 80,
    backgroundColor: '#604ac8',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
  },
});

export default AdminLogin;
