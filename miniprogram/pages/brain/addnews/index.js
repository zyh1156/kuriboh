Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['顶级', '次级'],
    form: {
      title: "",
      level: 1,
      content: "",
      imglist: []
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
  bindPickerChange(e) {
    this.setData({
      'form.level': e.detail.value
    })
  },
  inputTitle(evt) {
    let value = evt.detail.value;
    this.setData({
      'form.title': value
    })
  },
  addimg() {
    let that = this;
    // 让用户选择一张图片
    wx.chooseImage({
      success: chooseResult => {
        console.log(chooseResult);
        // 判断图片大小
        let size = chooseResult.tempFiles[0].size;
        if (size > 2 * 1000 * 1000) {
          wx.showToast({
            title: '图片过大',
            icon: 'error'
          })
          return;
        }
        let fileName = chooseResult.tempFilePaths[0];
        fileName = new Date().getTime() + "-" + parseInt(Math.random() * 10000) + fileName.slice(fileName.indexOf("."), fileName.length);
        // 将图片上传至云存储空间
        wx.cloud.uploadFile({
          cloudPath: fileName,
          // 指定要上传的文件的小程序临时文件路径
          filePath: chooseResult.tempFilePaths[0],
          // 成功回调
          success: res => {
            that.addimg2(res.fileID);
          },
        })
      },
    })
  },
  addimg2(url) {
    let arr = this.data.form.imglist;
    arr.push(url);
    this.setData({
      'form.imglist': arr
    })
  },
  save(evt) {
    const db = wx.cloud.database();
    let form = this.data.form;
    db.collection("news").add({
      data: {
        ...form,
        content: evt.detail.value.content,
        createTime: db.serverDate()
      }
    }).then(res => {
      console.log(res);
    })
  }
})