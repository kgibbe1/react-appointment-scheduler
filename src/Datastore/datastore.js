import {createStore} from 'redux';
import appointmentReducer from './../Reducers/AppointmentReducers'
import { convertHourToString } from './../Utils/functions'

const HOUR_START = 9;
const HOUR_END = 17;
const appointments = {};

  
for(let i = HOUR_START; i <= HOUR_END; i++){
    appointments[i] = {
        scheduled: false, startingHour: i, hourString: convertHourToString(i), name: '', phone: ''
    };
}

export const store = createStore(appointmentReducer, appointments);