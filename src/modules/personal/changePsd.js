define(() => {
    return function ({oldP, newP, url, success}) {
        // console.log(oldP, newP);
        ajax({
            url: url,
            type: "GET",
            success: res => {
                success(res);
            },
            fail: status => {
                console.log(status);
            },
            search: {
                type: "changeUserPsd",
                oldP: oldP,
                newP: newP,
                username: getCookie("username")
            }
        })
    }
})