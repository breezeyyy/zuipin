define(() => {
    return function ({
        pageBox
    }) {
        pageBox.children[0].className = "prev";
        pageBox.children[pageBox.children.length - 3].className = "next";
    }
})