"use strict";

define(function () {
  return function (PERSONAL) {
    var oldPsd = PERSONAL.oldPsd,
        newPsd = PERSONAL.newPsd,
        repeatPsd = PERSONAL.repeatPsd,
        psdReg = PERSONAL.psdReg,
        submit = PERSONAL.submit;

    if (psdReg.test(oldPsd.value) && psdReg.test(newPsd.value) && psdReg.test(repeatPsd.value) && newPsd.value === repeatPsd.value) {
      PERSONAL.btnFlags = true;
      submit.className = "right";
    } else {
      PERSONAL.btnFlags = false;
      submit.className = "";
    }
  };
});