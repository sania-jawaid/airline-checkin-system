import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

import {  Button } from 'react-bootstrap';

class Checkin extends React.Component {
    constructor(props){
        super(props);
        let seats=[];
        let types=['Left', 'Center', 'Right'];
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
            <div className="col-md-12">
                <p>Please follow the price chart below to book the table:</p>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Seat</th>
                        <th scope="col">Front Side</th>
                        <th scope="col">Middle</th>
                        <th scope="col">Back Side</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">Window</th>
                        <td>120 Rs</td>
                        <td>100 Rs</td>
                        <td>120 Rs</td>
                    </tr>
                    <tr>
                        <th scope="row">Middle</th>
                        <td>100 Rs</td>
                        <td>80 Rs</td>
                        <td>100 Rs</td>
                    </tr>
                    <tr>
                        <th scope="row">Aisle</th>
                        <td>110 Rs</td>
                        <td>100 Rs</td>
                        <td>110 Rs</td>
                    </tr>
                    </tbody>
                </table>

                <b>* Please note: An additional of 50 Rs will be charged with seats for first row of every side of the plane because of extra leg room available </b>

                <br/>
                <br/>
                <br/>
                <p>Please choose what seat you want to book</p>

                <div className='plane-side'>
                    <b>Front Side of the plane:</b>
                    <br/>
                    <div className="container">
                        <div className="row">

                            {this.state.seats.map((seat, index) =>
                                <div id={seat.row} className='col-md-3'>
                                    {seat.label + ' Aisle '}
                                    <br/>
                                    <div className="container">
                                        <div className="row">
                                            {seat.row_wise_seats.map((row_wise_seat, index) =>
                                                <div id={row_wise_seat.seat_number} className='col-md-2'>
                                                    <button title={'Seat Number: ' + row_wise_seat.label}>{row_wise_seat.seat_number} </button>
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <br/>
                <div className='plane-side'>
                    <b>Middle of the plane:</b>
                    <br/>
                    <div className="container">
                        <div className="row">

                            {this.state.seats.map((seat, index) =>
                                <div id={seat.row} className='col-md-3'>
                                    {seat.label + ' Aisle '}
                                    <br/>
                                    <div className="container">
                                        <div className="row">
                                            {seat.row_wise_seats.map((row_wise_seat, index) =>
                                                <div id={row_wise_seat.seat_number} className='col-md-2'>
                                                    <button title={'Seat Number: ' + row_wise_seat.label}>{row_wise_seat.seat_number} </button>
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <br/>
                <div className='plane-side'>
                    <b>Back Side of the plane:</b>
                    <br/>
                    <div className="container">
                        <div className="row">

                            {this.state.seats.map((seat, index) =>
                                <div id={seat.row} className='col-md-3'>
                                    {seat.label + ' Aisle '}
                                    <br/>
                                    <div className="container">
                                        <div className="row">
                                            {seat.row_wise_seats.map((row_wise_seat, index) =>
                                                <div id={row_wise_seat.seat_number} className='col-md-2'>
                                                    <button title={'Seat Number: ' + row_wise_seat.label}>{row_wise_seat.seat_number} </button>
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                </div>
                            )}
                        </div>
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