/* 手机侧边栏默认不展开 */
var mobile_sidebar_menus = document.getElementById("sidebar-menus");
if (mobile_sidebar_menus) {
    var menus_item_child = mobile_sidebar_menus.getElementsByClassName(
        "menus_item_child"
    );
    var menus_expand = mobile_sidebar_menus.getElementsByClassName("expand");
    for (var i = 0; i < menus_item_child.length; i++) {
        menus_item_child[i].style.display = "none";
    }
}

/** 监控调试事件 */
document.onkeydown = function (e) {
    if (e.keyCode === 123 || "F12" == e.code || (e.ctrlKey && e.shiftKey && ("KeyI" === e.code || "KeyJ" === e.code || "KeyC" === e.code)) || (e.ctrlKey && "KeyU" === e.code)) return btf.snackbarShow("本站装有监控，禁止非法调试！"), event.keyCode = 0, event.returnValue = !1, !1
};

/** 监听copy事件 */
document.addEventListener("copy", function (e) {
    //复制的内容
    btf.snackbarShow('复制成功，请遵循GPL协议', false, 3000)
})