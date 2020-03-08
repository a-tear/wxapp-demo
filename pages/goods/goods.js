//Page Object
var api = require('../../utils/util')
Page({
    data: {
        goodsList: [],
        orderBy: '',
        name: '',
        categoryId: ''
    },
    //options(Object)
    getGoods(_data) {
        api.request('/shop/goods/list', _data).then(res => {
            console.log('商品列表', res)
            this.setData({
                goodsList: res.data
            })
        })
    },
    search() {
        // 搜索商品
        wx.showLoading({
            title: '加载中',
        })
        const _data = {
            orderBy: this.data.orderBy,
            page: 1,
            pageSize: 500,
        }
        if (this.data.name) {
            _data.nameLike = this.data.name
        }
        if (this.data.categoryId) {
            _data.categoryId = this.data.categoryId
        }
        this.getGoods(_data)
        wx.hideLoading()
    },
    bindinput(e) {
        this.setData({
            name: e.detail.value
        })
    },
    bindconfirm(e) {
        this.setData({
            name: e.detail.value
        })
        this.search()
    },
    // 筛选 排序
    screen(e) {
        console.log('筛选', e)
        this.setData({
            orderBy: e.currentTarget.dataset.val
        })
        this.search()
    },
    goGoodsDetail(e) {
        wx.navigateTo({
            url: '/pages/goods-detail/goods-detail?id=' + e.currentTarget.dataset.id
        })
    },
    onLoad: function (options) {
        this.setData({
            name: options.name,
            categoryId: options.id
        })
        console.log(options)
        this.search()
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