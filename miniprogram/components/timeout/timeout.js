// components/timeout/timeout.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    time: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    text: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  ready() {
    let text, time = this.data.time,
      now = new Date().getTime();
    let x = parseInt((now - time) / 1000);
    text = x + "秒";
    if (x / 60 >= 1)
      text = parseInt(x / 60) + "分钟"
    if (x / 60 / 60 > 1)
      text = parseInt(x / 60 / 60) + "小时"
    if (x / 60 / 60 / 24 > 1)
      text = parseInt(x / 60 / 60 / 24) + "天"
    if (x / 60 / 60 / 24 / 365 > 1)
      text = parseInt(x / 60 / 60 / 24 / 365) + "年"

    text += "前";
    this.setData({
      text: text
    })

  }
})