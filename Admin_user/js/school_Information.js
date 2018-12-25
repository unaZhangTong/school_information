//导航栏跳转
$("nav div").each(function (index,item) {
    //$(item).attr("myIndex","index");
    $(item).mouseover(function () {
        $(this).css("cursor", "pointer");
    })
})



//获取当前页面的url，获取用户名
var url = location.href;
var res = addres(url);//将url传参的数据以对象的形式展示出来-public函数addres
var uname1 = decodeURI(res.uname);//把uname解码


//点击个人信息，跳转到个人信息页面
$("#personal_information").click(function () {

    location.href = "http://127.0.0.1/Volunteer_to_simulate/Admin_user/admin_index.html?uname="+uname1;

})

//点击普通用户账号管理，跳转到账号管理页面
$("#admin_account").click(function () {

    location.href = "http://127.0.0.1/Volunteer_to_simulate/Admin_user/admin_account.html?uname="+uname1;

})

//点击公告管理，跳转到公告管理页面
$("#announcement").click(function () {

    location.href = "http://127.0.0.1/Volunteer_to_simulate/Admin_user/announcement.html?uname="+uname1;

})



//获取所有学校信息

var page = 1;//当前页
Load();//加载数据
LoadXinXi();//加载分页信息

//点击查询时查询
$("#query_btn1").click(function () {
    page = 1;
    Load();//加载数据
    LoadXinXi();//加载分页信息
})

function Load() {
    var key = $("#uname1").val();//查询条件

    $.ajax({
        url : "http://127.0.0.1/Volunteer_to_simulate/Admin_user/php/school_chuli.php",
        data : {
            page : page,
            key : key
        },
        type : "post",
        dataType : "JSON",
        success : function (data) {
            console.log(data);
            var str = "";
            for (var k in data){
                str += `<tr>
                            <td><a href="${data[k].officialWebsite}">${data[k].schoolName}</a></td>
                            <td>${data[k].schoolLocation}</td>
                            <td>${data[k].schoolAffiliated}</td>
                            <td>${data[k].schoolType}</td>
                            <td>${data[k].educationLevel}</td>
                            <td><span style="float: left;margin-left: 5px;" class="schoolCharacteristics985">${data[k].schoolCharacteristics985}</span> <span style="float: right;margin-right: 5px;" class="schoolCharacteristics211">${data[k].schoolCharacteristics211}</span></td>
                            <td class="graduateSchool">${data[k].graduateSchool}</td>
                            <td>${data[k].satisfaction}</td>
                            <td>
                                <a href="#" id="del">删除</a> | <a href="#" id="updata">修改</a>
                            </td>
                        </tr>`;
            }
            $("#nr").html(str);//加到页面上

            one(".schoolCharacteristics985");
            one(".schoolCharacteristics211");
            one(".graduateSchool");
            function one(one){
                $(one).each(function (index,item) {
                    if($(this).html() == "no"){
                        $(this).html("");
                    }
                    if($(this).html() == "yes"){
                        $(this).html("√");
                    }
                })
            }

        }
    })
}

function LoadXinXi() {
    var str = "";
    var minys = 1;
    var maxys = 1;
    var key = $("#uname1").val();

    //查总页数
    $.ajax({
        async : false,
        url : "http://127.0.0.1/Volunteer_to_simulate/Admin_user/php/school_zys.php",
        data : {
            key : key
        },
        type : "post",
        dataType : "TEXT",
        success : function (d) {
            maxys = d;
        }
    });

    str += "<span>总共：" + maxys + "页</span>  ";
    str += "<span id='prev'><a href='javascript:;'>上一页</a></span>";

    for(var i = page - 2; i < page + 3; i++) {
        if(i >= minys && i <= maxys) {
            if(i == page) {
                str += "<span class='dangqian' bs='" + i + "'><a href='javascript:;'>" + i + "</a></span>";
            } else {
                str += "<span class='list' bs='" + i + "'><a href='javascript:;'>" + i + "</a></span>";
            }

        }
    }

    str += "<span id='next'><a href='javascript:;'>下一页</a></span>";

    $("#fenye").html(str);

    //给上一页添加点击事件
    $("#prev").click(function() {
        page = page - 1;
        if(page < 1) {
            page = 1;
        }
        Load(); //加载数据
        LoadXinXi(); //加载分页信息
    })
    //给下一页加点击事件
    $("#next").click(function() {
        page = page + 1;
        if(page > maxys) {
            page = maxys;
        }
        Load(); //加载数据
        LoadXinXi(); //加载分页信息
    })
    //给中间的列表加事件
    $(".list").click(function() {
        page = parseInt($(this).attr("bs"));
        Load(); //加载数据
        LoadXinXi(); //加载分页信息
    })

}



//添加学校数据，页面变化
$("#add_btn1").click(function () {
    $("#customer_service_account_content").css("display","none");
    $("#table_add_information1").css("display","block");
})

//点击添加按钮，添加数据
$("#add_school").click(function () {
    var schoolName = $("#schoolName").val();
    var schoolLocation = $("#schoolLocation").val();
    var schoolAffiliated = $("#schoolAffiliated").val();
    var schoolType = $("#schoolType").val();
    var educationLevel = $("#educationLevel").val();
    var satisfaction = $("#satisfaction").val();
    var officialWebsite = $("#officialWebsite").val();
    var schoolCharacteristics985 = checked(0);
    var schoolCharacteristics211 = checked(1);
    var graduateSchool = checked(2);
    var independentCollege = checked(3);
    var privateCollege = checked(4);
    function checked(val) {
        if ($("input[type=checkbox]").eq(val).prop("checked")){
            return 'yes';
        }else{
            return 'no';
        }
    }

    if (schoolName == "" || schoolLocation == "" || schoolAffiliated == "" || schoolType == "" || educationLevel == "" || satisfaction == ""){
        return;
    }


    $.ajax({
        type : "post",
        url : "http://127.0.0.1/Volunteer_to_simulate/Admin_user/php/school_add.php",
        async : true,
        data : {
            schoolName : schoolName,
            schoolLocation : schoolLocation,
            schoolAffiliated : schoolAffiliated,
            schoolType : schoolType,
            educationLevel : educationLevel,
            satisfaction : satisfaction,
            officialWebsite : officialWebsite,
            schoolCharacteristics985 : schoolCharacteristics985,
            schoolCharacteristics211 : schoolCharacteristics211,
            graduateSchool : graduateSchool,
            independentCollege : independentCollege,
            privateCollege : privateCollege
        },
        success : function (msg) {
            console.log(msg);
            if (msg == 0){
                alert("该学校已存在，不能添加");
            }else if (msg == 1){
                alert("添加成功");
                setTimeout(function () {
                    location.href = "http://127.0.0.1/Volunteer_to_simulate/Admin_user/school_Information.html?uname="+uname1;

                },1000)
            } else {
                alert("添加失败")
            }
        }
    })
    
})


//点击取消按钮，页面变化
$("#cancel_school").click(function () {
    $("#customer_service_account_content").css("display","block");
    $("#table_add_information1").css("display","none");
})




/*
//分页
var page = 1;//当前页代表页码
var num = 4;//每页显示5条数据
var total = null;


//加载全部数据
function Load(url,uname1) {
    $.ajax({
        type : "get",
        url : url,
        async : true,
        data : {
            uname : uname1
        },
        success : function (msg) {

            var arr = JSON.parse(msg);
            console.log(arr);
            var str = "";
            for (var k = (page - 1) * num;k < page * num;k ++){
                if (k < arr.length){
                    str += `<tr>
                                <td><a href="${arr[k].officialWebsite}">${arr[k].schoolName}</a></td>
                                <td>${arr[k].schoolLocation}</td>
                                <td>${arr[k].schoolAffiliated}</td>
                                <td>${arr[k].schoolType}</td>
                                <td>${arr[k].educationLevel}</td>
                                <td><span style="float: left;margin-left: 5px;" class="schoolCharacteristics985">${arr[k].schoolCharacteristics985}</span> <span style="float: right;margin-right: 5px;" class="schoolCharacteristics211">${arr[k].schoolCharacteristics211}</span></td>
                                <td class="graduateSchool">${arr[k].graduateSchool}</td>
                                <td>${arr[k].satisfaction}</td>
                                <td>
                                    <a href="#" id="del">删除</a> | <a href="#" id="updata">修改</a>
                                </td>
                            </tr>`;
                }

            }

            $("#nr").html(str);//加到页面上
            one(".schoolCharacteristics985");
            one(".schoolCharacteristics211");
            one(".graduateSchool");
            function one(one){
                $(one).each(function (index,item) {
                    if($(this).html() == "no"){
                        $(this).html("");
                    }
                    if($(this).html() == "yes"){
                        $(this).html("√");
                    }
                })
            }

            //页数
            total = Math.ceil(arr.length/4);
            var str1 = "";
            for (var i =1;i <= total;i ++){
                str1 += `<li>${i}</li>`;
            }
            $("#u").html(str1);
            $("#u li").eq(page - 1).addClass("active");
        }
    })

}

var url = "http://127.0.0.1/Volunteer_to_simulate/Admin_user/php/admin_school_selectAll.php";

Load(url);//加载数据
$("#u").click(function () {
    var e = e || event;
    var target = e.target || e.srcElement;
    if(target.nodeName == "LI"){
        page = target.innerHTML; // page
        Load(url);
    }
})

$("#left").click(function () {
    if(page == 1){
        page = 1;
    }else{
        page--;
    }
    Load(url);
})

$("#right").click(function () {
    if(page == total){
        page = total;
    }else{
        page++;
    }
    Load(url);
})



//查询信息

$("#query_btn1").click(function () {
    var finduname = $("#uname1").val();//获取查询的内容
    if (finduname == ""){
        return;
    }
    var url = "http://127.0.0.1/Volunteer_to_simulate/Admin_user/php/admin_school_selectone.php";
    Load(url,finduname);

    $("#u").click(function (e) {
        var e = e || event;
        var target = e.target || e.srcElement;
        if(target.nodeName == "LI"){
            page = target.innerHTML; // page
            Load(url,finduname);
        }
    })

    $("#left").click(function () {
        if(page == 1){
            page = 1;
        }else{
            page--;
        }
        Load(url,finduname);
    })

    $("#right").click(function () {
        if(page == total){
            page = total;
        }else{
            page++;
        }
        Load(url,finduname);
    })

})

*/















