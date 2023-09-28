$(function () {
    // Function to get the current date and display it in the header
    function displayCurrentDate() {
        var currentDate = dayjs().format("dddd, MMMM D, YYYY");
        $("#currentDay").text(currentDate);
    }

    // Function to update the time blocks with color-coded hours
    function updateTimeBlocks() {
        var currentHour = dayjs().hour();

        // Loop through each time block
        $(".time-block").each(function () {
            var row = $(this);
            var blockHour = parseInt(row.find(".hour").data("hour")); // Use data-hour attribute
            var description = row.find(".description");

            if (blockHour < currentHour) {
                row.addClass("past");
            } else if (blockHour === currentHour) {
                row.addClass("present");
            } else {
                row.addClass("future");
            }
        });
    }

    // Call functions to initialize the scheduler
    displayCurrentDate();
    updateTimeBlocks();
});
