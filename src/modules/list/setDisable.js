define(["cd"], (clearDisable) => {
    return function (LIST) {
        let {
            pageIndex,
            nav
        } = LIST;
        // console.log(nav);
        clearDisable(LIST);
        if (pageIndex === 0) {
            nav[0].previousElementSibling.className += " disable";
        } else if (pageIndex === nav.length - 1) {
            nav[nav.length - 1].nextElementSibling.className += " disable";
        } else {
            clearDisable(LIST);
        }
    }
})