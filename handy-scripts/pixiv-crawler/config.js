module.exports = {
  /**
   * pixiv用户的UID，比如
   * wlop的主页地址是
   * https://www.pixiv.net/users/2188232
   * 他的ID就是2188232
   */
  USER_ID: 2188232,
  /**
   * pixiv要番茄的，懂的都懂
   * 这里填写本机HTTP代理服务的地址
   */
  HTTP_PROXY:'http://127.0.0.1:58002',
  /**
   * 记得注入登录态cookie，否则请求会被降级，取不到全量数据
   * 这个值会变化，建议每次重跑都重设置下，获取方式：
   * 使用chrome浏览器打开https://www.pixiv.net/，F12打开控制台，
   * 切换到Network一栏，选中第一个请求,
   * 复制 Request Headers中的cookie字段到下面的字符串中
   */
  COOKIE: '这是一段cookie，含有你的登陆状态，请按照上面的描述获取',
};