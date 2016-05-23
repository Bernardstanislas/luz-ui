import moment from 'moment';
import {timesheetsRef} from '../firebase';
import isEqual from 'lodash/isEqual';

const convertDateToTimesheetEntry = date => ({
    d: moment(date).day(),
    h: moment(date).hour(),
    m: moment(date).minute()
});

export const addNewTimesheetEntry = (relayId, fromDate, toDate) => {
    const timesheetEntry = {
        active: true,
        from: convertDateToTimesheetEntry(fromDate),
        to: convertDateToTimesheetEntry(toDate)
    };
    if (!isEqual(timesheetEntry.from, timesheetEntry.to)) timesheetsRef.child(relayId).push().set(timesheetEntry);
}

export const removeTimesheetEntry = (relayId, timesheetId) => {
    timesheetsRef.child(relayId).child(timesheetId).remove();
}

export const editTimesheet = (relayId, {id, from, to, active}) => {
    timesheetsRef.child(relayId).child(id).set({from, to, active});
}
