// miniprogram/pages/cards/card/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showimg: false,
    card: {
      "_id": "b00064a760367b6a0701b8880b2111d3",
      "_openid": "ot8JO5QfpubXPLCiNtQbrTLZrDeA",
      "attack": "1500",
      "attribute": 3,
      "defense": "1200",
      "details": "半导体",
      "effect": [{}, {
        "id": 1,
        "name": "伤害生命值"
      }],
      "img": "cloud://toyh-60e91.746f-toyh-60e91-1300604454/1614183246296.png",
      "keywords": [{
        "_id": "28ee4e3e603515e10735ed8c17c07509",
        "text": "青眼"
      }],
      "level": 12,
      "name": "青眼白龙",
      "race": 2,
      "rarity": 2,
      "type": [0, 0]
    }
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
  getData(res) {
    let id = res.cardid;
    let that = this;
    const db = wx.cloud.database();
    db.collection('cards').where({
        _id: id
      })
      .get({
        success: function (res) {
          console.log(res.data)
          that.setData({
            'card': res.data[0]
          })
          console.log(JSON.stringify(that.data.card));
        }
      })
  },
  readimg(res) {
    let flag = res.currentTarget.dataset.flag;
    this.setData({
      showimg: flag
    })
  }
})