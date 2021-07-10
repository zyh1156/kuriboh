// miniprogram/pages/find/detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {}
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
    let id = options.id,
      databaseName;
    switch (parseInt(options.type)) {
      case 0:
        databaseName = "news";
        break;
      case 1:
        databaseName = "king";
        break;
      case 2:
        databaseName = "score";
        break;
      case 3:
        databaseName = "happy";
        break;
      case 4:
        databaseName = "soul";
        break;
    }
    const db = wx.cloud.database();
    db.collection(databaseName).where({
      _id: id
    }).get().then(res => {
      // res.data 包含该记录的数据
      let data = res.data[0];
      this.setData({
        detail: data
      })
    }, res => {
      console.log(res);
    })
  }
})