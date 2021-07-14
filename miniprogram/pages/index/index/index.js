// miniprogram/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardbag: 0,
    role: 0,
    monster: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getCardbag();
    this.getRole();
    this.getMonster();

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

  },
  getCardbag() {
    const db = wx.cloud.database();
    db.collection('cardbag').orderBy("date", "desc").limit(1).get({
      success: res => {
        let data = res.data[0],
          day;
        if (data == undefined) {
          day = 0;
        } else {
          day = Math.floor(new Date().getTime() / 1000 / 60 / 60 / 24) * 1000 * 60 * 60 * 24 - data.date;
          day = parseInt(day / 1000 / 60 / 60 / 24);
        }
        this.setData({
          'cardbag': day
        })
      }
    })
  },
  getRole() {
    const db = wx.cloud.database();
    db.collection('role').orderBy("date", "desc").limit(1).get({
      success: res => {
        let data = res.data[0],
          day;
        if (data == undefined) {
          day = 0;
        } else {
          day = Math.floor(new Date().getTime() / 1000 / 60 / 60 / 24) * 1000 * 60 * 60 * 24 - data.date;
          day = parseInt(day / 1000 / 60 / 60 / 24);
        }
        this.setData({
          'role': day
        })
      }
    })
  },

  getMonster() {
    const db = wx.cloud.database();
    db.collection('monster').orderBy("date", "desc").limit(1).get({
      success: res => {
        let data = res.data[0],
          day;
        if (data == undefined) {
          day = 0;
        } else {
          day = Math.floor(new Date().getTime() / 1000 / 60 / 60 / 24) * 1000 * 60 * 60 * 24 - data.date;
          day = parseInt(day / 1000 / 60 / 60 / 24);
        }
        this.setData({
          'monster': day
        })
      }
    })
  }
})