export const initialState = {
    basket:[],
    user: JSON.parse(localStorage.getItem("user")),
    address:{}
}
const reducer = (state,action) =>{
    console.log("action>>>",action);

    switch (action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item],
            };

        case 'REMOVE_FROM_BASKET':
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );
            let newBasket = [...state.basket];

            if (index >= 0) {
                newBasket.splice(index, 1);
            } else {
                console.warn(`Can't remove product (id: ${action.id}) as it is not in the basket.`);
            }

            return {
                ...state,
                basket: newBasket,
            };
            case "SET_ADDRESS":
                return {
                  ...state,
                  address: { ...action.item },
            };

              case "SET_USER":
                return {
                  ...state,
                  user: action.user,
            };
            case "EMPTY_BASKET":
                return {
                    ...state,
                    basket: [],
            };
        default:
            return state;
    }
};
export default reducer;
