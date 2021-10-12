define(() => {
    return function (url, type, success) {
        ajax({
            type: "GET",
            url: url,
            success: success,
            error: (status) => {
                console.log(status);
            },
            search: {
                type: type
            }
        })
    }
})