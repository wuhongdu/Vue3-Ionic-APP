### 计划进度

1、地图嵌入控制页面 -- 涉及到定位、行驶线路图、行驶线路的历史记录(3条历史记录) 需要在andriod studio上编写
2、主页的编写
3、网络请求
4、控制页面显示电池电量   完成✅

ionic build
ionic cap add android
ionic cap copy
ionic cap sync

ionic cap open android

### 蓝牙模块思路
1、 首先要在扫描前知道 手机的网络是否在wifi情况下
2、 再次确认手机的蓝牙是否打开 蓝牙需要向模块传输wifi名 和 wifi密码
3、 打开蓝牙后 就获取蓝牙 配对列表 （模块的蓝牙需要提前与手机蓝牙配对）
4、 扫描得到的信息 与 获取的蓝牙列表进行比较 获取到id相同的 蓝牙 然后通过 id进行连接 传输信息

