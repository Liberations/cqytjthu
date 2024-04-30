images.requestScreenCapture(false)
auto()
//首个杂货铺点击位置
shopStartX = 744
shopStartY = 243
//每个方块的宽度
shopWidth = 274
//每个杂货铺的高度
shopHeight = 117
//修改销冠数量
shopCount = 24
shopCol = 4
shopRow = 6
images.captureScreen()
//杂货铺收取间隔（秒）
shopSleepTime = 30
let 测试滑块 = images.read("测试滑块.jpg")
let startButton = images.read("起点.jpg")
let endButton = images.read("终点.jpg")
//testFun()
sailCount = 0
shopPoints = [
    [744, 350],
    [1022, 350],
    [1315, 350],
    [1407, 350],
    [1735, 350], //第1排
    [691, 435],
    [990, 435],
    [1315, 435],
    [1407, 435],
    [1750, 435], //第2排
    [620, 565],
    [956, 565],
    [1303, 565],
    [1456, 565],
    [1790, 565], //第3排
    [630, 697],
    [970, 697],
    [1325, 697],
    [1460, 697],
    [1820, 697], //第4排
    [575, 840],
    [953, 840],
    [1322, 840],
    [1470, 840], //第5排
]

function main() {
    shopRow = Math.ceil(shopCount / shopCol)
    log("杂货铺数量" + shopCount + "行数" + shopRow + "列数" + shopCol)
    log("开始运行")
    sleep(1000)
    while (true) {
        //let find = findConin()
        let date = new Date()
        if (date.getHours() > 7) {
            // shopSleepTime = 2
        }
        findTap()
        sleep(shopSleepTime * 1000)
    }
}

function setLog(text) {
    ui.run(() => {
        if (isOpen) {
            window.toggleButton.setText("收起" + text);
        } else {
            window.toggleButton.setText("展开" + text);
        }
    })

}

function findTap() {
    //点击销冠位置
    click(1963, 208)
    sleep(800)
    //点击全部接取
    click(2060, 708)
    sleep(800)
    //点击一键收取
    click(2060, 925)
    sleep(2000)
    img = images.captureScreen()
    let pos1 = images.findImage(img, startButton, {
        "similar": 0.6
    })
    let pos2 = images.findImage(img, endButton, {
        "similar": 0.6
    })

    //狗币滑块解锁破解
    if (pos1 && pos2) {
        log("找到滑动解锁")
        Swipe(810, 617, pos2.x, 617, 1000)
        sleep(2000)
        //点击全部接取
        click(2060, 708)
        sleep(800)
        //点击一键收取
        click(2060, 925)
        sleep(2000)
        //点击右上角返回
        click(2270, 137)
        sleep(800)
        return
    }
    //点击右上角返回
    click(2270, 137)
    sleep(800)
    sailCount++
    //10分钟上架一次
    if (sailCount % 20 != 1) {
        return
    }
    //点击总览
    click(2244, 200)
    sleep(800)
    //点击一键收取
    click(1160, 912)
    sleep(800)
    //点击销售
    click(1965, 489)
    sleep(800)
    //点击一键补货
    click(955, 936)
    sleep(800)
    //点击确定
    click(1628, 842)
    sleep(800)
    //点击一键收取
    click(1350, 912)
    sleep(800)
    //点击外围
    click(2200, 869)
    var count = 0
    sleep(1000)

    //到后期杂货都有自动补货后以下部分可以删除
    shopPoints.forEach((pos) => {
        let clickX = pos[0]
        let clickY = pos[1]
        log("点击第" + (count + 1) + "杂货铺")
        setLog((count + 1) + "/" + shopCount)
        //点击杂货铺
        click(clickX, clickY)
        sleep(800)
        //点击物品
        click(1496, 865)
        sleep(800)
        //点击上架
        click(1271, 863)
        sleep(800)
        //点击外围
        click(2100, 849)
        sleep(800)
        //点击外围
        click(2100, 849)
        sleep(800)
        count++
        if (count >= shopCount) {
            log("结束收货")
            //点击外围
            click(2100, 849)
            sleep(800)
            //点击外围
            click(2100, 849)
            sleep(800)
            return
        }
    })
   //到后期杂货都有自动补货后以上部分可以删除

}


log("开始辅助")
// 创建悬浮窗
var window = floaty.window(
    <vertical>
        <button id="toggleButton" text="展开" w="auto" h="auto" />
        <vertical id="menu" visibility="gone">
            <button id="startButton" text="开始" w="auto" h="auto" />
            <button id="stopButton" text="结束" w="auto" h="auto" />
        </vertical>
    </vertical>
);
var isOpen = false
// 设置悬浮窗位置
window.setPosition(0, 250);
stopAllEngines()

function stopAllEngines() {
    log("我的引擎" + engines.myEngine())
    engines.all().forEach(item => {
        if (item.id != engines.myEngine().id) {
            log("停止引擎" + item)
            item.forceStop()
        }

    })
}

function hideMenu() {
    isOpen = false
    window.menu.setVisibility(8);
    window.toggleButton.setText("展开");
}

function expandOrHideMenu() {
    isOpen = !isOpen
    if (isOpen) {
        window.menu.setVisibility(0);
        window.toggleButton.setText("收起");
    } else {
        window.menu.setVisibility(8);
        window.toggleButton.setText("展开");
    }
}
// 切换按钮点击事件
window.toggleButton.click(() => {
    expandOrHideMenu()

});

// 开始按钮点击事件
window.startButton.click(() => {
    sailCount = 0
    hideMenu()
    threads.start(function () {
        log("开始")
        main()
    });

});
// 结束按钮点击事件
window.stopButton.click(() => {
    stopAllEngines()
    threads.shutDownAll()
    toastLog("已停止");
    hideMenu()
});

//保持脚本运行
setInterval(() => { }, 5000);

function testFun() {
    测试滑块 = images.captureScreen()
    let pos1 = images.findImage(测试滑块, startButton, {
        "similar": 0.6
    })
    let pos2 = images.findImage(测试滑块, endButton, {
        "similar": 0.6
    })

    if (pos1 && pos2) {
        log("找到滑动解锁")
        Swipe(pos1.x, pos1.y, pos2.x, pos2.y, 1000)
        sleep(2000)
        return
    }
}