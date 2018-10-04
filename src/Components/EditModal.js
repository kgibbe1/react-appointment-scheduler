import React, { Component } from 'react';
import Modal from 'react-modal';
import { SAVE, REMOVE } from './../Actions/AppointmentActions';
import { store } from './../Datastore/datastore';

export default class EditModal extends Component {
    state = {
        showModal: false,
        appointmentScheduled: false,
    };

    componentDidMount() {
        store.subscribe(this.handleChange.bind(this));
        this.setState({ ...this.state, showModal: this.props.showModal });
    }

    closeModal() {
        this.setState({ ...this.state, appointmentScheduled: false });
        this.props.hideModal();
    }

    onOpen() {
        if (!this.state.appointmentScheduled) {
            document.querySelector('input[name="name"]').focus();
        }
    }

    // subscribe to any changes on the appointment
    handleChange() {
        const currentState = store.getState();
        if (currentState.scheduled === true) {
            console.log('Appointment Scheduled');
        } else {
            console.log('Appointment Cleared');
        }
    }

    clearData(e){
        e.preventDefault();
        // clear out the input field values
        let inputs = e.currentTarget.parentNode.parentNode.querySelectorAll('input[name]');
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].value = "";
        }
        // save the data
        this.saveData(e);
    }

    saveData(e) {
        e.preventDefault();
        let editValues = {};
        let inputs = e.currentTarget.parentNode.parentNode.querySelectorAll('input[name]');
        for (var i = 0; i < inputs.length; i++) {
            var input = inputs[i];
            editValues[input.name] = input.value;
        }
        if (editValues.name === '' && editValues.phone === '') {
            REMOVE.startingHour = this.props.selectedHour;
            store.dispatch(REMOVE);
        } else {
            SAVE.name = editValues.name;
            SAVE.phone = editValues.phone;
            SAVE.startingHour = this.props.selectedHour;
            store.dispatch(SAVE);
        }
        this.setState({ ...this.state, appointmentScheduled: true });
    }

    modalBodyAppointmentScheduled() {
        let editValues = this.getEditValues();
        return (<div>
            <p>Appointment {editValues.scheduled ? 'Scheduled' : 'Removed'}!</p>
            <button onClick={this.closeModal.bind(this)}>close</button>
        </div>);
    }

    getEditValues() {
        return store.getState()[this.props.selectedHour];
    }

    getRemoveButton(){
        let editValues = this.getEditValues()
        if(editValues.name !== "" || editValues.phone !== ""){ 
            return (
                <button className="btn-remove" onClick={this.clearData.bind(this)}>Remove</button>
            )
        }
        return "";
    }

    modalBodyForm() {
        let editValues = this.getEditValues()
        let removeButton = this.getRemoveButton();
        return (<form>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" defaultValue={editValues.name} />
            <label htmlFor="phone">Phone:</label>
            <input type="tel" name="phone" defaultValue={editValues.phone} />
            <div>
                <button onClick={this.saveData.bind(this)}>Save</button>
                {removeButton}
            </div>
        </form>);
    }

    render() {
        let ev = this.getEditValues();
        let { showModal } = this.props;
        var renderBody = this.modalBodyForm();
        if (this.state.appointmentScheduled) {
            renderBody = this.modalBodyAppointmentScheduled();
        }
        return (
            <div>
                <Modal
                    isOpen={showModal}
                    onRequestClose={this.closeModal.bind(this)}
                    onAfterOpen={this.onOpen.bind(this)}
                    className="modal"
                    appElement={document.getElementById('root')}
                >
                    <h2>Schedule Appointment for {ev.hourString}</h2>
                    {renderBody}
                </Modal>
            </div>
        );
    }
}