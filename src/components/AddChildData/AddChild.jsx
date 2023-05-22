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
import {
  addChild,
  updateChild,
  updateFormValue,
} from '../../Redux/Reducers/childReducer';
import {SelectList} from 'react-native-dropdown-select-list';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddChild = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('Selct Date');

  const dispatch = useDispatch();
  const formValue = useSelector(state => state.childReducer.formValue);
  const isChildEdit = useSelector(state => state.childReducer.isChildEdit);
  const childData = useSelector(state => state.childReducer.childData);
  const childId = useSelector(state => state.childReducer.childId);
  console.log(formValue);

  // Function to handle form input changes
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

    if (isChildEdit == true) {
      dispatch(updateChild(formValue, token, childId));
    } else {
      dispatch(addChild(formValue, token));
    }
  };

  const data = [
    {key: '1', value: 'A+'},
    {key: '2', value: 'B+'},
    {key: '3', value: 'O+'},
    {key: '4', value: 'A-'},
    {key: '5', value: 'B-'},
    {key: '6', value: 'O-'},
  ];

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    const dt = new Date(date);

    const x = dt.toISOString().split('T');
    const x1 = x[0].split('-');

    const formattedDate = x1[0] + '-' + x1[1] + '-' + x1[2];
    setSelectedDate(formattedDate);
    handleChange('dob', selectedDate);
    hideDatePicker();
  };

  useEffect(() => {
    if (isChildEdit) {
      const filterData = childData?.filter(item => item.id === childId);

      if (filterData.length > 0) {
        const selectedDate = filterData[0].dob;
        setSelectedDate(selectedDate);

        const bloodGroupObj = data.find(
          item => item.value === filterData[0].bloodGroup,
        );

        const nameObj = {
          name: filterData[0].name,
          age:
            filterData[0].age !== undefined ? filterData[0].age.toString() : '',
          weight: filterData[0].weight,
          height: filterData[0].height,
          birthPlace: filterData[0].birthPlace,
          dob: selectedDate,
          bloodGroup: bloodGroupObj ? bloodGroupObj.value : '',
        };
        dispatch(updateFormValue(nameObj)); // Dispatch updateFormValue action
      }
    }
  }, [dispatch, isChildEdit, childData]);

  return (
    <View style={styles.childContainer}>
      <View style={styles.childCard}>
        <ScrollView>
          <Text style={styles.childTitle}>
            {isChildEdit ? 'Update' : 'Add'} Child Data
          </Text>
          <Text style={styles.label}>Child Name</Text>
          <TextInput
            name="name"
            value={formValue.name}
            onChangeText={value => handleChange('name', value)}
            style={styles.input}
          />
          <Text style={styles.label}>Child Age</Text>
          <TextInput
            name="age"
            style={styles.input}
            value={formValue.age}
            onChangeText={value => handleChange('age', value)}
            keyboardType="numeric"
          />
          <Text style={styles.label}>Child Weight(KG)</Text>
          <TextInput
            style={styles.input}
            name="weight"
            value={formValue.weight}
            onChangeText={value => handleChange('weight', value)}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Child Height(CM)</Text>
          <TextInput
            style={styles.input}
            name="height"
            value={formValue.height}
            onChangeText={value => handleChange('height', value)}
            keyboardType="numeric"
          />
          <Text style={styles.label}>Birth Place</Text>
          <TextInput
            style={styles.input}
            name="birthPlace"
            value={formValue.birthPlace}
            onChangeText={value => handleChange('birthPlace', value)}
          />

          <Text style={styles.label}>Blood Group</Text>

          <SelectList
            data={data}
            save="value"
            value={formValue.bloodGroup}
            setSelected={value => {
              handleChange('bloodGroup', value);
            }}
            search={false}
            boxStyles={{
              borderRadius: 0,
              backgroundColor: '#fff',
              borderColor: '#604abc',
              marginBottom: 20,
            }}
            dropdownStyles={{
              backgroundColor: '#fff',
              borderWidth: 0,
              borderRadius: 0,
            }}
            inputStyles={{
              fontSize: 20,
              color: '#161C2D',
              fontWeight: 'bold',
            }}
            dropdownTextStyles={{
              fontSize: 20,
              color: '#161C2D',
              fontWeight: 'bold',
            }}
          />
          {/* Other input fields */}
          <Text style={styles.label}>Click On Box To Choose Dob</Text>
          <TouchableOpacity onPress={showDatePicker}>
            <Text style={styles.inputD}>{selectedDate}</Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            date={new Date()}
          />

          <TouchableOpacity onPress={handleSubmit}>
            <Text style={styles.adminBtn}>
              {' '}
              {isChildEdit ? 'Update' : 'Add'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  childContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  childCard: {
    backgroundColor: '#4A148C',
    paddingTop: 20,
    paddingBottom: 80,
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
  },

  input: {
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
  inputD: {
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
  childTitle: {
    fontSize: 35,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  label: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  adminBtn: {
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
  formValue: state.childReducer.formValue,
  childData: state.childReducer.childData,
});

// Map the updateChild, addChild, and deleteChild actions to props
const mapDispatchToProps = {
  addChild,
  updateChild,
};

// Connect your component to the Redux store
export default connect(mapStateToProps, mapDispatchToProps)(AddChild);
