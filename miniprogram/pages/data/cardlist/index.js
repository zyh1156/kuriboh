// miniprogram/pages/data/cardlist/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    first: {},
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData(options);
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

  },
  getData(options) {
    let databaseName = getApp().getDatabaseName(options.type);
    const db = wx.cloud.database();
    let that = this;
    db.collection(databaseName).orderBy("createTime", "desc").get({
      success: res => {
        let first = res.data[0];
        res.data.splice(0, 1);
        that.setData({
          'first': first,
          'list': res.data
        })
      }
    })
  }
})