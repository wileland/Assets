scipt.js
$(function () {
    // Function to get the current date and display it in the header
    function displayCurrentDate() {
        var currentDate = dayjs().format("dddd, MMMM D, YYYY");
        $("#currentDay").text(currentDate);
    }

    // Function to check and update the time-block classes (past, present, future)
    function updateHourlyBlocks() {
        var currentHour = dayjs().hour();

        $(".time-block").each(function () {
            var blockHour = parseInt($(this).attr("id").split("-")[1]);

            if (blockHour < currentHour) {
                $(this).removeClass("present future").addClass("past");
            } else if (blockHour === currentHour) {
                $(this).removeClass("past future").addClass("present");
            } else {
                $(this).removeClass("past present").addClass("future");
            }
        });
    }

    // Function to load saved events from local storage
    function loadEvents() {
        $(".time-block").each(function () {
            var blockId = $(this).attr("id");
            var savedEvent = localStorage.getItem(blockId);

            if (savedEvent) {
                $(this).find(".description").val(savedEvent);
            }
        });
    }

    // Function to save events to local storage
    $(".container-fluid").on("click", ".saveBtn", function () {
        var blockId = $(this).closest(".time-block").attr("id");
        var eventText = $(this).siblings(".description").val();

        localStorage.setItem(blockId, eventText);
    });

    // Call functions to initialize the scheduler
    displayCurrentDate();
    loadEvents();
    // Generate time blocks dynamically
    for (var i = 9; i <= 17; i++) {
        var ampm = i < 12 ? "AM" : "PM";
        var displayHour = i <= 12 ? i : i - 12;

        var timeBlock = `
            <div id="hour-${i}" class="row time-block">
                <div class="col-2 col-md-1 hour text-center py-3">${displayHour}${ampm}</div>
                <textarea class="col-8 col-md-10 description" rows="3"></textarea>
                <button class="btn saveBtn col-2 col-md-1" aria-label="save">
                    <i class="fas fa-save" aria-hidden="true"></i>
                </button>
            </div>
        `;

        $(".container-fluid").append(timeBlock);
    }

    // Set an interval to update the time-block classes every minute
    setInterval(updateHourlyBlocks, 60000);
});
