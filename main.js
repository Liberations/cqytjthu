//安卓版本高于Android 9
log("我的引擎" + engines.myEngine())
engines.all().forEach(item => {
    if (item.id != engines.myEngine().id) {
        log("停止引擎" + item)
        item.forceStop()
    }

})
var storage = storages.create("touhu");
var testCount = storage.get("testCount", 0)
var lastY1 = storage.get("lastY1", device.height * 0.6)
var lastY2 = storage.get("lastY2", device.height * 0.65)
var lineWidth = storage.get("lineWidth", device.width) //刻度线宽度
var w1TouchAble = false
var w2TouchAble = false
var w1X = 0
var w2X = device.width - lineWidth
var wy1 = lastY1;
var wy2 = lastY2;
testCount++
var date = +new Date()
let threeDay = 259200000
let outDate = date + threeDay
//outDate = 10080
log(outDate)
if (date > outDate) {
    alert("感谢体验！请联系qq 910689331购买永久版本")
    exit()
} else {
    storage.put("testCount", testCount)
}

if (!floaty.checkPermission()) {
    // 没有悬浮窗权限，提示用户并跳转请求
    toast(
        "本脚本需要悬浮窗权限来显示悬浮窗，请在随后的界面中允许并重新运行本脚本。",
    );
    floaty.requestPermission();
    exit();
} else {
    //2430 2350
    toastLog("已有悬浮窗权限");

    w1 = floaty.rawWindow(
        <horizontal gravity="center">
            <frame width="50" height="2" bg="#ff0000" id="滑块1" layout_centerInParent="true" />
            <frame layout_weight="1" height="2" id="刻度1" bg="#ff0000" layout_centerInParent="true" />
        </horizontal>,
    );

    w2 = floaty.rawWindow(
        <horizontal gravity="center" >
            <frame layout_weight="1" height="2" id="刻度2" bg="#00ff00" layout_centerInParent="true" />
            <frame width="50" height="2" bg="#00ff00" id="滑块2" />
        </horizontal>,
    );

    resetWindow()
    w1.滑块1.setOnTouchListener(function(view, event) {
        if (!w1TouchAble) return true;
        switch (event.getAction()) {
            case event.ACTION_DOWN:
                Y1 = event.getRawY();
                return true;
            case event.ACTION_MOVE:
                y1 = event.getRawY() - Y1;
                lastY1 = wy1 + y1
                resetWindow()
                return true;
            case event.ACTION_UP:
                wy1 += y1;
                return true;
        }
        return true;
    });

    w2.滑块2.setOnTouchListener(function(view, event) {
        if (!w2TouchAble) return true;
        switch (event.getAction()) {
            case event.ACTION_DOWN:
                Y2 = event.getRawY();
                return true;
            case event.ACTION_MOVE:
                y2 = event.getRawY() - Y2;
                lastY2 = wy2 + y2
                resetWindow()
                return true;
            case event.ACTION_UP:
                wy2 += y2;
                return true;
        }
        return true;
    });

    var menuWindow = floaty.rawWindow(
        <vertical height="500">
            <button  style="Widget.AppCompat.Button.Colored" text="帮助说明" height="45" id="帮助说明"/>
            <linear gravity="center">
                <button style="Widget.AppCompat.Button.Colored" layout_weight="1" height="45" text="重置" id="重置" >
                </button>
                <button style="Widget.AppCompat.Button.Colored" layout_weight="1" height="45" text="调整" id="调整" >
                </button>
                <button style="Widget.AppCompat.Button.Colored" layout_weight="1" height="45" text="保存" id="保存">
                </button>
                <button style="Widget.AppCompat.Button.Colored" layout_weight="1" height="45" text="结束" id="结束">
                </button>
            </linear>
            
        </vertical>

    );

    menuWindow.setSize(device.width, 500)
    //第二个点位调整也就是8/10的位置
    menuWindow.setPosition(0, 500);
    menuWindow.重置.on("click", () => {
        storage.put("lastY1", device.height * 0.6)
        storage.put("lastY2", device.height * 0.65)
        lastY1 = device.height * 0.6
        lastY2 = device.height * 0.65
        w1TouchAble = false;
        w2TouchAble = false;
        log("lastY1 " + 2430)
        log("lastY2 " + 2350)
        resetWindow()

    })

    menuWindow.调整.on("click", () => {
        w1TouchAble = true;
        w2TouchAble = true;
        w1.滑块1.attr('height', 100)
        w2.滑块2.attr('height', 100)
        toast("请移动红绿滑块到最佳位置然后点击保存")
        resetWindow()
    })
    menuWindow.保存.on("click", () => {
        w1TouchAble = false;
        w2TouchAble = false;
        w1.滑块1.attr('height', 2)
        w2.滑块2.attr('height', 2)
        storage.put("lastY1", lastY1)
        storage.put("lastY2", lastY2)
        resetWindow()
    })

    menuWindow.结束.on("click", () => {
        engines.myEngine().forceStop()
        toast("感谢使用")
    })

    menuWindow.帮助说明.on("click", () => {
        alert("需要悬浮窗权限！ 先点击 调整 然后移动滑块到合适的位置作为投壶的参考线 然后点击 保存 即可");
    })
}

function resetWindow() {
    ui.run(function() {
        w1.setTouchable(w1TouchAble)
        w2.setTouchable(w2TouchAble)
        w1.setSize(w1TouchAble ? lineWidth + 40 : lineWidth, 100)
        w1.setPosition(w1X, lastY1)

        w2.setSize(w2TouchAble ? lineWidth + 40 : lineWidth, 100)
        w2.setPosition(w2X, lastY2)

        storage.put("lastY1", lastY1)
        storage.put("lastY2", lastY2)
    });

}
setInterval(() => {

}, 1000);