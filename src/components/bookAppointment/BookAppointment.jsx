import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  addAppointment,
  updateAppointment,
  updateFormValue,
} from '../../Redux/Reducers/appointmentReducer';

const BookAppointment = () => {
  const dispatch = useDispatch();
  const formValue = useSelector(state => state.appointmentReducer.formValue);

  const isAppointmentEdit = useSelector(
    state => state.appointmentReducer.isAppointmentEdit,
  );
  const appointmentData = useSelector(
    state => state.appointmentReducer.appointmentData,
  );
  const appointmentId = useSelector(
    state => state.appointmentReducer.appointmentId,
  );
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('Selct Date');
  const [selectedTime, setSelectedTime] = useState('Selct Time');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirm = date => {
    const dt = new Date(date);

    const x = dt.toISOString().split('T');
    const x1 = x[0].split('-');

    const formattedDate = x1[0] + '-' + x1[1] + '-' + x1[2];
    setSelectedDate(formattedDate);
    handleChange('date', formattedDate);
    hideDatePicker();
  };

  const handleTimeConfirm = time => {
    const selectedTime = new Date(time);

    const hour = selectedTime.getHours().toString().padStart(2, '0');
    const minute = selectedTime.getMinutes().toString().padStart(2, '0');
    const second = selectedTime.getSeconds().toString().padStart(2, '0');
    const formattedTime = `${hour}:${minute}:${second}`;

    setSelectedTime(formattedTime);
    handleChange('time', formattedTime);
    hideTimePicker();
  };

  const handleChange = (key, value) => {
    const updatedFormValue = {
      ...formValue,
      [key]: value,
    };
    dispatch(updateFormValue(updatedFormValue));
  };

  const getUserFromAsyncStorage = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.log('Error retrieving user from AsyncStorage:', error);
      return null;
    }
  };

  const handleSubmit = async () => {
    // Get the token from AsyncStorage
    const user = await getUserFromAsyncStorage();
    const token = user.token.access;

    if (isAppointmentEdit == true) {
      dispatch(updateAppointment(formValue, token, appointmentId));
    } else {
      dispatch(addAppointment(formValue, token));
    }
  };

  useEffect(() => {
    if (isAppointmentEdit) {
      const filterData = appointmentData?.filter(
        item => item.id === appointmentId,
      );
      const nameObj = {
        child_name: filterData[0].child_name,
        time: filterData[0].time,
        date: filterData[0].date,
        appointment_for: filterData[0].appointment_for,
        hospital_name: filterData[0].hospital_name,
      };
      dispatch(updateFormValue(nameObj));
    }
  }, [dispatch, isAppointmentEdit, appointmentData]);

  return (
    <View style={styles.bookContainer}>
      <View style={styles.bookCard}>
        <ScrollView>
          <Text style={styles.bookTitle}>
            {' '}
            {isAppointmentEdit ? 'Update' : 'Add'} Appointment
          </Text>
          <Text style={styles.bookLabel}>Child's Name</Text>
          <TextInput
            style={styles.bookInput}
            name="child_name"
            value={formValue.child_name}
            onChangeText={value => handleChange('child_name', value)}
          />

          {/* Other input fields */}
          <Text style={styles.bookLabel}>Date of Appointment</Text>
          <TouchableOpacity onPress={showDatePicker}>
            <Text style={styles.bookinputD}>{selectedDate}</Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            date={new Date()}
          />

          {/* Other input fields */}
          <Text style={styles.bookLabel}>Time Of Appointment</Text>
          <TouchableOpacity onPress={showTimePicker}>
            <Text style={styles.bookinputD}>{selectedTime}</Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleTimeConfirm}
            onCancel={hideTimePicker}
            date={new Date()}
          />

          <Text style={styles.bookLabel}>Hospital's Name</Text>
          <TextInput
            style={styles.bookInput}
            name="hospital_name"
            value={formValue.hospital_name}
            onChangeText={value => handleChange('hospital_name', value)}
          />
          <Text style={styles.bookLabel}>Appointment for</Text>
          <TextInput
            style={styles.bookInput}
            value={formValue.appointment_for}
            onChangeText={value => handleChange('appointment_for', value)}
          />

          <TouchableOpacity onPress={handleSubmit}>
            <Text style={styles.bookBtn}>
              {' '}
              {isAppointmentEdit ? 'Update' : 'Add'}{' '}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bookContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookCard: {
    backgroundColor: '#4A148C',
    paddingTop: 20,
    paddingBottom: 80,
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
  },

  bookInput: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 0,
    padding: 10,
    marginVertical: 10,
    marginBottom: 20,
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  bookinputD: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 0,
    padding: 10,
    marginVertical: 10,
    marginBottom: 20,
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  bookTitle: {
    fontSize: 35,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  bookLabel: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  bookBtn: {
    backgroundColor: '#F7C663',
    padding: 15,
    color: '#4A148C',
    fontSize: 25,
    textAlign: 'center',
    marginTop: 20,
    borderRadius: 4,
    width: '50%',
  },
  date: {
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 30,
    marginBottom: 20,
    color: '#604abc',
    fontSize: 20,
    textAlign: 'center',

    borderWidth: 1,
    borderColor: '#604abc',
  },
});
// Map the formValue and childData from Redux store to props
const mapStateToProps = state => ({
  formValue: state.appointmentReducer.formValue,
  appointmentData: state.appointmentReducer.appointmentData,
});

// Map the updateChild, addChild, and deleteChild actions to props
const mapDispatchToProps = {
  addAppointment,
  updateAppointment,
};

// Connect your component to the Redux store
export default connect(mapStateToProps, mapDispatchToProps)(BookAppointment);
