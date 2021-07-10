// miniprogram/pages/find/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menu: ['新闻', 'RPG', '直播'],
    menuIndex: 0,
    newsList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.getData();
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
  // 切换菜单
  changeMenu: function (evt) {
    let index = evt.target.dataset.index;
    this.setData({
      menuIndex: index
    })
  },
  // 获取数据
  getData() {
    const db = wx.cloud.database();
    let that = this;
    db.collection("news").orderBy("createTime", "desc").get({
      success: res => {
        let list = res.data;
        for (let i = 0; i < list.length; i++) {
          if (list[i].level == 0) {
            let first = list[i];
            list.splice(i, 1);
            list.unshift(first);
            break;
          }
        }
        that.setData({
          newsList:list
        })
      }
    })
  }
})