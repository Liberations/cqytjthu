
auto()
setScreenMetrics(720, 1280);
//安卓版本高于Android 9
if (device.sdkInt > 28) {
    //等待截屏权限申请并同意
    threads.start(function () {
        packageName('com.android.systemui').text('立即开始').waitFor();
        text('立即开始').click();
    });
}
//申请截屏权限
if (!requestScreenCapture()) {
    toast("请求截图失败");
    exit()
}
//杂货铺收取间隔（分钟）
shopSleepTime = 1
let endButton = images.read("终点.png")
log("测试滑块" + testFun())
function main() {
    log("开始运行")
    sleep(1000)
    while (true) {
        findTap()
        sleep(shopSleepTime * 60 * 1000)
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
    click(668, 353)
    sleep(800)
    //点击一键领取
    click(538, 1169)
    sleep(800)
    //点击全部接取
    click(396, 1169)
    sleep(2000)
    //狗币滑块解锁破解
    let 有滑块 = testFun()
    if (有滑块) {
        log("找到滑动解锁")
        //点击一键领取
        click(538, 1169)
        sleep(800)
        //点击全部接取
        click(396, 1169)
        sleep(800)
        //点击左下角返回
        click(685, 1230)
        sleep(800)
        return
    }
    //点击左下角返回
    click(685, 1230)
    sleep(800)
    //点击总揽
    click(670, 169)
    sleep(800)
    //点击一键收取
    click(360, 999)
    sleep(800)
    //点击销售
    click(286, 1110)
    sleep(800)
    //点击补货
    //click(216, 975)
    //sleep(800)
    //点击补货确定
    //click(511, 999)
    //sleep(800)
    //点击销售一键收取
    click(526, 971)
    sleep(800)
    //点击外围
    click(23, 1234)
    sleep(800)


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
    sailCount = 0
    stopAllEngines()
    threads.shutDownAll()
    toastLog("已停止");
    hideMenu()
});

function testFun() {
    let 测试滑块 = images.captureScreen()

    let pos2 = images.findImage(测试滑块, endButton, {
        "similar": 0.6
    })

    if (pos2) {
        log("找到滑动解锁")
        swipe(121, 717, pos2.x + endButton.width / 2, 717, 2000)
        sleep(2000)
        return true
    }

    return false
}

//保持脚本运行
setInterval(() => { }, 5000);