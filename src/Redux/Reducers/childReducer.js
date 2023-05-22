import axios from 'axios';
import Toast from 'react-native-toast-message';

export const UPDATE_CHILD = 'UPDATE_CHILD';
export const ADD_CHILD = 'ADD_CHILD';
export const DELETE_CHILD = 'DELETE_CHILD';
export const UPDATE_FORM_VALUE = 'UPDATE_FORM_VALUE';
export const FETCH_CHILD_DATA_SUCCESS = 'FETCH_CHILD_DATA_SUCCESS';
export const UPDATE_IS_CHILD_EDIT = 'UPDATE_IS_CHILD_EDIT';
const UPDATE_CHILD_ID = 'UPDATE_CHILD_ID';

const CLEAR_INPUTS_C = 'CLEAR_INPUTS_C';

export const updateChildId = childId => {
  return {
    type: UPDATE_CHILD_ID,
    payload: childId,
  };
};
export const updateIsChildEdit = isChildEdit => ({
  type: UPDATE_IS_CHILD_EDIT,
  payload: isChildEdit,
});

export const updateFormValue = formValue => ({
  type: UPDATE_FORM_VALUE,
  payload: formValue,
});

export const clearInputc = () => ({
  type: CLEAR_INPUTS_C,
});

export const fetchChildData = token => async dispatch => {
  try {
    const response = await axios.get(
      'http://10.0.2.2:8000/api/main/view-child',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    dispatch({type: FETCH_CHILD_DATA_SUCCESS, payload: response.data});
  } catch (error) {
    console.log(error);
  }
};

export const updateChild = (child, token, childId) => async dispatch => {
  try {
    const response = await axios.patch(
      `http://10.0.2.2:8000/api/main/edit-child/${childId}`,
      child,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    dispatch({type: UPDATE_CHILD, payload: {childId, child: response.data}});
    if (response?.status === 200) {
      Toast.show({
        text1: 'Child Updated Sucessfully!!',

        visibilityTime: 3000,
        position: 'bottom',
      });
      dispatch(clearInputc());
    }

    console.log(response);
  } catch (error) {
    console.error(error);
    // Handle error state if necessary
  }
};

export const addChild = (child, token) => async dispatch => {
  try {
    const response = await axios.post(
      `http://10.0.2.2:8000/api/main/add-child`,
      child,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(response);
    dispatch({type: ADD_CHILD, payload: response.data});

    if (response?.status === 200) {
      Toast.show({
        text1: 'Child Added Sucessfully!!',

        visibilityTime: 3000,
        position: 'bottom',
      });
      dispatch(clearInputc());
    }
  } catch (error) {
    console.log(error);
    console.log(error.request);
    if (error) {
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.errors,
        position: 'bottom',
      });
    }
  }
};

export const deleteChild = (childId, token) => async dispatch => {
  try {
    const response = await axios.delete(
      `http://10.0.2.2:8000/api/main/delete-child/${childId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    dispatch({type: DELETE_CHILD, payload: childId});

    if (response.status === 200) {
      Toast.show({
        text1: 'Child Deleted Successfully!!',
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
    name: '',
    age: '',
    weight: '',
    height: '',
    birthPlace: '',
    dob: '',
    bloodGroup: '',
  },
  childData: [],
  isChildEdit: false,
  childId: null,
};

const childReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CHILD:
      const updatedChildData = [...state.childData];
      updatedChildData[action.payload.index] = action.payload.child;
      return {...state, childData: updatedChildData};
    case ADD_CHILD:
      return {...state, childData: [...state.childData, action.payload]};
    case DELETE_CHILD:
      const filteredChildData = state.childData.filter(
        child => child.id !== action.payload,
      );
      return {...state, childData: filteredChildData};
    case CLEAR_INPUTS_C:
      return initialState;
    case UPDATE_FORM_VALUE:
      return {...state, formValue: action.payload};
    case FETCH_CHILD_DATA_SUCCESS:
      return {...state, childData: action.payload};
    case UPDATE_IS_CHILD_EDIT:
      return {...state, isChildEdit: action.payload};
    case UPDATE_CHILD_ID:
      return {
        ...state,
        childId: action.payload,
      };

    default:
      return state;
  }
};

export default childReducer;
