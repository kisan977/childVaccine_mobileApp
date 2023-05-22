import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Popup} from 'react-native-popup-confirm-toast';
import {
  deleteAppointment,
  fetchAllAppointmentData,
  updateAppointmentId,
  updateIsAppointmentEdit,
} from '../../Redux/Reducers/appointmentReducer';

const AllAppointments = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [token, setToken] = useState(null);
  const appointmentData = useSelector(
    state => state.appointmentReducer.appointmentData,
  );

  const handleDeleteConfirmation = appointmentId => {
    Popup.show({
      type: 'confirm',
      title: 'Are You Sure??',
      buttonText: 'YES',
      confirmText: 'NO',
      callback: () => {
        deleteAppointmentItem(appointmentId);
        Popup.hide();
      },
      cancelCallback: () => {
        Popup.hide();
      },
    });
  };

  const deleteAppointmentItem = appointmentId => {
    dispatch(deleteAppointment(appointmentId, token));
  };

  // Function to navigate to the UpdateChild page with the selected card's ID
  const navigateToUpdatePage = id => {
    navigation.navigate('BookAppointment', {id});
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve the stored value from AsyncStorage
        const response = await AsyncStorage.getItem('user');

        if (response) {
          // Parse the retrieved JSON string back into an object
          const user = JSON.parse(response);

          // Access the token from the user object
          const token = user.token.access;
          setToken(token);

          // Dispatch the action with the token
          dispatch(fetchAllAppointmentData(token));
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <ScrollView>
      <View style={styles.vaContainer}>
        {appointmentData.map((appointment, index) => (
          <View style={styles.vaCard} key={index}>
            <Text style={styles.vaTitle}>
              Child Name: {appointment.child_name}
            </Text>
            <Text style={styles.vaTitle}>
              Parent Name: {appointment.parent_name}
            </Text>
            <Text style={styles.vaTitle}>
              Hospital Name: {appointment.hospital_name}
            </Text>
            <Text style={styles.vaTitle}>
              Date of Appointment: {appointment.date}
            </Text>
            <Text style={styles.vaTitle}>
              Time of Appointment: {appointment.time}
            </Text>
            <Text style={styles.vaTitle}>Status: {appointment.status}</Text>
            <Text style={styles.vaTitle}>
              Appointment for: {appointment.appointment_for}
            </Text>

            <View style={styles.vaBWrapper}>
              <TouchableOpacity
                onPress={() => {
                  navigateToUpdatePage(appointment.id);
                  dispatch(updateIsAppointmentEdit(true));
                  dispatch(updateAppointmentId(appointment.id));
                }}>
                <Text style={[styles.vaBtn, styles.Ua]}>UPDATE</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDeleteConfirmation(appointment.id)}>
                <Text style={[styles.vaBtn, styles.Ud]}>DELETE</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  vaContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  vaCard: {
    backgroundColor: '#4A148C',
    paddingTop: 20,
    paddingBottom: 50,
    paddingLeft: 20,
    paddingRight: 20,
    width: '95%',
    borderRadius: 5,
    marginTop: 10,
  },

  vaTitle: {
    fontSize: 25,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },

  vaBtn: {
    padding: 15,
    color: '#fff',
    fontSize: 25,
    textAlign: 'center',
    marginTop: 20,
    borderRadius: 5,
    marginLeft: 0,
  },
  Ua: {
    backgroundColor: '#0d6efd',
  },
  Ud: {
    backgroundColor: '#dc3545',
  },
});

const mapStateToProps = state => ({
  appointmentData: state.appointmentReducer.appointmentData,
});

export default connect(mapStateToProps)(AllAppointments);
