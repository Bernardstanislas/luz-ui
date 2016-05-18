import Firebase from 'firebase';

const rootRef = new Firebase('https://luz.firebaseio.com');

export const presenceRef = rootRef.child('base').child('presence');
export const relaysRef = rootRef.child('relays');
export const timesheetsRef = rootRef.child('timesheets');

export default rootRef;
