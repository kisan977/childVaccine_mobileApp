import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {
  deleteChild,
  fetchChildData,
  updateChildId,
  updateIsChildEdit,
} from '../../Redux/Reducers/childReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Popup} from 'react-native-popup-confirm-toast';

const ViewChild = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [token, setToken] = useState(null);
  const childData = useSelector(state => state.childReducer.childData);

  const handleDeleteConfirmation = childId => {
    Popup.show({
      type: 'confirm',
      title: 'Are You Sure??',
      buttonText: 'YES',
      confirmText: 'NO',
      callback: () => {
        deleteChildItem(childId);
        Popup.hide();
      },
      cancelCallback: () => {
        Popup.hide();
      },
    });
  };

  const deleteChildItem = childId => {
    dispatch(deleteChild(childId, token));
  };

  // Function to navigate to the UpdateChild page with the selected card's ID
  const navigateToUpdatePage = id => {
    navigation.navigate('AddChild', {id});
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
          dispatch(fetchChildData(token));
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };

    fetchData();
  }, [dispatch, token]);

  return (
    <ScrollView>
      <View style={styles.vcContainer}>
        {childData.map((child, index) => (
          <View style={styles.vcCard} key={index}>
            <Text style={styles.vcTitle}>Child Name: {child.name}</Text>
            <Text style={styles.vcTitle}>Date of Birth: {child.dob}</Text>
            <Text style={styles.vcTitle}>Birth Place: {child.birthPlace}</Text>
            <Text style={styles.vcTitle}>Age: {child.age}</Text>
            <Text style={styles.vcTitle}>Blood Group: {child.bloodGroup}</Text>
            <Text style={styles.vcTitle}>Weight(kg): {child.weight}</Text>
            <Text style={styles.vcTitle}>Height(cm): {child.height}</Text>
            <View style={styles.vcBWrapper}>
              <TouchableOpacity
                onPress={() => {
                  navigateToUpdatePage(child.id);
                  dispatch(updateIsChildEdit(true));
                  dispatch(updateChildId(child.id));
                }}>
                <Text style={[styles.vcBtn, styles.U]}>UPDATE</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDeleteConfirmation(child.id)}>
                <Text style={[styles.vcBtn, styles.D]}>DELETE</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  vcContainer: {
    flex: 1,
    backgroundColor: '#604abc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vcCard: {
    backgroundColor: '#FFF',
    paddingTop: 20,
    paddingBottom: 50,
    paddingLeft: 20,
    paddingRight: 20,
    width: '95%',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,
  },

  vcTitle: {
    fontSize: 25,
    color: '#161C2D',
    fontWeight: 'bold',
    marginLeft: 10,
  },

  vcBtn: {
    padding: 15,
    color: '#fff',
    fontSize: 25,
    textAlign: 'center',
    marginTop: 20,
    borderRadius: 5,
    marginLeft: 0,
  },
  U: {
    backgroundColor: 'blue',
  },
  D: {
    backgroundColor: '#DD1717',
  },
});

const mapStateToProps = state => ({
  childData: state.childReducer.childData,
});

export default connect(mapStateToProps)(ViewChild);
