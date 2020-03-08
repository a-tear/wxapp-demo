// pages/classification/classification.js
var api = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商品类别
    goodsCategory: [],
    // 商品
    goodsList: [],
    categorySelected: {
      name: '',
      id: ''
    },
    scrolltop: 0,
    onLoadStatus: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoodsCategory();
    this.getGoods();

  },
  // 获取商品类别
  getGoodsCategory() {
    wx.showLoading({
      title: '加载中',
    })
    api.request('/shop/goods/category/all').then(res => {
      console.log('商品类别', res)
      wx.hideLoading()
      let goodsCategory = [];
      let categoryName = '';
      let categoryId = '';
      if (res.code == 0) {
        for (let i = 0; i < res.data.length; i++) {
          let item = res.data[i];
          goodsCategory.push(item);
          if (i == 0) {
            categoryName = item.name;
            categoryId = item.id;
          }
        }
        console.log('222', categoryName)
        console.log('333', categoryId)
      }
      this.setData({
        goodsCategory: res.data,
        categorySelected: {
          name: categoryName,
          id: categoryId
        }
      })
    })
    this.getGoods()
  },
  // 获取商品
  getGoods() {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    api.request('/shop/goods/list', {
      categoryId: that.data.categorySelected.id,
      page: 1,
      pageSize: 100000
    }).then(res => {
      console.log('商品', res)
      wx.hideLoading()
      if (res.code == 700) {
        this.setData({
          goodsList: null
        });
        return
      }
      this.setData({
        goodsList: res.data
      })
    })
  },
  // 点击事件
  showGoods(e) {
    console.log('1111', e)
    var that = this;
    var id = e.currentTarget.dataset.id;
    if (id === that.data.categorySelected.id) {
      that.setData({
        scrolltop: 0,
      })
    } else {
      var categoryName = '';
      for (var i = 0; i < that.data.goodsCategory.length; i++) {
        let item = that.data.goodsCategory[i];
        if (item.id == id) {
          categoryName = item.name;
          break;
        }
      }
      that.setData({
        categorySelected: {
          name: categoryName,
          id: id
        },
        scrolltop: 0
      });
      that.getGoods();
    }
  },
  bindinput(e) {
    this.setData({
      inputVal: e.detail.value
    })
  },
  bindconfirm(e) {
    this.setData({
      inputVal: e.detail.value
    })
    wx.navigateTo({
      url: '/pages/goods/goods?name=' + this.data.inputVal,
    })
  },
  goGoodsDetail(e) {
    console.log('商品详情', e)
    wx.navigateTo({
      url: '/pages/goods-detail/goods-detail?id=' + e.currentTarget.dataset.id
    })
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