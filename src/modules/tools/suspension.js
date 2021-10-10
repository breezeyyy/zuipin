;
(function () {
    "use strict";

    class Suspension {
        constructor(susp, target) {
            this.susp = susp;
            this.target = target;

            this.suspAddEvent();
        }

        suspAddEvent() {
            const that = this;

            addEvent(document, "scroll", function () {
                document.documentElement.scrollTop >= that.target ? that.show() : that.hide();
            })
        }

        show() {
            this.susp.style.display = "block";
            this.setDelay(() => {
                this.susp.style.opacity = "1";
            }, 20);
        }

        hide() {
            this.susp.style.opacity = "0";
            this.setDelay(() => {
                this.susp.style.display = "none";
            }, 400);
        }

        setDelay(func, timoDelay) {
            clearTimeout(this.timeOutIndex);
            this.timeOutIndex = setTimeout(func, timoDelay);
        }
    }

    window.createSuspension = function (susp, target) {
        new Suspension(susp, target);
    }
})();