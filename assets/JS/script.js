function startUp() {
    var todaysDate = moment().format('dddd, MMMM Do');
    console.log(todaysDate);
    
    $('#currentDay').text(todaysDate);

    var newRow = $('<div>').addClass('row');
    var newTime = $('<span>').addClass('col-2 hour').text('TIME').attr('id','1');
    var newTask = $('<span>').addClass('col-8 description present').text('TASK')
    var newSaveButton = $('<button>').addClass('col-2 saveBtn btn btn-block').html('<img src = "./assets/images/save.png"><br />SAVE')

    newRow.append(newTime, newTask, newSaveButton);

    $('.container').append(newRow);

}

startUp();