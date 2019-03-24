import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class Checkin extends React.Component {
    constructor(props){
        super(props);
        let seats=[];
        let types=['Center', 'Left', 'Right'];
        var i,j;
        for(i=1; i<= 3; i++){
            let row_wise_seats=[];
            for(j=1; j<=10; j++){
                row_wise_seats.push({seat_number: j, label: `${i} IJK ${j}`})
            }
            seats.push({row: i, row_wise_seats: row_wise_seats, label: types[i-1]})
        }
        this.state = {seats: seats};
    }
    componentDidMount() {

        this.props.dispatch(userActions.getAll());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    render() {
        const { user, users } = this.props;
        return (
            <div className="col-md-12 col-md-offset-3">
                <p>Please choose what seat you want to book</p>
                <div className="container">
                    <div className="row">
                        {this.state.seats.map((seat, index) =>
                            <div id={seat.row} className='col-md-4'>
                                {seat.label + ' Side '}
                                <div className="container">
                                    <div className="row">
                                        {seat.row_wise_seats.map((row_wise_seat, index) =>
                                            <div id={row_wise_seat.seat_number} className='col-md-1'>
                                                {'Seat Number: ' + row_wise_seat.label}
                                            </div>
                                        )}
                                    </div>

                                </div>
                            </div>
                        )}
                    </div>
                </div>

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
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(Checkin);
export { connectedHomePage as Checkin };