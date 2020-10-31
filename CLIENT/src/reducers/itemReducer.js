import {
  GET_ITEMS,
  TOGGLE_MODAL,
  TOGGLE_FLAG,
  TOGGLE_SAVINGS_FLAG,
} from "../actionTypes";

export const initialState = {
  monthly: {
    incomes: [
      {
        id: 1,
        title: "Work",
        description: "With benefits",
        amount: 1000,
        permanent: true,
      },
      { id: 2, title: "Interest", amount: 200, permanent: true },
      { id: 3, title: "Other", amount: 10000 },
    ],

    expenses: [
      {
        id: 4,
        title: "Rent",
        description: "Last month",
        amount: 2000,
        deadline: "2020,11,06",
        permanent: true,
      },
      { id: 5, title: "Car fuel", amount: 200, permanent: true },
      { id: 6, title: "Wife birthday", amount: 100000, deadline: "2020,12,23" },
    ],
  },

  savings: {
    incomes: [{ id: 7, title: "Account", amount: 10000 }],

    expenses: [{ id: 8, title: "Car gearbox fix", amount: 2000 }],
  },

  isOpenModal: false,
  flag: false,
  savingsFlag: false,
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

    default: {
      return state;
    }
  }
}
