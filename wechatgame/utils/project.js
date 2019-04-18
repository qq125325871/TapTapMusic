window.__require = function e(t, n, o) {
    function c(r, i) {
        if (!n[r]) {
            if (!t[r]) {
                var p = r.split("/");
                if (p = p[p.length - 1], !t[p]) {
                    var s = "function" == typeof __require && __require;
                    if (!i && s) return s(p, !0);
                    if (a) return a(p, !0);
                    throw new Error("Cannot find module '" + r + "'")
                }
            }
            var l = n[r] = {exports: {}};
            t[r][0].call(l.exports, function (e) {
                return c(t[r][1][e] || e)
            }, l, l.exports, e, t, n, o)
        }
        return n[r].exports
    }

    for (var a = "function" == typeof __require && __require, r = 0; r < o.length; r++) c(o[r]);
    return c
}({
    GMLaunch: [function (e, t, n) {
        "use strict";
        cc._RF.push(t, "9591eR7+tlNhKDGp8RmQWwn", "GMLaunch"), Object.defineProperty(n, "__esModule", {value: !0});
        var o = cc._decorator, c = o.ccclass, a = (o.property, function (e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }

            return __extends(t, e), t.prototype.start = function () {
                window.wx && wx.showLoading && wx.showLoading({
                    title: "\u52a0\u8f7d\u4e2d",
                    mask: false
                }), wxHelper.getConfig()
            }, t = __decorate([c], t)
        }(cc.Component));
        n.default = a, cc._RF.pop()
    }, {}], endAds: [function (e, t, n) {
        "use strict";
        cc._RF.push(t, "f47dcuUy9lHGaLsuEzw4GUa", "endAds"), Object.defineProperty(n, "__esModule", {value: !0});
        var o = cc._decorator, c = o.ccclass, a = o.property, r = function (e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.nodeContent = null, t.pfbGameItem = null, t.wgtMask = null, t
            }

            return __extends(t, e), t.prototype.onLoad = function () {
                this.node.scale = .8, this.wgtMask.target = cc.director.getScene().getComponentInChildren(cc.Canvas).node, this.wgtMask.left = this.wgtMask.right = this.wgtMask.top = this.wgtMask.bottom = 0, this.wgtMask.updateAlignment(), this.node.scale = Math.min(cc.winSize.width / 720, cc.winSize.height / 1280)
            }, t.prototype.updateWithData = function (e) {
                for (var t = this, n = Math.min(e.length, 9), o = 0; o < n; o++) this.addItem(e[o], o);
                this.randomTick(), this.schedule(function () {
                    t.randomTick()
                }, 3)
            }, t.prototype.randomTick = function () {
                for (var e = Math.round(Math.random()) + 1, t = [], n = 0; n < e; n++) t.push(Math.floor(Math.random() * this.nodeContent.childrenCount));
                for (n = 0; n < t.length; n++) this.nodeContent.children[t[n]].runAction(cc.sequence(cc.sequence(cc.rotateTo(.1, 15), cc.rotateTo(.1, -15)).repeat(6), cc.rotateTo(.2, 0)))
            }, t.prototype.addItem = function (e, t) {
                var n = cc.instantiate(this.pfbGameItem);
                n.removeComponent(cc.Widget);
                var o = n.getChildByName("lblName");
                n.scale = 1.5, o.color = cc.Color.BLACK, o.getComponent(cc.Label).string = e.name.substr(0, 5), n.x = t % 3 * 231 - 234, n.y = 286 - 244 * Math.floor(t / 3), n.parent = this.nodeContent, cc.loader.load({
                    url: e.imgUrl,
                    type: "png"
                }, function (e, t) {
                    e || (n.getChildByName("icon").getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(t))
                }), n.on(cc.Node.EventType.TOUCH_END, function () {
                    wx.navigateToMiniProgram && wx.navigateToMiniProgram({
                        appId: e.appid,
                        path: e.path,
                        success: function () {
                            console.log("\u8df3\u8f6c\u5c0f\u7a0b\u5e8f\u6210\u529f");
                            var t = {};
                            t[wxHelper.gameConfig.appname] = e.name, wx.aldSendEvent && (wx.aldSendEvent("\u4fa7\u9762\u5165\u53e3\u5bfc\u91cf", t), wx.aldSendEvent(wxHelper.gameConfig.appname, e.name), wx.aldSendEvent(e.name, wxHelper.gameConfig.appname))
                        },
                        complete: function (e) {
                            console.log("\u8df3\u8f6c\u5c0f\u7a0b\u5e8f", e)
                        }
                    })
                })
            }, t.prototype.onDestroy = function () {
                this.onClose && this.onClose()
            }, t.prototype.onClickClose = function () {
                this.node.destroy()
            }, t.prototype.onClickMoreGame = function () {
                wxHelper._config && wx.navigateToMiniProgram && wx.navigateToMiniProgram({
                    appId: wxHelper._config.boxid,
                    path: wxHelper._config.boxpath,
                    success: function () {
                        console.log("\u8df3\u8f6c\u5c0f\u7a0b\u5e8f\u6210\u529f");
                        var e = {};
                        e[wxHelper.gameConfig.appname] = "\u76d2\u5b50", wx.aldSendEvent && wx.aldSendEvent("\u8df3\u8f6c\u76d2\u5b50", e)
                    },
                    complete: function (e) {
                        console.log("\u8df3\u8f6c\u5c0f\u7a0b\u5e8f", e)
                    }
                })
            }, __decorate([a(cc.Node)], t.prototype, "nodeContent", void 0), __decorate([a(cc.Prefab)], t.prototype, "pfbGameItem", void 0), __decorate([a(cc.Widget)], t.prototype, "wgtMask", void 0), t = __decorate([c], t)
        }(cc.Component);
        n.default = r, cc._RF.pop()
    }, {}], gameBox: [function (e, t, n) {
        "use strict";
        cc._RF.push(t, "ff418xe6tBJFoBhhF5qaesC", "gameBox"), Object.defineProperty(n, "__esModule", {value: !0});
        var o = cc._decorator, c = o.ccclass, a = o.property, r = function (e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.pfbBoxItem = null, t.nodeContent = null, t
            }

            return __extends(t, e), t.prototype.start = function () {
                this.updateWithData(wxHelper._config.list)
            }, t.prototype.updateWithData = function (e) {
                for (var t = Math.min(e.length, 9), n = 0; n < t; n++) this.addItem(e[n], n)
            }, t.prototype.addItem = function (e, t) {
                var n = cc.instantiate(this.pfbBoxItem);
                n.removeComponent(cc.Widget), n.getChildByName("lblName").getComponent(cc.Label).string = e.name, n.getChildByName("lblAccount").getComponent(cc.Label).string = e.account, n.getChildByName("lblContent").getComponent(cc.Label).string = e.introduce.substr(0, 20) + (e.introduce.length > 20 ? ".." : ""), n.parent = this.nodeContent, cc.loader.load({
                    url: e.imgUrl,
                    type: "png"
                }, function (e, t) {
                    e || (n.getChildByName("itemIcon").getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(t))
                }), n.on(cc.Node.EventType.TOUCH_END, function () {
                    wx.navigateToMiniProgram && wx.navigateToMiniProgram({
                        appId: e.appid,
                        path: e.path,
                        success: function () {
                            console.log("\u8df3\u8f6c\u5c0f\u7a0b\u5e8f\u6210\u529f");
                            var t = {};
                            t[wxHelper.gameConfig.appname] = e.name, console.log("\u8df3\u8f6c\u5c0f\u7a0b\u5e8f\u6210\u529f--\x3e", t), wx.aldSendEvent && (wx.aldSendEvent("gameBox\u5bfc\u91cf", t), wx.aldSendEvent(wxHelper.gameConfig.appname, e.name), wx.aldSendEvent(e.name, wxHelper.gameConfig.appname))
                        },
                        complete: function (e) {
                            console.log("\u8df3\u8f6c\u5c0f\u7a0b\u5e8f", e)
                        }
                    })
                })
            }, __decorate([a(cc.Prefab)], t.prototype, "pfbBoxItem", void 0), __decorate([a(cc.Node)], t.prototype, "nodeContent", void 0), t = __decorate([c], t)
        }(cc.Component);
        n.default = r, cc._RF.pop()
    }, {}], gamesPanel: [function (e, t, n) {
        "use strict";
        cc._RF.push(t, "7e844dn0YZL0LbP+vNAFhMl", "gamesPanel"), Object.defineProperty(n, "__esModule", {value: !0});
        var o = cc._decorator, c = o.ccclass, a = o.property, r = function (e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.nodeContent = null, t.pfbGameItem = null, t
            }

            return __extends(t, e), t.prototype.updateWithData = function (e) {
                for (var t = this, n = 0; n < e.length; n++) this.addItem(e[n], n);
                this.randomTick(), this.schedule(function () {
                    t.randomTick()
                }, 3)
            }, t.prototype.randomTick = function () {
                for (var e = Math.round(Math.random()) + 1, t = [], n = 0; n < e; n++) t.push(Math.floor(Math.random() * this.nodeContent.childrenCount));
                for (n = 0; n < t.length; n++) this.nodeContent.children[t[n]].runAction(cc.sequence(cc.sequence(cc.rotateTo(.1, 15), cc.rotateTo(.1, -15)).repeat(6), cc.rotateTo(.2, 0)))
            }, t.prototype.addItem = function (e, t) {
                var n = cc.instantiate(this.pfbGameItem);
                n.removeComponent(cc.Widget);
                var o = n.getChildByName("lblName");
                o.color = cc.Color.BLACK, o.getComponent(cc.Label).string = e.name.substr(0, 5), n.scale = .9, n.x = t % 2 ? -80 : 80, n.y = this.nodeContent.height / 2 - 150 * Math.floor(t / 2) - n.width / 2 - 20, n.parent = this.nodeContent, cc.loader.load({
                    url: e.imgUrl,
                    type: "png"
                }, function (e, t) {
                    e || (n.getChildByName("icon").getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(t))
                }), n.on(cc.Node.EventType.TOUCH_END, function () {
                    wx.navigateToMiniProgram && wx.navigateToMiniProgram({
                        appId: e.appid,
                        path: e.path,
                        success: function () {
                            console.log("\u8df3\u8f6c\u5c0f\u7a0b\u5e8f\u6210\u529f");
                            var t = {};
                            t[wxHelper.gameConfig.appname] = e.name, wx.aldSendEvent && (wx.aldSendEvent("\u4fa7\u9762\u5165\u53e3\u5bfc\u91cf", t), wx.aldSendEvent(wxHelper.gameConfig.appname, e.name), wx.aldSendEvent(e.name, wxHelper.gameConfig.appname))
                        },
                        complete: function (e) {
                            console.log("\u8df3\u8f6c\u5c0f\u7a0b\u5e8f", e)
                        }
                    })
                })
            }, t.prototype.onClickClose = function () {
                var e = this;
                this.node.runAction(cc.sequence(cc.moveBy(.3, -this.nodeContent.width - 70, 0), cc.callFunc(function () {
                    e.node.active = !1
                })))
            }, __decorate([a(cc.Node)], t.prototype, "nodeContent", void 0), __decorate([a(cc.Prefab)], t.prototype, "pfbGameItem", void 0), t = __decorate([c], t)
        }(cc.Component);
        n.default = r, cc._RF.pop()
    }, {}], gmMore: [function (e, t, n) {
        "use strict";
        cc._RF.push(t, "346fdfNXWhEj4AUf9OrIPLH", "gmMore"), Object.defineProperty(n, "__esModule", {value: !0});
        var o = cc._decorator, c = o.ccclass, a = (o.property, function (e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }

            return __extends(t, e), t.prototype.onClick = function () {
                sceneManager.showLeftGameList && sceneManager.showLeftGameList(this.node.parent)
            }, t.prototype.onEnable = function () {
                this.node.runAction(cc.sequence(cc.sequence(cc.rotateTo(.2, 10), cc.rotateTo(.2, -10)).repeat(3), cc.rotateTo(.1, 0), cc.delayTime(.5)).repeatForever())
            }, t.prototype.onDisable = function () {
                this.node.stopAllActions()
            }, t = __decorate([c], t)
        }(cc.Component));
        n.default = a, cc._RF.pop()
    }, {}], moreGameList: [function (e, t, n) {
        "use strict";
        cc._RF.push(t, "a7bf2nWZPVF85vYMQbxZbeN", "moreGameList"), Object.defineProperty(n, "__esModule", {value: !0});
        var o = cc._decorator, c = o.ccclass, a = o.property, r = function (e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.pfbGameItem = null, t.nodeListContent = null, t._itemWidth = 140, t
            }

            return __extends(t, e), t.prototype.updateWithData = function (e) {
                var t = this;
                this.nodeListContent.width = e.length * this._itemWidth;
                for (var n = 0; n < e.length; n++) this.addItem(e[n]);
                this.randomTick(), this.schedule(function () {
                    t.randomTick()
                }, 3)
            }, t.prototype.randomTick = function () {
                for (var e = Math.round(Math.random()) + 1, t = [], n = 0; n < e; n++) t.push(Math.floor(Math.random() * this.nodeListContent.childrenCount));
                for (n = 0; n < t.length; n++) this.nodeListContent.children[t[n]].runAction(cc.sequence(cc.sequence(cc.rotateTo(.1, 15), cc.rotateTo(.1, -15)).repeat(6), cc.rotateTo(.2, 0)))
            }, t.prototype.addItem = function (e) {
                var t = cc.instantiate(this.pfbGameItem);
                t.parent = this.nodeListContent, cc.loader.load({url: e.imgUrl, type: "png"}, function (e, n) {
                    e || (t.getChildByName("icon").getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(n))
                }), t.getChildByName("lblName").getComponent(cc.Label).string = e.name.substr(0, 5), t.on(cc.Node.EventType.TOUCH_END, function () {
                    wx.navigateToMiniProgram && wx.navigateToMiniProgram({
                        appId: e.appid,
                        path: e.path,
                        success: function () {
                            console.log("\u8df3\u8f6c\u5c0f\u7a0b\u5e8f\u6210\u529f");
                            var t = {};
                            t[wxHelper.gameConfig.appname] = e.name, wx.aldSendEvent && (wx.aldSendEvent("\u66f4\u591a\u6e38\u620f\u5bfc\u91cf", t), wx.aldSendEvent(wxHelper.gameConfig.appname, e.name), wx.aldSendEvent(e.name, wxHelper.gameConfig.appname))
                        },
                        complete: function (e) {
                            console.log("\u8df3\u8f6c\u5c0f\u7a0b\u5e8f", e)
                        }
                    })
                })
            }, __decorate([a(cc.Prefab)], t.prototype, "pfbGameItem", void 0), __decorate([a(cc.Node)], t.prototype, "nodeListContent", void 0), t = __decorate([c], t)
        }(cc.Component);
        n.default = r, cc._RF.pop()
    }, {}], startAd: [function (e, t, n) {
        "use strict";
        cc._RF.push(t, "1d460nfuKtAhYcOSd4HEmq5", "startAd"), Object.defineProperty(n, "__esModule", {value: !0});
        var o = cc._decorator, c = o.ccclass, a = o.property, r = function (e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.icon = null, t.btnStart = null, t.wgtMask = null, t
            }

            return __extends(t, e), t.prototype.start = function () {
                this.btnStart.runAction(cc.sequence(cc.scaleTo(.4, 1.2), cc.scaleTo(.4, 1)).repeatForever()), this.wgtMask.target = cc.director.getScene().getComponentInChildren(cc.Canvas).node, this.wgtMask.left = this.wgtMask.right = this.wgtMask.top = this.wgtMask.bottom = 0, this.wgtMask.updateAlignment(), this.node.scale = Math.min(cc.winSize.width / 720, cc.winSize.height / 1280)
            }, t.prototype.updateWithData = function (e) {
                var t = this, n = this.getParams(e.path);
                if (n && wxHelper._config.left_list) for (var o = 0; o < wxHelper._config.left_list.length; o++) if (wxHelper._config.left_list[o].appid === n) {
                    wxHelper._config.left_list[o];
                    break
                }
                this._config = e, this._config.imgUrl && cc.loader.load({
                    url: this._config.imgUrl,
                    type: "png"
                }, function (e, n) {
                    e || (t.icon.spriteFrame = new cc.SpriteFrame(n))
                })
            }, t.prototype.getParams = function (e) {
                var t = {};
                if (-1 != e.indexOf("?")) for (var n = e.substr(1).split("&"), o = 0; o < n.length; o++) t[n[o].split("=")[0]] = unescape(n[o].split("=")[1]);
                return t
            }, t.prototype.onClickClose = function () {
                this.node.destroy(), sceneManager.showGameEnd()
            }, t.prototype.onClickStartGame = function () {
                var e = this;
                cc.sys.platform === cc.sys.WECHAT_GAME && this._config && wx.navigateToMiniProgram && wx.navigateToMiniProgram({
                    appId: this._config.appid,
                    path: this._config.path,
                    success: function () {
                        console.log("\u8df3\u8f6c\u5c0f\u7a0b\u5e8f\u6210\u529f");
                        var t = {};
                        t[wxHelper.gameConfig.appname] = e._config.name, wx.aldSendEvent && (wx.aldSendEvent("\u9996\u9875\u5bfc\u91cf", t), wx.aldSendEvent(wxHelper.gameConfig.appname, e._config.name), wx.aldSendEvent(e._config.name, wxHelper.gameConfig.appname))
                    },
                    complete: function (e) {
                        console.log("\u8df3\u8f6c\u5c0f\u7a0b\u5e8f", e)
                    }
                })
            }, __decorate([a(cc.Sprite)], t.prototype, "icon", void 0), __decorate([a(cc.Node)], t.prototype, "btnStart", void 0), __decorate([a(cc.Widget)], t.prototype, "wgtMask", void 0), t = __decorate([c], t)
        }(cc.Component);
        n.default = r, cc._RF.pop()
    }, {}]
}, {}, ["GMLaunch", "endAds", "gameBox", "gamesPanel", "gmMore", "moreGameList", "startAd"]);