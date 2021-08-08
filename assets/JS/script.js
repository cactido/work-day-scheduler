function startUp() {
    //get the current date and current hour (24h format) from Moment
    var todaysDate = moment().format('dddd, MMMM Do');
    //var currentHour = moment().format('HH');
    var currentHour = '13';
    console.log(currentHour);
    //display current date in the jumbotron    
    $('#currentDay').text(todaysDate);
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
        //converts time to 24h format for button/textarea labeling
        var thisHour24 = (i === 0 ? '09' : i + 9);
        //create the hour column with text as the calculated time
        var newTime = $('<span>').addClass('col-2 hour').text(thisHour);
        //creates a task column with an id reflecting the time (24h format)
        var newTask = $('<div>').addClass('col-8 time-block').attr('id', 'task-' + thisHour24);
        var newTaskText = $('<span>').text('Enter a new task').attr('id','task-text-' + thisHour24);
        newTask.append(newTaskText);
        //creates a save button with an id reflecting the time
        var newSaveButton = $('<button>')
            .addClass('col-2 saveBtn btn btn-block')
            .html('<img src = "./assets/images/save.png"><br />Save')
            .attr('id', 'btn-' + thisHour24);
        //add the new columns and save button to the generated row
        newRow.append(newTime, newTask, newSaveButton);
        //post the new row to the document
        $('.container').append(newRow)
        //set highlights for past, present, future timeblock text areas
        for (let i = 0; i < 9; i++) {
            var compareHour = (i === 0 ? '09' : i + 9);
            //checks if each hour is past, present, or future
            if (currentHour > compareHour) {
                $('#task-' + compareHour).addClass('past');
            } else if (currentHour == compareHour) {
                $('#task-' + compareHour).addClass('present');
            } else {
                $('#task-' + compareHour).addClass('future');
            }
        }
    }
}
//edit a block's text on click
$('.container').on('click', '.time-block span', function() {
    //save previous text and id
    var previousText = $(this).text().trim();
    var currentId = $(this).attr('id');
    //replace with an editable text field
    var newTextInput = $('<textarea>').addClass('form-control').attr('id', currentId).val(previousText);
    $(this).replaceWith(newTextInput);
    //adds focus to the new textarea allowing the on blur function to be called
    //without needing to click inside the new textarea first
    newTextInput.focus();
});
//triggers when a time block's textarea loses focus
$('.container').on('blur', '.time-block textarea', function() {
    //retrieve text in textarea
    var currentText = $(this).val().trim();
    var currentId = $(this).attr('id');
    //changes the area back into a non-editable span and replaces the text with
    //the new input
    var newTextArea = $('<span>').text(currentText).attr('id', currentId);
    $(this).replaceWith(newTextArea);
})
//checks for clicks on save buttons, then saves the corresponding timeblock
//text to localStorage
$('.container').on('click', 'button', function() {
    //get the clicked button's ID and extract the hour from the last two characters
    var buttonId = $(this).attr('id');
    buttonId = buttonId.split('');
    buttonId.splice(0, 4);
    var selectedHour = buttonId.join('');
    //retrieves the text of the corresponding field
    var fieldId = '#task-text-' + selectedHour;
    var selectedTask = $(fieldId).text().trim();
    //save the corresponding text to localStorage
    localStorage.setItem(selectedHour, selectedTask);
});


startUp();