import React, { Component } from 'react';
import './App.css';
import TimeSlot from './Components/TimeSlot';
import EditModal from './Components/EditModal';
import { store } from './Datastore/datastore';

export default class App extends Component {
  hours = {};
  state = {
    showModal: false,
    selectedHour: 9,
  }

  constructor(props){
    super(props);
    this.hours = store.getState();
  }

  replaceModalState(modalVisible, hour){
    let newState = {...this.state, showModal: modalVisible}
    if(hour > 0){
      newState.selectedHour = hour;
    }
    this.setState(newState);
  }

  showModal(hour){
    this.replaceModalState(true, hour);
  }

  hideModal(){
    this.replaceModalState(false)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Appointment Scheduler</h1>
        </header>
        <div className="App-intro">
          {Object.keys(this.hours).map((hour) => {
            return <TimeSlot key={hour} hour={hour} onClick={this.showModal.bind(this)}></TimeSlot>
          })}
          <EditModal {...this.state} hideModal={this.hideModal.bind(this)}></EditModal>
        </div>
      </div>
    );
  }
}
