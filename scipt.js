$(function () {
    // Function to get the current date and display it in the header
    function displayCurrentDate() {
        var currentDate = dayjs().format("dddd, MMMM D, YYYY");
        $("#currentDay").text(currentDate);
    }

    // Function to update the day column with color-coded hours
    function updateDayColumn() {
        var currentHour = dayjs().hour();
        var dayColumn = $(".day-column");
        
        // Clear the day column
        dayColumn.empty();

        // Generate the 12-hour cycle
        for (var i = 1; i <= 12; i++) {
            var hourDisplay = i <= 9 ? "0" + i : i;
            var ampm = currentHour >= 12 ? "PM" : "AM";
            var hour = currentHour >= 12 ? currentHour - 12 : currentHour;

            var hourBlock = $("<div>")
                .addClass("hour-block")
                .text(hourDisplay + " " + ampm);

            // Add different classes based on the current hour
            if (i === hour) {
                hourBlock.addClass("current-hour");
            } else if (i < hour) {
                hourBlock.addClass("past-hour");
            } else {
                hourBlock.addClass("future-hour");
            }

            // Append the hour block to the day column
            dayColumn.append(hourBlock);
        }
    }

    // Call functions to initialize the scheduler
    displayCurrentDate();
    updateDayColumn();
});
