import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const bookingActions = {
    holdBooking,
    confirmBooking
};

function holdBooking(seatDetails) {
    return dispatch => {
        dispatch(request(seatDetails));

        userService.holdBooking(seatDetails)
            .then(
                user => {
                    dispatch(success());
                    history.push('/checkout');
                    dispatch(alertActions.success(`${seatDetails.seatInfo.label} is successfully placed on hold`));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(seatInfo) { return { type: userConstants.BOOKING_REQUEST, seatInfo } }
    function success(seatInfo) { return { type: userConstants.BOOKING_SUCCESS, seatInfo } }
    function failure(error) { return { type: userConstants.BOOKING_FAILURE, error } }
}

function confirmBooking(userId) {
    return dispatch => {
        dispatch(request(userId));

        userService.confirmBooking(userId)
            .then(
                user => {
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Booking successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(userId) { return { type: userConstants.BOOKING_REQUEST, userId } }
    function success(userId) { return { type: userConstants.BOOKING_SUCCESS, userId } }
    function failure(error) { return { type: userConstants.BOOKING_FAILURE, error } }
}