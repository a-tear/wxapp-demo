// pages/home/home.js
var api = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [], //轮播
    tipList: [], //小广告
    iconsList: [], //小图标
    recommend: [], //推荐
    goodsList: [], //商品信息
    bargainList: [], //砍价
    groupList: [] //拼团

  },
  // 获取bannert
  getBanner() {
    api.request('/banner/list', {
      type: 'index'
    }).then(res => {
      console.log('banner', res)
      this.setData({
        bannerList: res.data
      })
    })
  },
  // 获取小广告
  getTip() {
    api.request('/notice/list').then(res => {
      console.log('tip', res)
      this.setData({
        tipList: res.data.dataList
      })
    })
  },
  // 获取icons
  getIcons() {
    api.request('/shop/goods/category/all').then(res => {
      console.log('icons', res)
      this.setData({
        iconsList: res.data
      })
    })
  },
  // 获取商品
  getRecommend() {
    api.request('/shop/goods/list', 'POST').then(res => {
      console.log('推荐商品', res)
      // 推荐
      var newRecommend = res.data.filter(ele => {
        return ele.recommendStatus == 1
      })
      console.log('爆款', newRecommend)
      // 砍价
      var newBargainList = res.data.filter(ele => {
        return ele.kanjia == true
      })
      console.log('砍价', newBargainList)
      // 拼团
      var newGroupList = res.data.filter(ele => {
        return ele.pingtuan == true
      })
      console.log('拼团', newGroupList)
      this.setData({
        recommend: newRecommend,
        goodsList: res.data,
        bargainList: newBargainList,
        groupList: newGroupList
      })

    })
  },
  // 跳转到商品列表页面
  goGoods(e) {
    console.log('1', e)
    wx.navigateTo({
      url: '/pages/goods/goods?id=' + e.currentTarget.id
    })

  },
  // 跳转到商品详情页面
  goGoodsDetail(e) {
    console.log('2', e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/goods-detail/goods-detail?id=' + e.currentTarget.dataset.id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBanner()
    this.getTip()
    this.getIcons()
    this.getRecommend()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})