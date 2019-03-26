import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

import {  Button } from 'react-bootstrap';

import './styles.scss'

class Checkin extends React.Component {
    constructor(props){
        super(props);
        let seats=[];
        let types=['Left', 'Center', 'Right'];
        let priceList = {'Front': {'Window': 120, 'Middle': 100, 'Aisle': 110 }, 'Middle': {'Window': 100, 'Middle': 80, 'Aisle': 100 }, 'Back': {'Window': 120, 'Middle': 100, 'Aisle': 110 }}
        let i, j;
        for(i=1; i<= 3; i++){
            let row_wise_seats=[];
            for(j=1; j<=12; j++){
                row_wise_seats.push({seat_number: j, label: `${i} IJK ${j}`})
            }
            seats.push({row: i, row_wise_seats: row_wise_seats, label: types[i-1]})
        }
        this.state = {seats: seats, priceList: priceList, seatPrice: 0, priceToBePaid: 0, foodPrice: {veg: 300, nonVeg: 450}};
    }
    componentDidMount() {

        this.props.dispatch(userActions.getAll());
    }

    calculatePrice(btn, side, aisle, seatNumber){
        if (this.state.selectedSeat)
        {
           this.state.selectedSeat.btn.disabled = false;
        }
        let row = Math.ceil(seatNumber/4)
        btn.disabled=true
        let location = "Middle"
        if (seatNumber % 4 == 1){
            location = "Window"
        }else if(seatNumber % 4 == 0){
            location = "Aisle"
        }
        let price = this.state.priceList[side][location];
        if (row == 1){
            price += 50
        }
        this.setState({seatPrice: price, priceToBePaid: price, selectedSeat: {side: `${side} side`, aisle: `${aisle} aisle`, label: btn.title, btn: btn}})
    }

    addFoodPrice(amount){
        this.setState({priceToBePaid: this.state.seatPrice + amount})
    }

    render() {
        const { user, users } = this.props;
        return (
            <div className="checkin">
                <div className="col-md-8">
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
                                                        <button
                                                            onClick={(e) => this.calculatePrice(e.target, 'Front' , seat.label,  row_wise_seat.seat_number)}
                                                            title={'Seat Number: ' + row_wise_seat.label}>{row_wise_seat.seat_number} </button>
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
                                                        <button onClick={(e) => this.calculatePrice(e.target, 'Middle', seat.label, row_wise_seat.seat_number)} title={'Seat Number: ' + row_wise_seat.label}>{row_wise_seat.seat_number} </button>
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
                                                        <button onClick={(e) => this.calculatePrice(e.target, 'Back', seat.label, row_wise_seat.seat_number)} title={'Seat Number: ' + row_wise_seat.label}>{row_wise_seat.seat_number} </button>
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
                <div className="col-md-3 col-sm-offset-1">
                    <h2>Seat Details: </h2>
                    <b>{this.state.selectedSeat ? <div> {this.state.selectedSeat.side}, {this.state.selectedSeat.aisle}, {this.state.selectedSeat.label} </div> : 'N/A'}</b>
                    <h2>Price: Rs. {this.state.seatPrice}</h2>
                    <br/>
                    <p>
                        Add Meal with the ride? <br/>
                        <button onClick={() => this.addFoodPrice(this.state.foodPrice.veg)} title={this.state.foodPrice.veg}>Veg</button>
                        <button onClick={() => this.addFoodPrice(this.state.foodPrice.nonVeg)} title={this.state.foodPrice.nonVeg}>Non-Veg</button>
                    </p>
                    <h2>Total Price of the cart:</h2>
                    <h2>Rs. {this.state.priceToBePaid}</h2>
                    <br/>
                    <p>
                        <Link className="btn btn-primary" to="/checkout" disabled={this.state.priceToBePaid == 0}>Continue to Checkout</Link>
                    </p>
                </div>
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