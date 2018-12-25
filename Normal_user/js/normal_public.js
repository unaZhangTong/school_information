var url = location.href;
var res = addres(url);//将url传参的数据以对象的形式展示出来-public函数addres
var uname = decodeURI(res.uname);//把uname解码

$("#login_register p").html(uname);