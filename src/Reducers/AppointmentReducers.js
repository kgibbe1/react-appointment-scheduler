
export default function appointmentReducer(state, action) {
    switch (action.type) {
        case 'SAVE':
            // save the name and phone number of the appointment and mark it scheduled
            state[action.startingHour] = {
                ...state[action.startingHour],
                scheduled: (action.name !== '' || action.phone !== ''),
                startingHour: action.startingHour,
                name: action.name,
                phone: action.phone
            };
            return {
                ...state
            }

        case 'REMOVE':
            // clear the name and phone number and clear the scheduled flag
            state[action.startingHour] = {
                ...state[action.startingHour],
                scheduled: (action.name !== '' || action.phone !== ''),
                startingHour: action.startingHour,
                name: action.name,
                phone: action.phone
            }
            return {
                ...state,
            };
        default:
            return state;
    }
}