define(() => {
    return function (PERSONAL) {
        let {
            oldPsd,
            newPsd,
            repeatPsd,
            psdReg,
            submit
        } = PERSONAL;
        if (psdReg.test(oldPsd.value) &&
            psdReg.test(newPsd.value) &&
            psdReg.test(repeatPsd.value) &&
            newPsd.value === repeatPsd.value) {
            PERSONAL.btnFlags = true;
            submit.className = "right";
        } else {
            PERSONAL.btnFlags = false;
            submit.className = "";
        }
    }

})