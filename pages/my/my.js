// pages/my/my.js
var api = require('../../utils/util')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getUserInfo()
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  goOrder(e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/order-list/order-list?type=' + e.currentTarget.dataset.type,

    });
  },
  gogogo() {
    console.log(1111)
    // wx.login({
    //   success(res) {
    //     console.log('code', res)
    //     api.request('/user/tt/microapp/login', {
    //       code: res.code,
    //     }, 'post').then(res => {
    //       console.log(res)
    //     })
    //   }
    // })

    // wx.getUserInfo({
    //   success(res) {
    //     console.log(res)
    //   }
    // })
    this.register()
  },
  register(e) {
    console.log('eeeeee', e)
    wx.login({
      success(res) {
        let code = res.code;
        console.log(code)
        wx.getUserInfo({
          success(res) {
            console.log(res)
            let encryptedData = res.encryptedData;
            let iv = res.iv;
            let referrer = '' // 推荐人
            let referrer_storge = wx.getStorageSync('referrer');
            if (referrer_storge) {
              referrer = referrer_storge;
            }
            console.log(encryptedData)
            console.log(iv)
            console.log(referrer)
            api.request('/user/wxapp/register/complex', {
              code: code,
              encryptedData: encryptedData,
              iv: iv,
              referrer: referrer
            }, 'post').then(res => {
              console.log(res)
            })
          }
        })
      }
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