import { types } from './actions';

export const parseInitial = data => ({
    counter: 0,
    ...data,
});

const reducer = (state = {}, action) => {
    if (action.type === types.CLICK_IT) {
        return {
            ...state,
            counter: state.counter + 1,
        };
    }
    return state;
};

export default reducer;
