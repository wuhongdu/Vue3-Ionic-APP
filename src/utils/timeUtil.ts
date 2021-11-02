
export function formatDate(fmt: string, time: Date) {
  const o: any = {
      'M+': time.getMonth() + 1, // 月份 4
      'd+': time.getDate(), // 日  9
      'h+': time.getHours(), // 小时 11
      'm+': time.getMinutes(), // 分 22
      's+': time.getSeconds(), // 秒 44
      'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
      'S': time.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) { 
  // RegExp.$1是RegExp的一个属性,指的是与正则表达式匹配的第一个子匹配
      fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));  // 这是转换年
  }
  for (const k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) { 
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? 
                  (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))); 
              // o[k] 4 9 11 22 44
              // '00'+o[k] 004 009 0011 0022 0044
              // ..substr(('' + o[k]).length从o[k].length开始截取
      }
  }
  return fmt; // 2019-04-09 11:22:44

}