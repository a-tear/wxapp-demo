var api = require('../../utils/util')
const WxParse = require('../../wxParse/wxParse.js');
//Page Object
Page({
    data: {
        goodsDetail: []
    },
    getGoodsDetail(options) {
        api.request('/shop/goods/detail', {
            id: options.id
        }).then(res => {
            console.log('商品详情', res)
            this.setData({
                goodsDetail: res.data
            })
        })
    },
    //options(Object)
    // getAdd() {
    //     api.request('/shop/goods/kanjia/set/v2', {
    //         goodsId: 86233
    //     }).then(res => {
    //         console.log('2222', res)
    //     })
    // },
    onLoad: function (options) {
        console.log(options)
        this.getGoodsDetail(options)

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