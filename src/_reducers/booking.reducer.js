import { userConstants } from '../_constants';

export function booking(state = {}, action) {
    switch (action.type) {
        case userConstants.BOOKING_REQUEST:
            return { booking: true };
        case userConstants.BOOKING_SUCCESS:
            return {};
        case userConstants.BOOKING_SUCCESS:
            return {};
        default:
            return state
    }
}