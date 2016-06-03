import React from 'react';

const Instructions = () => (
    <div data-role='instructions' data-position='wheel-center'>
        <p>To begin scheduling your garden lightning, hover the mouse over one of the two white cyclic tracks.</p>
        <p>Each track corresponds to one relay.</p>
        <p>To create a new schedule, simply click when the cursor is at the right starting time, hold and move the cursor until the shutdown down, and release the click.</p>
        <p>The new schedule will be represented as a colorful track.</p>
        <p>To <b>edit</b> a schedule, click on it. This will pop up an edition pane. You will then be able to modifiy the scheduled times, or delete the schedule.</p>
    </div>
);

export default Instructions;
