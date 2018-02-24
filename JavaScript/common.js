 

window.onload = function () {
    var screenW = document.body.clientWidth;
    var screenH = document.body.clientHeight + (window.outerHeight - document.body.clientHeight);
    var mainH = document.getElementById("main").clientHeight;
    //alert(screenW);
    if (screenW < 780) {
        $("#pInfo").attr("onclick", "P_showInfoPanel()");
        $("#pInfo").addClass("leftP");
        $("#left").hide();
        $("#topNav").hide(); 
        $("#contact").attr("onclick", "P_showBasicInfo('pContactInfo')");
        $("#contact .userInfo span").text("点击查看信息"); 
    }
    if (screenH > 660) {
        if (screenH > mainH) {
            $("#left").css("height", screenH);
            $("#main").css("height", screenH);
        }
        else {
            $("#left").css("height", mainH);
            $("#main").css("height", mainH);
        }
    }
    document.getElementById("proCont").addEventListener("animationend", function () { //动画结束时事件 
        document.getElementById("proCont").removeAttribute("class");
    }, false);
}
 
document.getElementById('proCont').onscroll = function () {
    var sTop = document.getElementById('proCont').scrollTop;
    if (sTop > 100) {
        $("span.arrowDiv").hide();
    } else {
        $("span.arrowDiv").show();
    }
}
document.getElementById('skillList').onscroll = function () {
    var sTop = document.getElementById('skillList').scrollTop;
    if (sTop > 100) {
        $("span.arrowDiv").hide();
    } else {
        $("span.arrowDiv").show();
    }
}
//切换显示信息板块
function showInfo(str) {
    var infoList = ['personInfo', 'professionSkill', 'projectExp'];
    for (var i = 0; i < infoList.length; i++) {
        if (str == infoList[i]) {
            $("#" + infoList[i]).show();
            $("li." + infoList[i]).addClass("currentNav");
            //判断是否加载图表信息
            if (str == "professionSkill") {
                require.config({
                    packages: [
                           {
                               name: 'echarts',
                               location: '/MyselfIntro/eCharts',
                               //为兼容页面路径 /PersonIntro/PersonTimesHouse/eCharts
                               main: 'echarts'
                           },
                           {
                               name: 'zrender', 
                               location: '../eCharts/zrender/src',
                               main: 'zrender'
                           }
                    ]
                });

                //动态加载echarts，在回掉函数中使用，要注意保持按需加载结构定义图表路径
                require(
                        [
                            'echarts',//来源于packages设置的location
                            'echarts/chart/radar',
                        ],
                            DrawRadarUserEChart
                    )

            }

        } else {
            $("#" + infoList[i]).hide();
            $("li." + infoList[i]).removeClass("currentNav");
        }

    }

}

//绘制个人技能能力图（雷达图）
function DrawRadarUserEChart(ec) {
    var custSource = ec.init(document.getElementById('mySkill'));
    window.onresize = custSource.resize;
    //图表显示提示信息
    custSource.showLoading({
        text: "图表数据正在努力加载..."
    });
    custSource.hideLoading();

    custSource.setOption({
        tooltip: {//鼠标悬浮交互时的信息提示
            //触发类型，默认数据触发，可选：'item'和'axis'
            trigger: 'axis'
        },

        calculable: true,//是否启用拖拽重计算特性，默认关闭
        polar: [{
            center: ['50%', '50%'], // 图的位置
            name: {
                show: true, // 是否显示工艺等文字
                formatter: null, // 工艺等文字的显示形式
                textStyle: {
                    color: '#474747',
                    fontFamily: 'Microsoft YaHei',
                    fontSize: '12'
                }
            },
            indicator: [
            { text: 'HTML', max: 100 },
            { text: 'JavaScript', max: 100 },
            { text: 'HTML5', max: 100 },
            { text: 'jQuery', max: 100 },
            { text: 'CSS3/CSS2', max: 100 },
            { text: '响应性开发', max: 100 },
            { text: 'React', max: 100 },
            { text: 'C#', max: 100 },
            { text: 'Vue', max: 100 },
            { text: 'SQL Server', max: 100 }
            ],
            radius: '80%',//控制图表大小,半径
            nameGap: 55, // 图中工艺等字距离图的距离
            splitArea: {
                show: true,
                areaStyle: {
                    color: "rgba(0,0,0,0.3)"  // 图表背景网格的颜色
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    width: 1,
                    color: '#fff' // 图表背景网格线的颜色
                }
            }
        }],
        series: [//驱动图表生成的数据内容
            {
                type: 'radar',
                symbol: "none", // 去掉图表中各个图区域的边框线拐点
                itemStyle: {
                    normal: {
                        color: "rgba(0,0,0,0)", // 图表中各个图区域的边框线拐点颜色
                        lineStyle: {
                            color: "white" // 图表中各个图区域的边框线颜色
                        },
                        areaStyle: {
                            type: 'default',
                        },

                    }
                },
                data: [
                     {
                         value: [95, 85, 90, 85, 95, 90, 60, 75, 60, 85],
                         name: '方冬的技能',
                         itemStyle: {
                             normal: {
                                 areaStyle: {
                                     type: 'default',
                                     color: "rgba(241,88,88,0.6)", //rgba(188,136,236,0.6)114,177,208 图表中各个图区域的颜色
                                     opacity: 0.3 // 图表中各个图区域的透明度

                                 }
                             }
                         }
                     }
                ]

            }
        ]
    });
}

var proNameList = [
    { id: "1", name: "<a href='http://www.gzfucai.cn' target='_blank' title='贵州福彩官网'>贵州福彩官网及后台管理系统</a>" },
    { id: "2", name: "<a href='https://fangdong27.github.io/H5GameDemo/' target='_blank' title='H5小游戏-脑力风暴'>H5小游戏-脑力风暴</a>" },
	{ id: "3", name: "<a href='http://www.jlfc.com.cn' target='_blank' title='吉林福彩官网'>吉林福彩官网及后台管理系统</a>" },
    { id: "4", name: "<a href='http://www.jxfczx.cn/SpecialSubject/30years/30Anniversary.aspx'  target='_blank' title='中国福彩官网发行30周年庆'>江西福彩官网-中国福彩官网发行30周年庆专题活动</a>" },
    { id: "5", name: "其他静态网站" },
    { id: "6", name: "维护类项目" }

];

var proList = [
    { 
	id: "1", intro: "该项目采用B/S+C#+SQL Server ，运用asp.net开发，前端开发主要用到jQuery和JavaScript。项目开发历时两个月，团队3人，本人主要负责前端页面编写，动态显示数据，及部分后端读取数据的方法。该项目用于展示各福利彩票玩法的资讯以及贵州福彩中心的新闻讯息，方便彩民在网上及时了解福利彩票各种新闻动态，查询开奖信息。" },	
    { id: "2", intro: "该项目是本人在闲暇时间中参照微信某火爆小程序游戏编写的，主要是为了锻炼本人的编码能力，还有诸多不足的地方有待改进。<div>本项目主要适配移动手机端，采用B/S+HTML5+CSS3+ jQuery编写的静态页面，可实现简单的答题功能。</div>" },
	{ id: "3", intro: "该项目采用B/S+C#+SQL Server ，运用asp.net开发，前端开发主要用到jQuery和JavaScript。项目开发历时一个月，团队3人，本人主要负责前端页面编写，动态显示数据，及部分后端读取数据的方法。该项目用于展示各福利彩票玩法的资讯以及吉林福彩中心的新闻讯息，方便彩民在网上及时了解福利彩票各种新闻动态，查询开奖信息。" },
    { id: "4", intro: "该项目主要是为展示福彩发行30周年一路走来的历程，需要吸引彩民的眼球，了解福彩。技术上采用B/S+asp.net+C#开发，前端开发主要用到jQuery和JavaScript，页面布局排版采用HTML+CSS3，通过绚烂的CSS3动画技术显示页面信息，给人耳目一新的感觉。" },
    { id: "5", intro: "静态网站采用的技术都是B/S+HTML+CSS3+JavaScript实现的，并未实现后端读取数据的功能，只是展示网站所属公司的基本信息。开发过的网站有<a href='http://www.zunxinwl.com/'>深圳市尊信网络科技有限公司</a>，<a href='http://183.239.137.70:11102/'>深圳市思乐数据技术有限公司</a>等。" },
    {
        id: "6", intro: "维护类项目主要有：<a href='http://www.lnlotto.com/'>辽宁福彩中心官网</a>，<a href='http://www.tjflcpw.com/'>天津福彩中心官网</a>，<a href='http://www.jxfczx.cn/'>江西福彩中心官网</a>等。辽宁福彩中心官网主要维护PC端网站，添加了福彩演播室专栏，学习宣传十九大专栏等。" +
    "天津福彩中心官网添加了首页背景图，右下角视频播放，专题活动页面等。江西福彩中心官网添加了现实微信平台新闻专栏，地市资讯专栏，快3知识有奖竞赛活动专题，活动页面：<a href='http://www.jxfczx.cn/SpecialSubject/k3ContestPrizes/index.html'>快3知识有奖竞赛活动专题</a>，<a href='http://www.jxfczx.cn/SpecialSubject/k3ContestPrizes/ContestQuestion.aspx'>答题页面</a>。"
    }
];

var dutyList = [
    {
        id: "1", duty: "该项目采用的是B/S方式展示信息，所以页面框架基本以HTML+CSS为主，部分需要动态显示的数据信息，采用JavaScript+jQuery，着重使用ajax方法显示页面数据，加快页面加载速度，提升用户体验。" +
          "检测网站的浏览器兼容性问题及网站安全问题，添加cs shack及JavaScript方法，防止SQL盲注和跨站点脚本编制的WEB安全问题。"
    },	
    {
        id: "2", duty: "该项目由本人单独设计编码，部分图片由网上查找下载。页面主要运用HTML5+CSS3编写，采用CSS3的动画技术，新增的阴影、圆角、转换功能等，实现页面元素的编写。为适配各移动端设备，采用CSS3的媒体查询技术，实际适配不同移动端设备。添加JavaScript方法实现页面元素大小同步设备缩放。" +
          "除此之外，本人也有编写其他网站静态页面，同样采用CSS3技术，只是功能未完善。"
    },
	{
        id: "3", duty: "该项目采用的是B/S方式展示信息，所以页面框架基本以HTML+CSS为主，部分需要动态显示的数据信息，采用JavaScript+jQuery，着重使用ajax方法显示页面数据，加快页面加载速度，提升用户体验。" +
          "检测网站的浏览器兼容性问题及网站安全问题，添加cs shack及JavaScript方法，防止SQL盲注和跨站点脚本编制的WEB安全问题。"
    },
    { id: "4", duty: "本人主要负责前端页面信息的展示，以及后端读取新闻信息的方法。页面上采用CSS3动画技术，实时展示所需的信息数据，运用JavaScript+jQuery技术，灵活方便的切换信息。" }
    ,
    { id: "5", duty: "静态网站均是本人独自开发，采用的技术都是B/S+HTML+CSS3+JavaScript实现的，展示所属公司的基本信息，宣传公司的宗旨，理念和产品，提升公司的知名度。" },
    { id: "6", duty: "根据用户需求对网站进行升级维护。" }
];

var resultList = [
    {
        id: "1", result: "贵州福彩官网及后台管理系统于2016年3月初正式更新上线，相较于之前的旧版网站，提升了页面的可读性，及页面排版的舒适性。修改页面数据加载方式，提升了网站的加载速率，优化了用户体验。后期维护升级，添加了福彩视频，投注模拟器等新功能板块，网站访问量日益提升10%。" +
                 "后台管理系统能及时更新新闻资讯，方便快捷展示最新动态。网站地址：<a href='http://www.gzfucai.cn'>贵州福彩官网</a>。"
    }, 
    { id: "2", result: "网站整体运行流畅，部分地方并未完善，有待改进。网站地址：<a href='https://fangdong27.github.io/H5GameDemo/'>H5小游戏-脑力风暴</a>" },
	{
        id: "3", result: "吉林福彩官网及后台管理系统于2016年10月底正式更新上线，相较于之前的旧版网站，提升了页面的可读性，及页面排版的舒适性。修改页面数据加载方式，提升了网站的加载速率，优化了用户体验。后期维护升级，添加了大奖汇总，滚动切换最新新闻动态，投注模拟器，中心服务可申请投注站等新功能板块，极大的提升了便利性，网站访问量日益提升。" +
                 "后台管理系统能及时更新新闻资讯，方便快捷展示最新动态。网站地址：<a href='http://www.jlfc.com.cn'>吉林福彩官网</a>。"
    },
    { id: "4", result: "网站地址：<a href='http://www.jxfczx.cn/SpecialSubject/30years/30Anniversary.aspx'>中国福彩官网发行30周年庆</a>" },
    { id: "5", result: "<a href='http://www.zunxinwl.com/'>深圳市尊信网络科技有限公司</a>，<a href='http://183.239.137.70:11102/'>深圳市思乐数据技术有限公司</a>" },
    { id: "6", result: "<a href='http://www.lnlotto.com/'>辽宁福彩中心官网</a>，<a href='http://www.tjflcpw.com/'>天津福彩中心官网</a>，<a href='http://www.jxfczx.cn/'>江西福彩中心官网</a>" }
];

//加载下一项
function showNextPro() {
    //$("#proCont").removeAttr("class");
    var currentProNum = $("#proNum").val();
    currentProNum = parseInt(currentProNum);

    if (currentProNum <= proNameList.length) {
        currentProNum++;
    }
    if (currentProNum > 1) {
        $("#prePro").css("display", "inline-block");
    }
    if (currentProNum == proNameList.length) {
        $("#nextPro").hide();
    }
    $("#proCont").attr("class", "animationFlipNext");
    document.getElementById("proCont").addEventListener("animationend", function () { //动画结束时事件 
        document.getElementById("proCont").removeAttribute("class");
    }, false);
    for (var j = 0; j < proNameList.length ; j++) {
        if (currentProNum == proNameList[j].id) {
            $("#proName").html(proNameList[j].name);
        }
    }
    for (var j = 0; j < proList.length; j++) {
        if (currentProNum == proList[j].id) {
            $("#proIntro").html(proList[j].intro);
        }
    }
    for (var j = 0; j < dutyList.length; j++) {
        if (currentProNum == dutyList[j].id) {
            $("#personDuty").html(dutyList[j].duty);
        }
    }
    for (var j = 0; j < resultList.length; j++) {
        if (currentProNum == resultList[j].id) {
            $("#proResult").html(resultList[j].result);
        }
    }

    $("#proNum").val(currentProNum);
    
}

//加载上一项
function showPrePro() {
    var currentProNum = $("#proNum").val();
    currentProNum = parseInt(currentProNum);

    if (currentProNum <= proNameList.length && currentProNum >= 2) {
        currentProNum--;
    }
    if (currentProNum >= 1) {
        $("#nextPro").css("display", "inline-block");
    }
    if (currentProNum <= 1) {
        //$("#nextPro").css("display", "inline-block");
        $("#prePro").hide();
    }
    if (currentProNum == proNameList.length) {
        $("#nextPro").hide();
    }
    $("#proCont").attr("class", "animationFlipPre");
    document.getElementById("proCont").addEventListener("animationend", function () { //动画结束时事件 
        document.getElementById("proCont").removeAttribute("class");
    }, false);
    for (var j = proNameList.length - 1; j >= 0 ; j--) {
        if (currentProNum == proNameList[j].id) {
            $("#proName").html(proNameList[j].name);
        }
    }
    for (var j = proList.length - 1; j >= 0; j--) {
        if (currentProNum == proList[j].id) {
            $("#proIntro").html(proList[j].intro);
        }
    }
    for (var j = dutyList.length - 1; j >= 0; j--) {
        if (currentProNum == dutyList[j].id) {
            $("#personDuty").html(dutyList[j].duty);
        }
    }
    for (var j = resultList.length - 1; j >= 0; j--) {
        if (currentProNum == resultList[j].id) {
            $("#proResult").html(resultList[j].result);
        }
    }
    $("#proNum").val(currentProNum);
    
}

function P_showInfoPanel() {
    P_closeBasicInfo('pContactInfo');
    var hideBg = document.getElementById("hideBg");
    hideBg.style.display = "block";
    hideBg.style.height = document.body.clientHeight;
    //alert(document.body.clientHeight);
    var leftNav = document.getElementById("left");
    leftNav.style.display = "inline-block";
    var mainH = document.getElementById("main").clientHeight;
    document.getElementById("listMenu").style.display = "table-cell";
    document.getElementById("pImg").style.display = "none";
    
    ModalHelper("modal-open").afterOpenFixed();
    $("#hideBg").attr('onclick', 'P_closeInfoPanel()');
}

function P_closeInfoPanel() {
    var leftNav = document.getElementById("left");
    leftNav.style.display = "none";
    var hideBg = document.getElementById("hideBg");
    hideBg.style.display = "none";
    document.getElementById("listMenu").style.display = "none";
    document.getElementById("pImg").style.display = "inline-block";
    ModalHelper("modal-open").beforeClose();
    $("#hideBg").removeAttr('onclick');
}

//弹出遮罩层，固定背景不能滚动
function ModalHelper(bodyCls) {
    var sTop;
    return {
        afterOpen: function () {
            sTop = document.scrollingElement.scrollTop;
            //console.log(document.scrollingElement.scrollTop);
            document.body.classList.add(bodyCls);
            document.body.style.top = -sTop + 'px';
        },
        beforeClose: function () {
            document.body.classList.remove(bodyCls);
            //scrollTop lost after set position:fixed, restore it back.
            document.scrollingElement.scrollTop = sTop;
        },
        afterOpenFixed: function () {
            document.body.classList.add(bodyCls);
            document.scrollingElement.scrollTop = sTop;
        }
    };
};

//显示信息块，添加遮罩层
function P_showBasicInfo(str) {
    //var headerH = document.getElementById("header").offsetHeight;
    var hideBg = document.getElementById("hideBg");
    hideBg.style.display = "block";
    hideBg.style.height = document.body.clientHeight + "px";
    //hideBg.style.marginTop = headerH + "px";
    var showContainer = document.getElementById(str);
    showContainer.style.display = "block";
    //设置背景固定，不能滚动，且当前位置固定。
    ModalHelper('modal-open').afterOpenFixed();
    $("#hideBg").attr('onclick', "P_closeBasicInfo('" + str + "')");
}

//关闭信息块
function P_closeBasicInfo(str) {
    var hideBg = document.getElementById("hideBg");
    hideBg.style.display = "none";
    var showContainer = document.getElementById(str);
    showContainer.style.display = "none";
    //设置背景固定，不能滚动，且当前位置固定。
    ModalHelper('modal-open').beforeClose();
    $("#hideBg").removeAttr('onclick');
}
