import {
  GET_ITEMS,
  TOGGLE_MODAL,
  TOGGLE_FLAG,
  TOGGLE_SAVINGS_FLAG,
  TOGGLE_SIM_FLAG,
} from "../actionTypes";

export const initialState = {
  monthly: {
    incomes: [],

    expenses: [],
  },

  savings: {
    incomes: [],

    expenses: [],
  },

  isOpenModal: false,
  flag: false,
  savingsFlag: false,
  simFlag: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        monthly: {
          incomes: action.payload.monthly.incomes,
          expenses: action.payload.monthly.expenses,
        },
        savings: {
          incomes: action.payload.savings.incomes,
          expenses: action.payload.savings.expenses,
        },
      };

    case TOGGLE_MODAL:
      return {
        ...state,
        isOpenModal: !state.isOpenModal,
      };

    case TOGGLE_FLAG:
      return {
        ...state,
        flag: !state.flag,
      };
    case TOGGLE_SAVINGS_FLAG:
      return {
        ...state,
        savingsFlag: !state.savingsFlag,
      };
    case TOGGLE_SIM_FLAG:
      return {
        ...state,
        simFlag: !state.simFlag,
      };

    default: {
      return state;
    }
  }
}
