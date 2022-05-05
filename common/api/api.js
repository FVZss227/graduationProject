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


