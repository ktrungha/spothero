export const SPOT_UPDATE_SELECTED = 'SPOT_UPDATE_SELECTED';
export const SPOT_PURCHASE = 'SPOT_PURCHASE';
export const SPOT_RESET = 'SPOT_RESET';

export const updateSelected = spot => {
    return {
        type: SPOT_UPDATE_SELECTED,
        payload: spot
    };
};

export const purchase = data => {
    return {
        type: SPOT_PURCHASE,
        payload: data
    };
};

export const reset = () => {
    return {
        type: SPOT_RESET,
    }
}