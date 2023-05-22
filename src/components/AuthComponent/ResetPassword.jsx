import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  Text,
} from 'react-native';
import React from 'react';
import Toast from 'react-native-toast-message';
import {useNavigation, useRoute} from '@react-navigation/native';

const ResetPassword = () => {
  const navigation = useNavigation();
  // const route = useRoute();
  // const {id, token} = route.params;
  // console.log(id, token);

  return (
    <View style={styles.adminContainer}>
      <View style={styles.adminCard}>
        <Text style={styles.adminTitle}>Reset Password</Text>
        <Text style={styles.label}>Enter New Password</Text>
        <TextInput style={styles.input} secureTextEntry={true} />
        <Text style={styles.label}>Re-Enter New Password</Text>
        <TextInput style={styles.input} secureTextEntry={true} />

        <TouchableOpacity>
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

export default ResetPassword;
