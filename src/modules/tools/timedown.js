;
(function () {
    "use strict";

    class TimeDown {
        constructor() {
            this.end = document.querySelectorAll(".timer");
            this.day = document.querySelectorAll(".days");
            this.hours = document.querySelectorAll(".hours");
            this.minute = document.querySelectorAll(".minute");
            this.seconds = document.querySelectorAll(".seconds");

            setInterval(() => {
                this.getInterval();
            }, 1000);
        }

        getInterval() {
            for (let i = 0; i < this.end.length; i++) {
                let interval = new Date(this.end[i].getAttribute("endtime")).getTime() - Date.now();
                interval /= 1000;
                this.day[i].innerHTML = `${parseInt(interval / 60 / 60 / 24)}天`;
                this.hours[i].innerHTML = this.add0(parseInt(interval / 60 / 60 % 24));
                this.minute[i].innerHTML = this.add0(parseInt(interval / 60 % 60));
                this.seconds[i].innerHTML = this.add0(parseInt(interval % 60));
            }
        }

        add0(value) {
            return value < 10 ? `0${value}` : value
        }
    }

    window.createTimeDown = function () {
        new TimeDown();
    }
})();