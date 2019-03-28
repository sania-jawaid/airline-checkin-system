import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {bookingActions} from '../_actions';

var timeout;

class Checkout extends React.Component {
    constructor(props){
        super(props);
        if (!this.props.user){
            window.location.href = "/login"
        }
        this.startTimer();
        this.state = {remainingTime: {minutes: 0, seconds: 0}};
    }

    startTimer() {
        let self = this;
        self.runCountDown()
        timeout = setTimeout(function(){
            alert("Sorry your booking has expired. Please try again.")
            window.history.back();
            self.stopTimer();
        }, 180000);
    }

    stopTimer() {
        clearTimeout(timeout);
    }

    runCountDown(){
        let date = new Date();
        date.setMinutes( date.getMinutes() + 3 );
        let deadline = date;
        let self = this;
        let interval = setInterval(function() {
            let now = new Date().getTime();
            let time = deadline - now;
            let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((time % (1000 * 60)) / 1000);
            self.setState({remainingTime:  {minutes: minutes, seconds: seconds}})
            if (time < 0) {
                self.setState({remainingTime:  {minutes: 0, seconds: 0}})
                clearInterval(interval);
            }
        }, 1000);
    }

    componentWillUnmount() {
        clearTimeout(timeout)
    }

    confirmBooking(userId){
        const { dispatch } = this.props;
        if (userId) {
            dispatch(bookingActions.confirmBooking(userId));
        }
    }

    render() {
        const {user}= this.props
        const { booking  } = this.props;
        return (
            <div className="col-md-12">
                <h3>Time Remaining to confirm your booking for the seat: {this.state.remainingTime.minutes} : {this.state.remainingTime.seconds}</h3>
                <br/>
                <button className="btn btn-primary" onClick={() => this.confirmBooking(user.id)}>Make Payment</button>
                {booking &&
                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                }
                <br/><br/>
                <p>
                    <Link to="/">Go Back</Link>
                </p>
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { booking } = state.booking;
    const { user } = state.authentication;
    return {
        user, booking
    };
}

const connectedCheckoutPage = connect(mapStateToProps)(Checkout);
export { connectedCheckoutPage as Checkout };