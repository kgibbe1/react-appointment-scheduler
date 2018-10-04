# Appointment Scheduler

This app is fairly bare bones since it was only built to solve a coding challenge.
General Structure:
- Application Scheduler consists of a list of `<TimeSlot>` components which list available appointment times.
- If there is an appointment scheduled, the background of the `<TimeSlot>` component will turn red and the name and phone number will be displayed under the time.
- When a `<TimeSlot>` component is clicked, the shared `<EditModal>` component is used to edit the appointment for the `<TimeSlot>` selected. The `<TimeSlot>` component sends its state data to the `<EditModal>` component for display/editing.
- If a `<TimeSlot>` component is clicked when it already has an appointment scheduled, the `<EditModal>` component will allow editing of the data. A `Remove` button will also be displayed to allow for easy removal of the data (you can also empty the input fields to remove the appointment).
- On saving/removing the appointment, you will see a success message in the `<EditModal>` component.
- Uses Redux for storing state
- Uses Reducers for saving and removing the data in the Redux state store.
- There are 2 Redux actions (`SAVE` and `REMOVE`)

## Thought Process

When builing the appointment scheduler, one of my main goals was to not duplicate use of the `<EditModal>` component. It's a lot easier to just loop through the `<TimeSlot>` components and create a new `<EditModal>` component for each appointment, but that would be bad practice and a waste of data on the DOM. The modal should be rendered to the DOM once and then its state should be updated based on the values from the selected time slot.

## React Modal

I tried to limit my use of npm/yarn packages for this assignment; however, I chose to use [React Modal](https://github.com/reactjs/react-modal) for my `<EditModal>` component to save myself some time not having to build/style a trivial modal. I figured it was safe to use a package for this since displaying the modal didn't seem like the goal of this assignment.

## Redux

This is my first time using Redux but not my first time researching it. I'm very new to Redux and still have a lot to learn about it.

## Run Tests

I went ahead an built a few tests for this app to check a few things. There is obviously way more we could test on the app, but this is a good enough start.

```yarn test```

Sample Output

```
AppointmentScheduler
    render
      ✓ renders without crashing (10ms)
    unitTests
      ✓ hours: do we have all hours [ 9 -> 17 ] (1ms)
      ✓ convert hours to string: 9 -> 9am
      ✓ convert hours to string: 12 -> 12pm
      ✓ convert hours to string: 3 -> 3pm
      ✓ redux test: SAVE (1ms)
      ✓ redux test: REMOVE
```

## Design

I put a little bit of work in to the overall design of the app, but it's still a bit boring a leaves something to be desired. I did not want to spend too much time styling this throwaway app, so if you think something could look better, it probably can.

## Create React App 

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).