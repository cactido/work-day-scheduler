function startUp() {
    //get the current date and current hour (24h format) from Moment
    var todaysDate = moment().format('dddd, MMMM Do');
    var currentHour = moment().format('HH');
    //display current date in the jumbotron    
    $('#currentDay').text(todaysDate);

    /*
    var newRow = $('<div>').addClass('row');
    var newTime = $('<span>').addClass('col-2 hour').text('TIME').attr('id','1');
    var newTask = $('<span>').addClass('col-8 description present').text('TASK')
    var newSaveButton = $('<button>').addClass('col-2 saveBtn btn btn-block').html('<img src = "./assets/images/save.png"><br />Save')

    newRow.append(newTime, newTask, newSaveButton);

    $('.container').append(newRow);
    */

    //generate new rows for 9AM through 5PM
    for (let i = 0; i < 9; i++) {
        var newRow = $('<div>').addClass('row');
        var thisHour = i;
        //check if time is before noon, noon, or after noon
        if (i < 3) {
            thisHour = 9 + i;
            thisHour = thisHour + 'AM';
        } else if (i === 3) {
            thisHour = '12PM';
        } else {
            thisHour = i - 3;
            thisHour = thisHour + 'PM';
        }
        //create the hour column with text as the calculated time
        var newTime = $('<span>').addClass('col-2 hour').text(thisHour);
        //creates a task column with an id reflecting the time
        var newTask = $('<span>').addClass('col-8 description').attr('id', 'task-' + thisHour);
        //creates a save button with an id reflecting the time
        var newSaveButton = $('<button>')
            .addClass('col-2 saveBtn btn btn-block')
            .html('<img src = "./assets/images/save.png"><br />Save')
            .attr('id', 'btn-' + thisHour);
        //add the new columns and save button to the generated row
        newRow.append(newTime, newTask, newSaveButton);
        //post the new row to the document
        $('.container').append(newRow)
    }
}

startUp();