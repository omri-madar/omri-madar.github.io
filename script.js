document.addEventListener("DOMContentLoaded", function () {
    const calculator = document.getElementById("calculator");
    const addButton = document.querySelector(".add-button");
    const calculateButton = document.getElementById("calculate-button");
    const resultDisplay = document.getElementById("result");

    let totalHours = 0;
    let totalMinutes = 0;

    addButton.addEventListener("click", function () {
        const timeEntry = document.createElement("div");
        timeEntry.classList.add("time-entry");

        const hourInput = document.createElement("input");
        hourInput.type = "number";
        hourInput.classList.add("hour-input");
        hourInput.placeholder = "Hours";

        const hourSpan = document.createElement("span");
        //hourSpan.innerText = "h";

        const minuteInput = document.createElement("input");
        minuteInput.type = "number";
        minuteInput.classList.add("minute-input");
        minuteInput.placeholder = "Minutes";

        const minuteSpan = document.createElement("span");
        //minuteSpan.innerText = "m";

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "-";
        deleteButton.classList.add("delete-button");

        deleteButton.addEventListener("click", function () {
            totalHours -= parseFloat(hourInput.value) || 0;
            totalMinutes -= parseFloat(minuteInput.value) || 0;

            calculator.removeChild(timeEntry);
            updateTotal();
        });

        timeEntry.appendChild(hourInput);
        timeEntry.appendChild(hourSpan);
        timeEntry.appendChild(minuteInput);
        timeEntry.appendChild(minuteSpan);
        timeEntry.appendChild(deleteButton);

        calculator.insertBefore(timeEntry, calculateButton);
    });

    calculateButton.addEventListener("click", function () {
        updateTotal();
    });

    function updateTotal() {
        totalHours = 0;
        totalMinutes = 0;
    
        const hourInputs = document.querySelectorAll(".hour-input");
        const minuteInputs = document.querySelectorAll(".minute-input");
    
        for (let i = 0; i < hourInputs.length; i++) {
            const hours = parseFloat(hourInputs[i].value) || 0;
            const minutes = parseFloat(minuteInputs[i].value) || 0;
    
            totalHours += hours;
            totalMinutes += minutes;
        }
    
        // Adjust totalMinutes to account for exceeding 60 minutes
        totalHours += Math.floor(totalMinutes / 60);
        totalMinutes %= 60;
    
        resultDisplay.textContent = `${totalHours.toFixed(0)}h ${totalMinutes.toFixed(0)}m`;
    
        // Calculate hours left for the week (19 hours and 30 minutes expected)
        const hoursLeft = 19 - totalHours;
        const minutesLeft = 30 - totalMinutes;
    
        let message = "";
        if (hoursLeft > 0 || (hoursLeft === 0 && minutesLeft > 0)) {
            message = `Hours left for the week: ${hoursLeft.toFixed(0)}h ${minutesLeft.toFixed(0)}m`;
        } else {
            message = "You've exceeded the expected weekly hours!";
        }
    
        document.getElementById("hours-left").textContent = message;
    }
});
