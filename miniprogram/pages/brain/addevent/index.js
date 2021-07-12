Page({

  /**
   * 页面的初始数据
   */
  data: {
    types: [{
        text: "新角色",
        value: "role"
      },
      {
        text: "新卡组",
        value: "cardbag"
      },
      {
        text: "新怪物之门",
        value: "monster"
      }
    ],
    databaseName: "role",
    requireContent: false,
    form: {
      type: 0,
      date: "",
      dateString: "",
      content: ""
    }
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
  bindTypesChange(e) {
    let value = e.detail.value,
      name = this.data.types[value].value;
    this.setData({
      'databaseName': name,
      'form.type': value
    })
  },
  bindDateChange(e) {
    let date = e.detail.value;
    let dateNumber = new Date(date).getTime();
    this.setData({
      'form.date': dateNumber,
      'form.dateString': date
    })
  },
  save(evt) {
    if (this.data.form.title == "") {
      this.setData({
        'requireContent': true
      })
      return;
    }
    this.setData({
      'requireContent': false
    })
    this.save2(evt);
  },
  save2(evt) {
    const db = wx.cloud.database();
    let form = this.data.form;
    let name = this.data.databaseName;
    console.log(form);
    console.log(evt);
    console.log(name);
    db.collection(name).add({
      data: {
        ...form,
        content: evt.detail.value.content,
        createTime: db.serverDate()
      }
    }).then(() => {
      wx.showToast({
        title: "添加成功",
        icon: "success",
        success: () => {
          wx.navigateBack();
        }
      })
    })
  }
})