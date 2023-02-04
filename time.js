const taskbarTime = document.querySelector("#taskbarTime");
const timeE = document.querySelector("#taskbarTime > #time");
const dateE = document.querySelector("#taskbarTime > #date");
const timePanel = document.querySelector("#timePanel")
const timePanelContext = document.querySelector("#timePanelContext")
const pTimeE = document.querySelector("#timePanelContext > #panelTime");

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function updateTime() {
    var curruntDate = new Date();

    if (curruntDate.getHours() > 12) {
        var timePeriod = "PM"
    } else {
        var timePeriod = "AM"
    }

    var lastDateNumber = curruntDate.getDate().toString().charAt(curruntDate.getDate().toString().length - 1);

    if (lastDateNumber == "1") {
        var dateOrdinal = "st";
    } else if (lastDateNumber == "2") {
        var dateOrdinal = "nd";
    } else if (lastDateNumber == "3") {
        var dateOrdinal = "rd";
    } else if (lastDateNumber == "4") {
        var dateOrdinal = "th";
    }

    if (curruntDate.getMinutes().toString().length == 1) {
        var minutes = "0" + curruntDate.getMinutes().toString();
    } else {
        var minutes = curruntDate.getMinutes();
    }

    if (curruntDate.getSeconds().toString().length == 1) {
        var seconds = "0" + curruntDate.getSeconds().toString();
    } else {
        var seconds = curruntDate.getSeconds();
    }

    if (curruntDate.getHours() == 0) {
        var hours = 12;
    } else {
        var hours = ((curruntDate.getHours()  - 1) % 12) + 1;
    }

    timeE.innerHTML = `${hours}:${minutes}${timePeriod}`;
    dateE.innerHTML = `${weekdays[curruntDate.getDay() - 1]} ${months[curruntDate.getMonth()]} ${curruntDate.getDate()}${dateOrdinal}`
    pTimeE.innerHTML = `${hours}:${minutes}:${seconds} <span>${timePeriod}</span>`

    requestAnimationFrame(updateTime)
}

updateTime()

taskbarTime.onclick = () => {
    timePanelContext.style.display = "unset";
    requestAnimationFrame(() => {
        timePanelContext.removeAttribute("style");
    })
}

window.onclick = (event) => {
    if (event.target == timePanel) {
        timePanelContext.style = "height: 0; opacity: 0;";
        setTimeout(() => {
            timePanelContext.display = "none"
        }, 500);
    }
}
