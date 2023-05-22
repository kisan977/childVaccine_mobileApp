import axios from 'axios';

export const UPDATE_APPOINTMENT = 'UPDATE_APPOINTMENT';
export const ADD_APPOINTMENT = 'ADD_APPOINTMENT';
export const DELETE_APPOINTMENT = 'DELETE_APPOINTMENT';
export const UPDATE_FORM_VALUE = 'UPDATE_FORM_VALUE';
export const FETCH_APPOINTMENT_DATA_SUCCESS = 'FETCH_APPOINTMENT_DATA_SUCCESS';
export const UPDATE_IS_APPOINTMENT_EDIT = 'UPDATE_IS_APPOINTMENT_EDIT';
const UPDATE_APPOINTMENT_ID = 'UPDATE_APPOINTMENT_ID';

const CLEAR_INPUTS_A = 'CLEAR_INPUTS_A';
import Toast from 'react-native-toast-message';

export const updateAppointmentId = appointmentId => {
  return {
    type: UPDATE_APPOINTMENT_ID,
    payload: appointmentId,
  };
};

export const updateIsAppointmentEdit = isAppointmentEdit => ({
  type: UPDATE_IS_APPOINTMENT_EDIT,
  payload: isAppointmentEdit,
});

export const updateFormValue = formValue => ({
  type: UPDATE_FORM_VALUE,
  payload: formValue,
});

export const clearInputa = () => ({
  type: CLEAR_INPUTS_A,
});

export const fetchAppointmentData = token => async dispatch => {
  try {
    const currentDate = new Date().toISOString().split('T')[0];
    const response = await axios.get(
      `http://10.0.2.2:8000/api/main/view-appointment/${currentDate}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(response.data);
    dispatch({type: FETCH_APPOINTMENT_DATA_SUCCESS, payload: response.data});
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllAppointmentData = token => async dispatch => {
  try {
    const response = await axios.get(
      `http://10.0.2.2:8000/api/main/view-appointment`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(response.data);
    dispatch({type: FETCH_APPOINTMENT_DATA_SUCCESS, payload: response.data});
  } catch (error) {
    console.log(error);
  }
};
export const updateAppointment =
  (appointment, token, appointmentId) => async dispatch => {
    try {
      const response = await axios.patch(
        `http://10.0.2.2:8000/api/main/edit-appointment/${appointmentId}`,
        appointment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      dispatch({
        type: UPDATE_APPOINTMENT,
        payload: {appointmentId, appointment: response.data},
      });
      if (response?.status === 200) {
        Toast.show({
          text1: 'Appointment Updated Successfully!!',
          visibilityTime: 3000,
          position: 'bottom',
        });
        dispatch(clearInputa());
      }

      console.log(response);
    } catch (error) {
      console.error(error);
      console.log(error);
      // Handle error state if necessary
    }
  };

export const addAppointment = (appointment, token) => async dispatch => {
  try {
    const response = await axios.post(
      `http://10.0.2.2:8000/api/main/add-appointment`,
      appointment,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(response);
    dispatch({type: ADD_APPOINTMENT, payload: response.data});

    if (response?.status === 200) {
      Toast.show({
        text1: 'Appointment Added Successfully!!',
        visibilityTime: 3000,
        position: 'bottom',
      });
      dispatch(clearInputa());
    }
  } catch (error) {
    if (error.response) {
      // The server responded with a status code outside of 2xx range
      console.log('Status:', error.response.status);
      console.log('Data:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.log('Request:', error.request);
    } else {
      // Something happened in setting up the request
      console.log('Error:', error.message);
    }
    console.log(error);
    if (error) {
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.errors,
        position: 'bottom',
      });
    }
  }
};

export const deleteAppointment = (appointmentId, token) => async dispatch => {
  try {
    const response = await axios.delete(
      `http://10.0.2.2:8000/api/main/delete-appointment/${appointmentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    dispatch({type: DELETE_APPOINTMENT, payload: appointmentId});

    if (response.status === 200) {
      Toast.show({
        text1: 'Appointment Deleted Successfully!!',
        visibilityTime: 3000,
        position: 'bottom',
      });
    }
  } catch (error) {
    console.error(error);
    // Handle error state if necessary
  }
};

const initialState = {
  formValue: {
    child_name: '',
    date: '',
    time: '',
    appointment_for: '',
    hospital_name: '',
  },
  appointmentData: [],
  isAppointmentEdit: false,
  appointmentId: null,
};

const appointmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_APPOINTMENT:
      const updatedAppointmentData = [...state.appointmentData];
      updatedAppointmentData[action.payload.index] = action.payload.appointment;
      return {...state, appointmentData: updatedAppointmentData};
    case ADD_APPOINTMENT:
      return {
        ...state,
        appointmentData: [...state.appointmentData, action.payload],
      };
    case DELETE_APPOINTMENT:
      const filteredAppointmentData = state.appointmentData.filter(
        appointment => appointment.id !== action.payload,
      );
      return {...state, appointmentData: filteredAppointmentData};
    case CLEAR_INPUTS_A:
      return initialState;
    case UPDATE_FORM_VALUE:
      return {...state, formValue: action.payload};
    case FETCH_APPOINTMENT_DATA_SUCCESS:
      return {...state, appointmentData: action.payload};
    case UPDATE_IS_APPOINTMENT_EDIT:
      return {...state, isAppointmentEdit: action.payload};
    case UPDATE_APPOINTMENT_ID:
      return {...state, appointmentId: action.payload};
    default:
      return state;
  }
};

export default appointmentReducer;
