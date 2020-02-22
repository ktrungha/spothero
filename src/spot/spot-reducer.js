import { SPOT_UPDATE_SELECTED, SPOT_PURCHASE, SPOT_RESET } from './spot-actions';

const initialState = {
    selected: null
};

export default function spot(state = initialState, { type, payload }) {
    switch (type) {
        case SPOT_UPDATE_SELECTED: {
            return {
                ...state,
                selected: payload || null
            };
        }
        case SPOT_PURCHASE: {
            return {
                ...state,
                customer: payload || null
            };
        }
        case SPOT_RESET: {
            return initialState
        }

        default:
            return state;
    }
}
