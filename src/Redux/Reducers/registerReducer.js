const initialState = {
  formValue: {
    name: '',
    email: '',
    province: '',
    district: '',
    municpality: '',
    gender: '',
    password: '',
    password2: '',
    mobileNumber: '',
    ward: '',
    street: '',
  },
};

const CLEAR_INPUTS_R = 'CLEAR_INPUTS_R';

export const clearInputsr = () => ({
  type: CLEAR_INPUTS_R,
});

export default function registerReducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_PARENT_FORM':
      return {
        ...state,
        formValue: {
          ...state.formValue,
          ...action.payload,
        },
      };
    case CLEAR_INPUTS_R:
      return initialState;
    default:
      return state;
  }
}
