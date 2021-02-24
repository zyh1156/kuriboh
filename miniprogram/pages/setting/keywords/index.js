// miniprogram/pages/setting/keywords/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
  
  inkeywords(res) {
    let keywords = res.detail.value;
    if (keywords.length < 1) {
      return
    } else {
      this.setData({
        keywordsText2: keywords
      })
    }
    const db = wx.cloud.database();
    let that = this;
    db.collection('keywords').where({
      text: db.RegExp({
        regexp: keywords,
        options: 'i',
      })
    }).get().then(res => {
      console.log(res);
      that.setData({
        keywords: res.data,
        getkeywords: true
      })
    })
  },
  addKeywords() {
    let text = this.data.keywordsText2;
    if (text == '') {
      return
    } else if (this.data.keywordsObj.text == undefined) {
      this.newKeywords(text);
      return;
    }
    let arr = this.data.card.keywords;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].text == text) {
        this.setData({
          keywordsText: '',
          keywordsText2: '',
          keywordsObj: {}
        })
        return;
      }
    }
    arr.push(this.data.keywordsObj);
    this.setData({
      keywordsText: '',
      keywordsObj: {},
      'card.keywords': arr
    })
  },
  newKeywords(text) {
    let arr = this.data.keywords;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].text == text) {
        flag = true;
        this.setData({
          keywordsObj: arr[i]
        });
        this.addKeywords();
        return
      }
    }
    const db = wx.cloud.database();
    let that = this;
    db.collection('keywords').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        text: text
      },
      success: function (res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        let obj = {
          text: text,
          _id: res._id
        }
        that.setData({
          keywordsObj: obj
        })
        that.addKeywords();
      }
    })
  },
})