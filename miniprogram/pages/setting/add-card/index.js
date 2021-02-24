// miniprogram/pages/setting/add-card/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    attribute: [],
    effect: [],
    effectText: '',
    effectObj: {},
    level: [],
    race: [],
    rarity: [],
    type: [],
    type2: [],
    keywords: [],
    keywordsText: '',
    keywordsText2: '',
    keywordsObj: {},
    getkeywords: false,
    card: {
      attribute: '',
      level: '',
      race: '',
      rarity: '',
      type: [],
      name: '',
      keywords: [],
      img: '',
      details: '',
      effect: [],
      attack: '',
      defense: '',

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
          'attribute': res.result.basics.attribute,
          'effect': res.result.effect,
          'level': res.result.basics.level,
          'race': res.result.race,
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
  // 设置卡片种类
  bindType(res) {
    this.setData({
      'card.type': res.detail.value
    })
  },
  // 设置种族
  bindRace(res) {
    let val = parseInt(res.detail.value);
    this.setData({
      'card.race': val
    })
  },
  // 设置等级
  bindLevel(res) {
    let val = parseInt(res.detail.value);
    this.setData({
      'card.level': val
    })
  },
  // 设置属性
  bindAttribute(res) {
    let val = parseInt(res.detail.value);
    this.setData({
      'card.attribute': val
    })
  },
  // 设置卡片名称
  inname(res) {
    this.setData({
      'card.name': res.detail.value
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
              'card.img': res.fileID
            })
          },
        })
      },
    })
  },
  // 添加效果类型
  binEffect(res) {
    let val = parseInt(res.detail.value);
    let obj = this.data.effect[val];
    this.setData({
      effectText: obj.name,
      effectObj: obj
    })
  },
  addEffect() {
    let arr = this.data.card.effect;
    arr.push(this.data.effectObj);
    this.setData({
      effectText: '',
      effectObj: {},
      'card.effect': arr
    })
  },
  bindKeywords(res) {
    let inx = res.currentTarget.dataset.inx;
    let obj = this.data.keywords[inx];
    this.setData({
      keywordsText: obj.text,
      keywordsObj: obj
    })
  },
  addKeywords() {
    let i, key = this.data.keywordsText2,
      keys = this.data.keywords;
    for (i = 0; i < keys.length; i++) {
      if (keys[i].text == key) {
        this.setData({
          keywordsObj: keys[i]
        })
        break;
      }
    }
    if (this.data.keywordsObj.text == undefined) {
      wx.showToast({
        title: '字段无效',
        icon: 'error'
      })
      return;
    }
    // 字段查重
    let arr = this.data.card.keywords;
    for (i = 0; i < arr.length; i++) {
      if (arr[i].text == text) {
        this.setData({
          keywordsText: '',
          keywordsObj: {}
        })
        return;
      }
    }
    // 添加字段
    arr.push(this.data.keywordsObj);
    this.setData({
      keywordsText: '',
      keywordsObj: {},
      'card.keywords': arr
    })
  },
  // 设置攻击力
  bindAtk(res) {
    this.setData({
      'card.attack': res.detail.value
    })
  },
  // 设置守备力
  bindDef(res) {
    this.setData({
      'card.defense': res.detail.value
    })
  },
  inkeywords(res) {
    let keywords = res.detail.value;
    if (keywords.length < 1) {
      return
    }
    const db = wx.cloud.database();
    let that = this;
    db.collection('keywords').where({
      text: db.RegExp({
        regexp: keywords,
        options: 'i',
      })
    }).get().then(res => {
      that.setData({
        keywords: res.data,
        keywordsText2: keywords,
        getkeywords: true
      })
    })
  },
  nosearch() {
    this.setData({
      getkeywords: false
    })
  },
  //添加描述
  addDetails(res) {
    let val = res.detail.value;
    this.setData({
      'card.details': val
    })
  },
  // 添加卡片
  addCard() {
    let data = this.data.card;
    let flag = false;
    console.log(data);
    for (let v in data) {
      if (data[v] === "") {
        if (data.type[0] == 0 &&
          (v == 'attack' || v == 'defense' || v == 'level' || v == 'race' || v == 'attribute')) {
          flag = true
        }
      }
      if (data[v] == [] && v == 'type') {
        flag = true;
      }
    }
    if (flag) {
      wx.showToast({
        title: '请完整填写',
        icon: 'error'
      })
      return;
    }
    const db = wx.cloud.database();
    let that = this;
    db.collection('cards').add({
      // data 字段表示需新增的 JSON 数据
      data: data,
      success: function (res) {
        wx.showToast({
          title: '添加成功',
          icon: 'error'
        })
      }
    })
  }
})