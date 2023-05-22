import React, {useEffect, useCallback, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
  TextInput,
} from 'react-native';
import {
  editImage,
  fetchParentProfile,
  setSelectedFile,
} from '../../Redux/Reducers/profileReducer';

import {faPen} from '@fortawesome/free-solid-svg-icons/faPen';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import {faCircleXmark} from '@fortawesome/free-solid-svg-icons/faCircleXmark';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SelectList} from 'react-native-dropdown-select-list';
import axios from 'axios';

export default function ParentProfile() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const parentProfile = useSelector(state => state.profile.parentProfile);
  const image = useSelector(state => state.profile.image);
  const parentId = parentProfile.length > 0 ? parentProfile[0].id : null;
  const selectedFile = useSelector(state => state.profile.selectedFile);

  const [formValue, setFormValue] = useState({
    mobileNumber: '',
    gender: '',
    province: '',
    district: '',
    ward: '',
    street: '',
    muncipality: '',
  });

  const handleChange = (fieldName, value) => {
    setFormValue(prevState => ({
      ...prevState,
      [fieldName]: value,
    }));
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

  const editData = async () => {
    const formData = new FormData();
    formData.append('mobileNumber', formValue.mobileNumber);
    formData.append('gender', formValue.gender);
    formData.append('province', formValue.province);
    formData.append('district', formValue.district);
    formData.append('muncipality', formValue.muncipality);
    formData.append('ward', formValue.ward);
    formData.append('street', formValue.street);

    const user = await getUserFromAsyncStorage();
    const token = user?.token?.access;
    axios
      .patch(
        `http://10.0.2.2:8000/api/users/parent/edit/${parentId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: `Bearer ${token}`,
          },
        },
      )
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleFileSelect = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
      });

      const {uri} = response['0'];

      // Create a file object
      const file = {
        uri: uri,
        type: response['0'].type,
        name: response['0'].name,
      };

      dispatch(setSelectedFile(file));
      dispatch(editImage(parentId, file));
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, parentId]);

  useEffect(() => {
    dispatch(fetchParentProfile());
  }, [dispatch, selectedFile, show, image]);

  useEffect(() => {
    if (show) {
      const filterData = parentProfile.filter(item => item.id === parentId);
      const nameObj = {
        mobileNumber: filterData[0]?.mobileNumber,
        gender: filterData[0]?.gender,
        province: filterData[0]?.province,
        district: filterData[0]?.district,
        ward:
          filterData[0].ward !== undefined ? filterData[0].ward.toString() : '',
        street: filterData[0]?.street,
        muncipality: filterData[0]?.muncipality,
      };

      setFormValue({...nameObj});
    }
  }, [show]);

  // dropdown gender
  const data = [
    {key: '1', value: 'Male'},
    {key: '2', value: 'Female'},
  ];

  return (
    <View style={styles.profileContainer}>
      <View style={styles.AvatarContainer}>
        <View style={styles.AvatarCircle}>
          <Image
            source={{uri: `http://10.0.2.2:8000${image}`}}
            style={styles.profileImg}
            resizeMode="contain"
          />
        </View>
        <View style={styles.badge}>
          <TouchableOpacity onPress={handleFileSelect}>
            <FontAwesomeIcon icon={faPen} size={25} color="#4A148C" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.profileData}>
        <Text style={styles.nameH}>Profile Information</Text>
        <TouchableOpacity onPress={() => setShow(true)}>
          <FontAwesomeIcon
            icon={faPenToSquare}
            size={20}
            color="#4A148C"
            style={styles.edit}
          />
        </TouchableOpacity>

        {parentProfile.map(item => {
          return (
            <View key={item.id} style={styles.profileData}>
              <Text style={styles.name}>Full Name :{item.name} </Text>
              <Text style={styles.name}>Email :{item.email} </Text>
              <Text style={styles.name}>Mobile No.:{item.mobileNumber} </Text>
              <Text style={styles.name}>Province :{item.province} </Text>
              <Text style={styles.name}>District :{item.district} </Text>
              <Text style={styles.name}>Muncipality :{item.muncipality}</Text>
              <Text style={styles.name}>Ward : {item.ward}</Text>
              <Text style={styles.name}>Street :{item.street} </Text>
              <Text style={styles.name}>Gender :{item.gender} </Text>
            </View>
          );
        })}
      </View>

      {show ? (
        <Modal
          animationType="slide"
          transparent={true}
          visible={show}
          onRequestClose={() => {
            setShow(!show);
          }}>
          <View style={styles.centeredView}>
            <Pressable
              style={styles.buttonClose}
              onPress={() => setShow(!show)}>
              <FontAwesomeIcon icon={faCircleXmark} color="#4A148C" size={30} />
            </Pressable>
            <View style={styles.modalView}>
              <ScrollView>
                <View style={styles.ppForm}>
                  <Text style={styles.pplabel}>Phone Number</Text>
                  <TextInput
                    style={styles.ppInput}
                    maxLength={10}
                    keyboardType="numeric"
                    value={formValue.mobileNumber}
                    onChangeText={value => handleChange('mobileNumber', value)}
                  />

                  <Text style={styles.pplabel}>Province</Text>
                  <TextInput
                    style={styles.ppInput}
                    value={formValue.province}
                    onChangeText={value => handleChange('province', value)}
                  />

                  <Text style={styles.pplabel}>District</Text>
                  <TextInput
                    style={styles.ppInput}
                    value={formValue.district}
                    onChangeText={value => handleChange('district', value)}
                  />

                  <Text style={styles.pplabel}>Municipality</Text>
                  <TextInput
                    style={styles.ppInput}
                    value={formValue.muncipality}
                    onChangeText={value => handleChange('municpality', value)}
                  />

                  <Text style={styles.pplabel}>Ward</Text>
                  <TextInput
                    keyboardType="numeric"
                    style={styles.ppInput}
                    value={formValue.ward}
                    onChangeText={value => handleChange('ward', value)}
                  />

                  <Text style={styles.pplabel}>Stret</Text>
                  <TextInput
                    style={styles.ppInput}
                    value={formValue.street}
                    onChangeText={value => handleChange('street', value)}
                  />

                  <Text style={styles.pplabel}>Gender</Text>
                  <SelectList
                    data={data}
                    save="value"
                    value={formValue.gender}
                    setSelected={value => handleChange('gender', value)}
                    search={false}
                    boxStyles={{
                      borderRadius: 0,
                      backgroundColor: '#fff',
                      borderWidth: 0,
                    }}
                    dropdownStyles={{
                      backgroundColor: '#fff',
                      borderWidth: 0,
                      borderRadius: 0,
                    }}
                  />
                  <TouchableOpacity onPress={() => editData(parentId)}>
                    <Text style={styles.ppBtn}>EDIT</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

  AvatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  AvatarCircle: {
    backgroundColor: '#4A148C',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width: 200,
  },
  profileImg: {
    height: 170,
    width: 170,
    borderRadius: 85,
  },
  profileData: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  },
  name: {
    fontSize: 20,
    color: '#161C2D',
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 10,
  },
  nameH: {
    fontSize: 30,
    color: '#4A148C',
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 10,
  },
  badge: {
    backgroundColor: '#F7C663',
    borderRadius: 25,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 150,
    left: 250,
  },
  edit: {
    marginTop: 22,
    marginLeft: 10,
  },

  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  ppForm: {
    paddingBottom: 20,
    marginBottom: 20,
    marginTop: 0,
  },
  buttonClose: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  ppInput: {
    borderWidth: 1,
    borderColor: '#604abc',
    borderRadius: 0,
    padding: 10,
    marginVertical: 10,
    marginBottom: 20,
    fontSize: 20,
    color: '#161C2D',
    fontWeight: 'bold',
    backgroundColor: '#fff',
  },
  pplabel: {
    color: '#161C2D',
    fontSize: 15,
    fontWeight: 'bold',
  },

  ppBtn: {
    backgroundColor: '#604AC8',
    padding: 15,
    color: '#FFF',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
});
