import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { convertHourToString } from './Utils/functions'
import { SAVE, REMOVE } from './Actions/AppointmentActions'
import { store } from './Datastore/datastore'



describe('AppointmentScheduler', function () {
  // set of tests that deal with rendering
  describe('render', function () {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<App />, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });

  // set of tests that deal with unit testing
  describe('unitTests', function () {
    
    // test if hours match
    it('hours: do we have all hours [ 9 -> 17 ]', () => {
      const state = store.getState();
      var keys = Object.keys(state);
      var expected = ["9", "10", "11", "12", "13", "14", "15", "16", "17"];
      
      // wrapping in JSON.stringify since Jest throws "Compared values have no visual difference."
      expect(JSON.stringify(keys)).toBe(JSON.stringify(expected));
    });

    
    // time conversions
    it('convert hours to string: 9 -> 9am', () => {
      expect(convertHourToString(9)).toBe('9am');
    });
    it('convert hours to string: 12 -> 12pm', () => {
      expect(convertHourToString(12)).toBe('12pm');
    });
    it('convert hours to string: 3 -> 3pm', () => {
      expect(convertHourToString(15)).toBe('3pm');
    });

    // Redux tests
    it('redux test: SAVE', () => {
      SAVE.name = 'Test User';
      SAVE.phone = '555-555-5555';
      SAVE.startingHour = 9;
      store.dispatch(SAVE);
      let storedValue = store.getState()[9];
      let expected = {scheduled: true, startingHour: 9, hourString: '9am', name: 'Test User', phone: '555-555-5555'}
      var same = true;
      Object.keys(expected).map( (k) => {
        if(expected[k] !== storedValue[k]){
          same = false;
        }
      })
      expect(same).toBe(true);
    });

    it('redux test: REMOVE', () => {
      REMOVE.startingHour = 9;
      store.dispatch(REMOVE);
      let storedValue = store.getState()[9];

      let expected = {scheduled: false, startingHour: 9, hourString: '9am', name: '', phone: ''}
      var same = true;
      Object.keys(expected).map( (k) => {
        if(expected[k] !== storedValue[k]){
          same = false;
        }
      })
      expect(same).toBe(true);
    });



  });

});
