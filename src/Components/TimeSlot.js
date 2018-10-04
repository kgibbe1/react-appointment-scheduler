import React, { Component } from 'react';
import { store } from './../Datastore/datastore';

export default class TimeSlot extends Component {
    data = { scheduled: false }

    constructor(props) {
        super(props);
        this.showModal = this.showModal.bind(this)
    }

    showModal() {
        this.props.onClick(this.props.hour);
    }

    toTitleCase(str) {
        if (str === null || str === undefined) {
            return ''
        }
        return str.replace(
            /\w\S*/g,
            function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }

    showBookingData() {
        this.data = store.getState()[this.props.hour];
        if (this.data === null) {
            return;
        }
        return this.toTitleCase(this.data.name) + (this.data.phone !== undefined && this.data.phone.length > 0 ? " [" + this.data.phone + "]" : "")
    }

    render() {
        let hourString = store.getState()[this.props.hour].hourString;
        let scheduled = store.getState()[this.props.hour].scheduled;
        return (
            <div className="timeSlot" onClick={this.showModal}>
                <div className={scheduled ? 'selected' : ''}>
                    <div className="timeSlotInner">
                        <div className="bookingTime">{hourString}</div>
                        <div className="bookingData">{this.showBookingData()}</div>
                    </div>
                </div>
            </div>
        );
    }
}