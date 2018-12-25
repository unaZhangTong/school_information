var url = location.href;
var res = addres(url);//将url传参的数据以对象的形式展示出来-public函数addres
var uname = decodeURI(res.uname);//把uname解码

$("#school").click(function () {
    location.href = "http://127.0.0.1/Volunteer_to_simulate/Normal_user/normal_school.html?uname="+uname;
})

$("#evaluation").click(function () {
    location.href = "http://127.0.0.1/Volunteer_to_simulate/Normal_user/normal_evaluation.html?uname="+uname;
})

$("#simulation").click(function () {
    location.href = "http://127.0.0.1/Volunteer_to_simulate/Normal_user/normal_simulation.html?uname="+uname;
})

$("#data").click(function () {
    location.href = "http://127.0.0.1/Volunteer_to_simulate/Normal_user/normal_data.html?uname="+uname;
})

$("#self").click(function () {
    location.href = "http://127.0.0.1/Volunteer_to_simulate/Normal_user/normal_self.html?uname="+uname;
})