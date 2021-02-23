// miniprogram/pages/setting/add-card/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rarity: [],
    type: [],
    type2: [],
    card: {
      rarity: '',
      type: []
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getConfig();
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
  // 获取基础配置
  getConfig() {
    let that = this;
    wx.cloud.callFunction({
      name: 'config',
      data: {},
      complete: res => {
        that.setData({
          'rarity': res.result.rarity,
          'type': res.result.type
        })
        this.changeConfig();
        console.log(res);
      },
    })
  },
  // 设置稀有度
  bindRarity(res) {
    let val = parseInt(res.detail.value);
    this.setData({
      'card.rarity': val
    })
    console.log(res);
  },
  //初始化
  changeConfig() {
    let type = this.data.type;
    let arr = new Array(),
      arr2 = new Array();
    for (let i = 0; i < type.length; i++) {
      arr2.push(type[i].name);
    }
    arr.push(arr2);
    arr.push(type[0].list);
    this.setData({
      'type2': arr
    })
  },
  // 修改卡片种类时
  changeType(res) {
    let type = this.data.type;
    if (res.detail.column == 0) {
      let arr = new Array(),
        arr2 = new Array();
      for (let i = 0; i < type.length; i++) {
        arr2.push(type[i].name);
      }
      arr.push(arr2);
      arr.push(type[res.detail.value].list);
      this.setData({
        'type2': arr
      })
    }
    console.log(res);
  },
  bindType(res){
    console.log(res);
  }
})