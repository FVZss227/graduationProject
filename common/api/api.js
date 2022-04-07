export default function cloud(option) {
    return new Promise((resolve, reject) => {
        uni.showLoading({
            title: '拼命加载中',
            mask: true
        })
        let {
            name,
            data = {}
        } = option
        // let token = uni.getStorageSync("token");
        // if (!name) {
        //     uni.hideLoading()
        //     throw new Error("name cannot be null");
        // }
        // if (name.includes("v2")) {
        //     if (token) {
        //         data = {
        //             ...data,
        //             ...{
        //                 token: token
        //             }
        //         }
        //     } else {
        //         uni.navigateTo({
        //             url: "/pages/login/index"
        //         })
        //     }
        // }
        uniCloud.callFunction({
            name: option.name,
            data: data
        }).then(res => {
            uni.hideLoading()
            let result = res.result
            if (result.code === 401) {
                uni.navigateTo({
                    url: "/pages/login/index"
                })
            } else {
                resolve(result)
            }
        }).catch(err => {
            uni.hideLoading()
            uni.showToast({
                title: err.message,
                icon: "none"
            })
        });
    })

}


