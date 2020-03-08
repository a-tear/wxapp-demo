//Page Object
Page({
    data: {
        status: ['待付款', '待发货', '待收货', '待评价', '已完成'],
        currentType: 0,
        tabClass: ["", "", "", "", ""],
        hasRefund: false
    },
    //options(Object)
    onLoad: function (options) {
        console.log('orderList', options)
        if (options && options.type) {
            if (options.type == 99) {
                this.setData({
                    hasRefund: true,
                    currentType: options.type
                });
            } else {
                this.setData({
                    hasRefund: false,
                    currentType: options.type
                });
            }
        }
    },
    changeStatus(e) {
        console.log(e)
        var types = e.currentTarget.dataset.index;
        this.data.currentType = types;
        this.setData({
            currentType: types
        })
    },
    onReady: function () {

    },
    onShow: function () {

    },
    onHide: function () {

    },
    onUnload: function () {

    },
    onPullDownRefresh: function () {

    },
    onReachBottom: function () {

    },
    onShareAppMessage: function () {

    },
    onPageScroll: function () {

    },
    //item(index,pagePath,text)
    onTabItemTap: function (item) {

    }
});