import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Toast from 'react-native-toast-message';
const bcg = require('../../assets/mainbcg.png');
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {clearInputsr} from '../../Redux/Reducers/registerReducer';
import {useNavigation} from '@react-navigation/native';

export default function HospitalRegister() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const formValue = useSelector(state => state.register.formValue);

  const handleChange = (name, value) => {
    dispatch({
      type: 'UPDATE_PARENT_FORM',
      payload: {
        [name]: value,
      },
    });
  };

  const hospitalRegister = () => {
    const role = 'hospital';
    const formData = new FormData();
    formData.append('user.name', formValue.name);
    formData.append('user.email', formValue.email);
    formData.append('mobileNumber', formValue.mobileNumber);
    formData.append('province', formValue.province);
    formData.append('district', formValue.district);
    formData.append('muncipality', formValue.municpality);
    formData.append('ward', formValue.ward);
    formData.append('street', formValue.street);
    formData.append('user.password', formValue.password);
    formData.append('user.password2', formValue.password2);
    formData.append('user.role', role);
    console.log(formData);

    axios
      .post(`http://10.0.2.2:8000/api/users/register/hospital`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        if (response?.data?.status === 'success') {
          Toast.show({
            type: 'success',
            text1: 'REGISTRATION SUCCESSFUL',
            position: 'bottom',
            visibilityTime: 2000,
          });
          dispatch(clearInputsr());
        } else {
          Toast.show({
            type: 'error',
            text1: 'Please try with different email',
            position: 'bottom',
            visibilityTime: 2000,
          });
        }
      })
      .catch(err => {
        if (err.response?.data?.errors?.user?.email?.length === 0) {
          Toast.show({
            type: 'error',
            text1: err.response?.data?.errors?.user?.non_field_errors[0],
            position: 'bottom',
            visibilityTime: 2000,
          });
        } else if (
          err.response?.data?.errors?.user?.non_field_errors?.length > 0
        ) {
          Toast.show({
            type: 'error',
            text1: err.response?.data?.errors?.user?.non_field_errors[0],
            position: 'bottom',
            visibilityTime: 2000,
          });
        } else {
          Toast.show({
            type: 'error',
            text1: err.response?.data?.errors?.user?.email[0],
            position: 'bottom',
            visibilityTime: 2000,
          });
        }
      });
  };

  return (
    <ImageBackground source={bcg} style={styles.background}>
      <View style={styles.pContainer}>
        <LinearGradient
          colors={['rgba(239, 239, 239, 0.86)', 'rgba(239, 239, 239, 0.1)']}
          style={styles.pCard}>
          <ScrollView>
            <View style={styles.pForm}>
              <Text style={styles.pTitle}>Register As Hospital</Text>
              <Text style={styles.label}>Hospital Name</Text>
              <TextInput
                style={styles.pInput}
                value={formValue.name}
                onChangeText={value => handleChange('name', value)}
              />

              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.pInput}
                maxLength={10}
                keyboardType="numeric"
                value={formValue.mobileNumber}
                onChangeText={value => handleChange('mobileNumber', value)}
              />

              <Text style={styles.label}>Province</Text>
              <TextInput
                style={styles.pInput}
                value={formValue.province}
                onChangeText={value => handleChange('province', value)}
              />

              <Text style={styles.label}>District</Text>
              <TextInput
                style={styles.pInput}
                value={formValue.district}
                onChangeText={value => handleChange('district', value)}
              />

              <Text style={styles.label}>Municipality</Text>
              <TextInput
                style={styles.pInput}
                value={formValue.municpality}
                onChangeText={value => handleChange('municpality', value)}
              />

              <Text style={styles.label}>Ward</Text>
              <TextInput
                style={styles.pInput}
                value={formValue.ward}
                keyboardType="numeric"
                onChangeText={value => handleChange('ward', value)}
              />

              <Text style={styles.label}>Stret</Text>
              <TextInput
                style={styles.pInput}
                value={formValue.street}
                onChangeText={value => handleChange('street', value)}
              />

              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.pInput}
                value={formValue.email}
                onChangeText={value => handleChange('email', value)}
              />

              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.pInput}
                value={formValue.password}
                onChangeText={value => handleChange('password', value)}
                secureTextEntry={true}
              />

              <Text style={styles.label}> Confirm Password</Text>
              <TextInput
                style={styles.pInput}
                value={formValue.password2}
                onChangeText={value => handleChange('password2', value)}
                secureTextEntry={true}
              />

              <TouchableOpacity onPress={hospitalRegister}>
                <Text style={styles.pBtn}>Register</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('HospitalLogin')}>
                <Text style={styles.hRegisterw}>
                  Already Have an Account?{' '}
                  <Text style={styles.hRegister}>Login</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </LinearGradient>
        <Toast />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  pTitle: {
    fontSize: 25,
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
    marginVertical: 20,
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
    paddingBottom: 80,
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
  },
  hRegisterw: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#161C2D',
  },
  hRegister: {
    color: '#4a01bc',
    textDecorationLine: 'underline',
  },
});
