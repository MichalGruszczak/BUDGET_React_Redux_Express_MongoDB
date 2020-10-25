import { GET_ITEMS } from "../actionTypes";

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

    default: {
      return state;
    }
  }
}
