import React from 'react';
import {StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './src/Redux/store';
import {Root as PopupRootProvider} from 'react-native-popup-confirm-toast';
import Toast from 'react-native-toast-message';
import 'react-native-gesture-handler';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
const Stack = createNativeStackNavigator();
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons/faUser';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import {
  faCalendarCheck,
  faClock,
  faEye,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import WelcomePage from './src/pages/WelcomePage';
import FirstPage from './src/pages/FirstPage';
import AdminLogin from './src/components/AuthComponent/AdminLogin';
import ParentRegister from './src/components/AuthComponent/ParentRegister';
import ParentLogin from './src/components/AuthComponent/ParentLogin';
import HospitalRegister from './src/components/AuthComponent/HospitalRegister';
import HospitalLogin from './src/components/AuthComponent/HospitalLogin';
import ForgotPassword from './src/components/AuthComponent/ForgotPassword';
import ResetPassword from './src/components/AuthComponent/ResetPassword';
import ParentProfile from './src/components/ParentProfile/ParentProfile';
import AddChild from './src/components/AddChildData/AddChild';
import ViewChild from './src/components/ViewChildData/ViewChild';
import AllAppointments from './src/components/AllAppoinements/AllAppointments';
import BookAppointment from './src/components/bookAppointment/BookAppointment';
import TodayAppointment from './src/components/TodayAppointment/TodayAppointment';
import MyRemainder from './src/components/MyRemainder/MyRemainder';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PopupRootProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="WelcomePage"
              component={WelcomePage}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="FirstPage"
              component={FirstPage}
            />
            <Stack.Screen
              options={{
                headerTitleAlign: 'center',
                headerTintColor: '#604abc',
              }}
              name="AdminLogin"
              component={AdminLogin}
            />
            <Stack.Screen
              options={{
                headerTitleAlign: 'center',
                headerTintColor: '#604abc',
              }}
              name="ParentRegister"
              component={ParentRegister}
            />
            <Stack.Screen
              options={{
                headerTitleAlign: 'center',
                headerTintColor: '#604abc',
              }}
              name="ParentLogin"
              component={ParentLogin}
            />
            <Stack.Screen
              options={{
                headerTitleAlign: 'center',
                headerTintColor: '#604abc',
              }}
              name="HospitalRegister"
              component={HospitalRegister}
            />
            <Stack.Screen
              options={{
                headerTitleAlign: 'center',
                headerTintColor: '#604abc',
              }}
              name="HospitalLogin"
              component={HospitalLogin}
            />
            <Stack.Screen
              options={{
                headerTitleAlign: 'center',
                headerTintColor: '#604abc',
              }}
              name="ForgotPassword"
              component={ForgotPassword}
            />
            <Stack.Screen
              options={{
                headerTitleAlign: 'center',
                headerTintColor: '#604abc',
              }}
              name="ResetPassword"
              component={ResetPassword}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="ParentDashboard"
              component={ParentDashboard}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </PopupRootProvider>
    </Provider>
  );
}

function LogoutButton({handleLogout}) {
  React.useEffect(() => {
    handleLogout();
  }, [handleLogout]);

  return null;
}

function ParentDashboard() {
  const navigation = useNavigation();
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      // Implement any additional logout logic here
      // For example, navigate to the login screen
    } catch (error) {
      // Handle error while removing the item from AsyncStorage
      console.log('Error removing user from AsyncStorage:', error);
    }
    navigation.navigate('FirstPage');
  };

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveBackgroundColor: '#F7C663',
        drawerLabelStyle: {
          color: '#4A148C',
          fontSize: 20,
          fontWeight: 'bold',
          marginLeft: -10,
        },
        drawerStyle: {
          backgroundColor: '#4A148C',
        },
        drawerContentStyle: {
          backgroundColor: '#FFFFFF', // Set the background color for inactive items
        },
      }}>
      <Drawer.Screen
        name="ParentProfile"
        component={ParentProfile}
        options={{
          drawerLabel: ' My Profile',
          drawerIcon: () => (
            <FontAwesomeIcon icon={faUser} size={30} color="#4A148C" />
          ),

          headerTitleAlign: 'center',
          headerTintColor: '#604abc',
        }}
      />
      <Drawer.Screen
        name="AddChild"
        component={AddChild}
        options={{
          drawerLabel: 'Add Child',
          drawerIcon: () => (
            <FontAwesomeIcon icon={faPlusCircle} size={30} color="#4A148C" />
          ),
        }}
      />
      <Drawer.Screen
        name="ViewChild"
        component={ViewChild}
        options={{
          drawerLabel: 'View Child',
          drawerIcon: () => (
            <FontAwesomeIcon icon={faEye} size={30} color="#4A148C" />
          ),
        }}
      />
      <Drawer.Screen
        name="AllAppointments"
        component={AllAppointments}
        options={{
          drawerLabel: 'All Appointments',
          drawerIcon: () => (
            <FontAwesomeIcon icon={faCalendarCheck} size={30} color="#4A148C" />
          ),
        }}
      />
      <Drawer.Screen
        name="BookAppointment"
        component={BookAppointment}
        options={{
          drawerLabel: 'Book Appointment',
          drawerIcon: () => (
            <FontAwesomeIcon icon={faCalendarCheck} size={30} color="#4A148C" />
          ),
        }}
      />
      <Drawer.Screen
        name="TodayAppointment"
        component={TodayAppointment}
        options={{
          drawerLabel: 'Today Appointments',
          drawerIcon: () => (
            <FontAwesomeIcon icon={faCalendarCheck} size={30} color="#4A148C" />
          ),
        }}
      />
      <Drawer.Screen
        name="MyRemainder"
        component={MyRemainder}
        options={{
          drawerLabel: 'My Remainder',
          drawerIcon: () => (
            <FontAwesomeIcon icon={faClock} size={30} color="#4A148C" />
          ),
        }}
      />

      <Drawer.Screen
        name="Logout"
        options={{
          drawerLabel: 'Logout',
          drawerIcon: () => (
            <FontAwesomeIcon icon={faSignOutAlt} size={30} color="#4A148C" />
          ),
        }}>
        {() => <LogoutButton handleLogout={handleLogout} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({});
