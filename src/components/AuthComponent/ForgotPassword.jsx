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
import {updateEmail} from '../../Redux/Reducers/loginReducer';
import Toast from 'react-native-toast-message';
import {clearInputs} from '../../Redux/Reducers/loginReducer';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const email = useSelector(state => state.user.email);

  const handleEmailChange = text => {
    dispatch(updateEmail(text));
  };

  const forgot = () => {
    axios
      .post(`http://10.0.2.2:8000/api/users/send-reset-password-email/`, {
        email: email,
      })
      .then(response => {
        // console.log(response);
        if (response?.data?.status == 'success') {
          Toast.show({
            text1: 'Success!',
            text2: 'Password Reset link send. Please check your Email.',
            visibilityTime: 3000,
            position: 'bottom',
          });

          dispatch(clearInputs());
        }
      })
      .catch(err => {
        // console.log(err.request);
        // console.log(err.message);
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
        <Text style={styles.adminTitle}>Forgot Password</Text>
        <Text style={styles.label}>Enter Registered Email</Text>
        <TextInput
          value={email}
          onChangeText={handleEmailChange}
          style={styles.input}
        />

        <TouchableOpacity onPress={forgot}>
          <Text style={styles.adminBtn}>Send</Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  adminContainer: {
    flex: 1,
    backgroundColor: '#604abc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  adminCard: {
    backgroundColor: '#FFF',
    paddingTop: 50,
    paddingBottom: 80,
    paddingLeft: 20,
    paddingRight: 20,
    width: '90%',
    borderRadius: 5,
  },

  input: {
    borderWidth: 1,
    borderColor: '#604abc',
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
    color: '#604abc',
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
    backgroundColor: '#604abc',
    padding: 15,
    color: '#FFF',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ForgotPassword;
