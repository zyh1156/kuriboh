// miniprogram/pages/setting/add-package/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pdata: {
      name: "",
      img: "",
      date: ""
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
  // 修改名称
  inname(evt) {
    this.setData({
      'pdata.name': evt.detail.value
    })
  },
  // 修改日期
  indate(evt) {
    this.setData({
      'pdata.date': evt.detail.value
    })
  },
  // 添加图片
  uploadimg() {
    let that = this;
    // 让用户选择一张图片
    wx.chooseImage({
      success: chooseResult => {
        // 将图片上传至云存储空间
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath: new Date().getTime() + '.png',
          // 指定要上传的文件的小程序临时文件路径
          filePath: chooseResult.tempFilePaths[0],
          // 成功回调
          success: res => {
            that.setData({
              'pdata.img': res.fileID
            })
          },
        })
      },
    })
  },
  // 添加到数据库
  adddata() {
    const db = wx.cloud.database();
    let that = this;
    for (let v in that.data.pdata) {
      if (that.data.pdata[v] == "") {
        wx.showToast({
          title: '请完整填写',
          icon: 'error'
        })
        return;
      }
    }

    db.collection('card-package').add({
      data: that.data.pdata,
      success: res => {
        wx.showToast({
          title: '添加成功',
          icon: 'success'
        })
        setTimeout(() => {
          wx.navigateBack()
        }, 1500)
      },
      fail: res => {
        console.log(res);
        wx.showToast({
          title: '添加失败',
          icon: 'error'
        })
      }
    })
  }
})