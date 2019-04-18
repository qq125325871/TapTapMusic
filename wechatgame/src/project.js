window.__require = function t(e, o, n) {
    function a(s, r) {
        if (!o[s]) {
            if (!e[s]) {
                var c = s.split("/");
                if (c = c[c.length - 1], !e[c]) {
                    var l = "function" == typeof __require && __require;
                    if (!r && l) return l(c, !0);
                    if (i) return i(c, !0);
                    throw new Error("Cannot find module '" + s + "'")
                }
            }
            var d = o[s] = {exports: {}};
            e[s][0].call(d.exports, function (t) {
                return a(e[s][1][t] || t)
            }, d, d.exports, t, e, o, n)
        }
        return o[s].exports
    }

    for (var i = "function" == typeof __require && __require, s = 0; s < n.length; s++) a(n[s]);
    return a
}({
    BigIntUtility: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "7deaawlSfBNFYWCQuuZEBaW", "BigIntUtility"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = function () {
            function t() {
            }

            return t.getUnit = function (t) {
                var e = ["", "K", "M", "B", "T"],
                    o = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
                    n = "";
                if (t < e.length) n = e[t]; else if (t < e.length + 26) {
                    var a = o[t - e.length];
                    n = a.toLowerCase() + a.toLowerCase()
                } else if (t < e.length + 52) {
                    var i = o[t - (e.length + 26)];
                    n = i.toUpperCase() + i.toLowerCase()
                } else if (t < e.length + 78) {
                    var s = o[t - (e.length + 52)];
                    n = s.toUpperCase() + s.toUpperCase()
                }
                return n
            }, t.intToString = function (t, e) {
                var o = "", n = e.length;
                do {
                    o = e[t % n] + o, t = Math.floor(t / n)
                } while (t > 0);
                return o
            }, t.showBigInt = function (e) {
                var o = Math.floor((e.length - 1) / 3), n = t.getUnit(o), a = e.length - 3 * o, i = e.substring(0, a),
                    s = "";
                return o > 0 && (s = e.substr(e.length - 3 * o, 3)), i + ("" != s ? "." + s : "") + ("" != n ? " " + n : "")
            }, t
        }();
        o.default = n, cc._RF.pop()
    }, {}],
    BuyMusicView: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "b6559x+SYhMd5cIQ5R52dr/", "BuyMusicView"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = t("../Controllers/GameControl"), a = t("./CommonUI"), i = t("./StageView"),
            s = t("../Controllers/SoundControl"), r = t("./TipsView"), c = t("Logger"),
            l = t("../Controllers/UIControl"), d = t("../Data/Constants"), u = t("../Controllers/CameraControl"),
            p = cc._decorator, h = p.ccclass, g = p.property, f = function (t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.title = null, e.subtitle = null, e.buyCost = null, e.levelLabel = null, e.buyBtn = null, e.playBtn = null, e.hzNode = [], e.hzMin = 5, e.hzMax = 150, e.hzBase = [10, 20, 30, 20, 30, 25, 50, 60, 40, 30, 20, 10], e.hzRange = [10, 20, 20, 30, 30, 30, 30, 30, 20, 20, 20, 10], e.hzDecrease = -200, e._hzTarget = [], e.beatTime = 0, e.isBeat = !1, e.activeFrame = 5, e.info = null, e.musicTime = 0, e
                }

                var o;
                return __extends(e, t), o = e, e.getInstance = function () {
                    return o.instance
                }, e.prototype.onLoad = function () {
                    null == o.instance ? o.instance = this : o.instance != this && this.destroy()
                }, e.prototype.onEnable = function () {
                    this.isBeat = !1, this.buyBtn.node.active = !1, this.playBtn.node.active = !1
                }, e.prototype.onDisable = function () {
                    s.default.getInstance().stopBGM(), this.info = null
                }, e.prototype.updateBuyInfo = function (t) {
                    this.info = t, this.title.string = t.title;
                    var e = "简单";
                    t.level > 2 && t.level < 7 ? e = "正常" : t.level >= 7 && (e = "困难"), this.subtitle.string = "等级." + t.level + " " + e + " / " + t.subtitle, this.buyCost.string = t.cost, this.title.string.length > 18 ? this.title.node.scaleX = 19 / this.title.string.length : this.title.node.scaleX = 1, this.subtitle.string.length > 28 ? this.subtitle.node.scaleX = 29 / this.subtitle.string.length : this.subtitle.node.scaleX = 1;
                    var o = n.default.getInstance().getFBData();
                    t.cost > o.diamond ? this.buyCost.node.color = cc.color(255, 0, 0, 255) : this.buyCost.node.color = cc.color(255, 255, 255, 255), t.isOpen ? this.playBtn.node.active = !0 : this.buyBtn.node.active = !0;
                    var a = new cc.Component.EventHandler;
                    a.target = this.node, a.component = "BuyMusicView", a.handler = "onTouchBtn", a.customEventData = t.chapterId.toString() + "|" + t.index.toString(), this.buyBtn.clickEvents.pop(), this.buyBtn.clickEvents.push(a), (a = new cc.Component.EventHandler).target = this.node, a.component = "BuyMusicView", a.handler = "onTouchPlay", a.customEventData = t.chapterId.toString() + "|" + t.index.toString(), this.playBtn.clickEvents.pop(), this.playBtn.clickEvents.push(a), this.beatTime = 60 / t.bpm
                }, e.prototype.onTouchBtn = function (t, e) {
                    if ("CancelBtn" == e) this.node.active = !1, this.info = null; else {
                        var o = e.split("|"), s = parseInt(o[0]), l = parseInt(o[1]),
                            d = n.default.getInstance().getFBData();
                        this.info.cost <= d.diamond ? (d.diamond -= this.info.cost, d.chapterInfo[s - 1].state[l - 1] = 1, n.default.getInstance().setFBData(d), i.default.getInstance().updateItem(l), a.default.getInstance().refreshGold(), c.default.analytics("diamond_buymusic", {
                            player_id: FBInstant.player.getID(),
                            stageId: 1e3 * s + l
                        }), this.playBtn.node.active = !0, this.buyBtn.node.active = !1) : r.default.getInstance().showTips("Not enough diamond!")
                    }
                }, e.prototype.onTouchPlay = function (t, e) {
                    if (n.default.getInstance().playerInfo.energy <= 0) r.default.getInstance().showTips("Energy is empty."); else {
                        var o = t.target.parent.convertToWorldSpaceAR(t.target.position);
                        l.default.getInstance().showView("BlockView", !0);
                        var i = e.split("|"), s = parseInt(i[0]), p = parseInt(i[1]);
                        a.default.getInstance().playEnergyEffect(o, function () {
                            l.default.getInstance().showView("BlockView", !1);
                            var t = d.default.getInstance().getPath(s, p), e = d.default.getInstance().getStage(s, p);
                            n.default.getInstance().LoadGameStage(t, s, p, e), u.default.getInstance().setGameBackground(e.frameId), n.default.getInstance().getStageRankData(p, s)
                        }.bind(this)), c.default.analytics("stage_select", {
                            // player_id: FBInstant.player.getID(),
                            stageId: 1e3 * s + p
                        }), n.default.getInstance().consumeEnergy(), this.node.active = !1
                    }
                }, e.prototype.beatHz = function (t) {
                    this.isBeat = !0;
                    for (var e = 0; e < this.hzNode.length; e++) this._hzTarget[e] = this.hzBase[e] + Math.random() * this.hzRange[e] - this.hzNode[e].height, this._hzTarget[e] = this._hzTarget[e] > 0 ? this._hzTarget[e] : 0
                }, e.prototype.decreaseHz = function (t) {
                    for (var e = 0; e < this.hzNode.length; e++) this.isBeat ? this.hzNode[e].height += (5 - this.activeFrame) / 5 * this._hzTarget[e] : this.hzNode[e].height > this.hzMin ? (this.hzNode[e].height += this.hzDecrease * t, this.hzNode[e].height < this.hzMin && (this.hzNode[e].height = this.hzMin)) : this.hzNode[e].height = this.hzMin;
                    this.isBeat && (this.activeFrame--, 0 == this.activeFrame && (this.isBeat = !1, this.activeFrame = 5))
                }, e.prototype.update = function (t) {
                    cc.audioEngine.isMusicPlaying() ? (this.musicTime += t, this.musicTime >= this.beatTime && (this.musicTime -= this.beatTime, this.beatHz(t))) : null != this.info && (s.default.getInstance().playBGMPre(this.info.chapterId, this.info.index), this.musicTime = 0), this.decreaseHz(t)
                }, e.instance = null, __decorate([g(cc.Label)], e.prototype, "title", void 0), __decorate([g(cc.Label)], e.prototype, "subtitle", void 0), __decorate([g(cc.Label)], e.prototype, "buyCost", void 0), __decorate([g(cc.Label)], e.prototype, "levelLabel", void 0), __decorate([g(cc.Button)], e.prototype, "buyBtn", void 0), __decorate([g(cc.Button)], e.prototype, "playBtn", void 0), __decorate([g(cc.Node)], e.prototype, "hzNode", void 0), e = o = __decorate([h], e)
            }(cc.Component);
        o.default = f, cc._RF.pop()
    }, {
        "../Controllers/CameraControl": "CameraControl",
        "../Controllers/GameControl": "GameControl",
        "../Controllers/SoundControl": "SoundControl",
        "../Controllers/UIControl": "UIControl",
        "../Data/Constants": "Constants",
        "./CommonUI": "CommonUI",
        "./StageView": "StageView",
        "./TipsView": "TipsView",
        Logger: "Logger"
    }],
    BuySkinView: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "23e76FbEMtDOrAwqgf8NIt+", "BuySkinView"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = t("../Controllers/GameControl"), a = t("./CommonUI"), i = t("./ShopView"), s = t("./TipsView"),
            r = t("Logger"), c = cc._decorator, l = c.ccclass, d = c.property, u = function (t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.buyCost = null, e.buyBtn = null, e.iconSprite = null, e.info = null, e
                }

                var o;
                return __extends(e, t), o = e, e.getInstance = function () {
                    return o.instance
                }, e.prototype.onLoad = function () {
                    null == o.instance ? o.instance = this : o.instance != this && this.destroy()
                }, e.prototype.updateBuyInfo = function (t) {
                    this.info = t, this.iconSprite.spriteFrame = t.spriteFrame, this.buyCost.string = t.cost;
                    var e = n.default.getInstance().getFBData();
                    t.cost > e.diamond ? this.buyCost.node.color = cc.color(255, 0, 0, 255) : this.buyCost.node.color = cc.color(255, 255, 255, 255);
                    var o = new cc.Component.EventHandler;
                    o.target = this.node, o.component = "BuySkinView", o.handler = "onTouchBtn", o.customEventData = t.id.toString(), this.buyBtn.clickEvents.pop(), this.buyBtn.clickEvents.push(o)
                }, e.prototype.onTouchBtn = function (t, e) {
                    if ("CancelBtn" == e) this.node.active = !1; else {
                        console.log("buy index", e);
                        var o = parseInt(e), c = n.default.getInstance().getFBData();
                        this.info.cost <= c.diamond ? (this.node.active = !1, c.diamond -= this.info.cost, c.skinId = o - 1, c.skinInfo[o - 1] = 1, n.default.getInstance().setFBData(c), i.default.getInstance().refreshUIState(), i.default.getInstance().refreshShopGold(), null != a.default.getInstance() && a.default.getInstance().refreshGold(), r.default.analytics("diamond_buyskin", {
                            player_id: FBInstant.player.getID(),
                            skinId: o
                        })) : s.default.getInstance().showTips("Not enough diamond!")
                    }
                }, e.instance = null, __decorate([d(cc.Label)], e.prototype, "buyCost", void 0), __decorate([d(cc.Button)], e.prototype, "buyBtn", void 0), __decorate([d(cc.Sprite)], e.prototype, "iconSprite", void 0), e = o = __decorate([l], e)
            }(cc.Component);
        o.default = u, cc._RF.pop()
    }, {
        "../Controllers/GameControl": "GameControl",
        "./CommonUI": "CommonUI",
        "./ShopView": "ShopView",
        "./TipsView": "TipsView",
        Logger: "Logger"
    }],
    CSDictionary: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "10081LIm6lKuYFZF3mam0IA", "CSDictionary"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = t("../Logger/Logger"), a = function () {
            function t() {
                this.keys = [], this.values = []
            }

            return t.prototype.Add = function (t, e) {
                this.ContainsKey(t) ? n.default.warn("Already contain key:" + t) : (this.keys.push(t), this.values.push(e))
            }, t.prototype.Remove = function (t) {
                var e = this.keys.indexOf(t, 0);
                return -1 != e ? (this.keys.splice(e, 0), this.values.splice(e, 0), !0) : (n.default.warn("can't find key:" + t), !1)
            }, t.prototype.clear = function () {
                this.keys.splice(0, this.keys.length), this.values.splice(0, this.values.length)
            }, t.prototype.TryGetValue = function (t) {
                var e = this.keys.indexOf(t, 0);
                return -1 != e ? this.values[e] : null
            }, t.prototype.ContainsKey = function (t) {
                return -1 != this.keys.indexOf(t)
            }, t.prototype.SetDicValue = function (t, e) {
                var o = this.keys.indexOf(t, 0);
                return -1 != o ? (this.keys[o] = t, this.values[o] = e, !0) : (n.default.warn("can't find key:" + t), !1)
            }, t.prototype.GetKeys = function () {
                return this.keys
            }, t.prototype.GetValues = function () {
                return this.values
            }, t
        }();
        o.default = a, cc._RF.pop()
    }, {"../Logger/Logger": "Logger"}],
    CameraControl: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "1e1d0vR6D9DG4WBSdjebV6k", "CameraControl"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = cc._decorator, a = n.ccclass, i = n.property, s = function (t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.target = null, e.gameCamera = null, e.uiCamera = null, e.testNode = null, e.isTraceing = !1, e.zoomTime = 0, e.zoomFlag = !1, e.bgColor = [cc.color(129, 129, 129, 255), cc.color(34, 197, 255, 255), cc.color(255, 69, 132, 255), cc.color(127, 209, 85, 255), cc.color(255, 96, 56, 255), cc.color(219, 59, 247, 255), cc.color(65, 147, 237, 255), cc.color(248, 154, 190, 255), cc.color(255, 176, 63, 255), cc.color(24, 51, 96, 255), cc.color(0, 176, 176, 255)], e.defaultColor = cc.color(41, 182, 248, 255), e
            }

            var o;
            return __extends(e, t), o = e, e.getInstance = function () {
                return o.instance
            }, e.prototype.onLoad = function () {
                if (null == o.instance ? o.instance = this : o.instance != this && this.destroy(), this.orginPos = this.node.position, cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_LINUX || cc.sys.os == cc.sys.OS_IOS) {
                    var t = cc.view.getFrameSize();
                    if (t.height / t.width > 1.775) {
                        var e = (800 * t.height / t.width - 1420) / 2;
                        this.uiCamera.node.y -= e, this.gameCamera.node.y -= e
                    }
                }
            }, e.prototype.focusOnPlayer = function () {
                if (this.target && !this.isTraceing) {
                    var t = cc.follow(this.target, cc.rect(0, 0, 0, 0));
                    this.node.runAction(t), this.isTraceing = !0
                }
            }, e.prototype.stopFocusOnPlayer = function () {
                this.node.stopAllActions(), this.isTraceing = !1, this.node.position = this.orginPos
            }, e.prototype.resetGameCamera = function () {
                this.gameCamera.node.stopAllActions(), this.gameCamera.node.rotation = 0, this.zoomFlag = !1, this.gameCamera.zoomRatio = 1, this.zoomTime = 0
            }, e.prototype.getColorById = function (t) {
                return this.bgColor[t]
            }, e.prototype.setGameBackground = function (t) {
                this.gameCamera.backgroundColor = t >= 0 ? this.bgColor[t] : this.defaultColor
            }, e.prototype.getGameBackgroundColor = function () {
                return this.gameCamera.backgroundColor
            }, e.prototype.failedZoom = function () {
                this.testNode.stopAllActions(), this.testNode.x = 0, this.testNode.runAction(cc.moveTo(.7, cc.p(.5, 0)).easing(cc.easeCubicActionOut())), this.zoomFlag = !0
            }, e.prototype.reviveZoom = function () {
                this.testNode.stopAllActions(), this.testNode.x = -.5, this.testNode.runAction(cc.moveTo(.7, cc.p(0, 0)).easing(cc.easeCubicActionOut())), this.zoomFlag = !0
            }, e.prototype.easeOut = function (t, e, o, n) {
                return o * ((t = t / n - 1) * t * t + 1) + e
            }, e.prototype.update = function (t) {
                this.zoomFlag && (this.gameCamera.zoomRatio = 1 - this.testNode.x)
            }, e.instance = null, __decorate([i(cc.Node)], e.prototype, "target", void 0), __decorate([i(cc.Camera)], e.prototype, "gameCamera", void 0), __decorate([i(cc.Camera)], e.prototype, "uiCamera", void 0), __decorate([i(cc.Node)], e.prototype, "testNode", void 0), e = o = __decorate([a], e)
        }(cc.Component);
        o.default = s, cc._RF.pop()
    }, {}],
    CheckBoard: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "caaa67AR1tGD7iuxxAlW5Ec", "CheckBoard"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = cc._decorator, a = n.ccclass, i = (n.property, function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }

            var o;
            return __extends(e, t), o = e, e.prototype.isInCheckBoard = function (t) {
                var e = this.node.position.sub(t), n = Math.sqrt(e.x * e.x + e.y * e.y),
                    a = this.node.getChildByName("Block"), i = !1;
                return i = i || n < 236, 0 == a.anchorX ? i = i || t.x < this.node.x - o.defaultMovement / 2 + a.width + 1 && t.x > this.node.x - o.defaultMovement / 2 - 1 && t.y > this.node.y - o.defaultMovement / 2 - 1 && t.y < this.node.y + o.defaultMovement / 2 + 1 : 1 == a.anchorX ? i = i || t.x < this.node.x + o.defaultMovement / 2 + 1 && t.x > this.node.x + o.defaultMovement / 2 - a.width - 1 && t.y > this.node.y - o.defaultMovement / 2 - 1 && t.y < this.node.y + o.defaultMovement / 2 + 1 : 1 == a.anchorY ? i = i || t.x < this.node.x + o.defaultMovement / 2 + 1 && t.x > this.node.x - o.defaultMovement / 2 - 1 && t.y > this.node.y + o.defaultMovement / 2 - a.height - 1 && t.y < this.node.y + o.defaultMovement / 2 + 1 : 0 == a.anchorY && (i = i || t.x < this.node.x + o.defaultMovement / 2 + 1 && t.x > this.node.x - o.defaultMovement / 2 - 1 && t.y > this.node.y - o.defaultMovement / 2 - 1 && t.y < this.node.y - o.defaultMovement / 2 + a.height + 1), i
            }, e.defaultMovement = 148, e = o = __decorate([a], e)
        }(cc.Component));
        o.default = i, cc._RF.pop()
    }, {}],
    CommonBg: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "f433fqNUDtBPKuLj4WGMpqq", "CommonBg"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = cc._decorator, a = n.ccclass, i = n.property, s = function (t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.floatSprite = null, e.floatNodes = null, e.circleNodes = null, e.circle = null, e.nodePool = null, e.MAX_NUM = 10, e.count = 0, e.MAX_SCALE = 5, e.MIN_TIME = 3, e.MAX_TIME = 6, e.MAX_DISTANCE = 100, e.circleData = [{
                    pos: cc.v2(-294, -110),
                    size: 270
                }, {pos: cc.v2(-330, 345), size: 150}, {pos: cc.v2(-160, 681), size: 180}, {
                    pos: cc.v2(266, 427),
                    size: 180
                }, {pos: cc.v2(217, -43), size: 130}, {pos: cc.v2(400, -306), size: 130}, {
                    pos: cc.v2(-188, -600),
                    size: 170
                }, {pos: cc.v2(218, -679), size: 210}], e
            }

            var o;
            return __extends(e, t), o = e, e.getInstance = function () {
                return o.instance
            }, e.prototype.onLoad = function () {
                null == o.instance ? o.instance = this : o.instance != this && this.destroy(), this.nodePool = new cc.NodePool;
                for (var t = 0; t < this.MAX_NUM; t++) {
                    var e = cc.instantiate(this.floatSprite);
                    e.active = !0, this.nodePool.put(e)
                }
                this.initCircle(), this.floatNodes.opacity = 0
            }, e.prototype.initCircle = function () {
                for (var t = 0; t < this.circleData.length; t++) {
                    var e = cc.instantiate(this.circle);
                    e.active = !0, e.position = this.circleData[t].pos, e.setContentSize(cc.size(this.circleData[t].size, this.circleData[t].size)), this.circleNodes.addChild(e);
                    var o = 100 + 150 * Math.random() * (Math.random() >= .5 ? 1 : -1),
                        n = 100 + 150 * Math.random() * (Math.random() >= .5 ? 1 : -1), a = 4 + 2 * Math.random();
                    e.runAction(cc.repeatForever(cc.sequence(cc.moveBy(a, cc.v2(o, n)), cc.moveBy(a, cc.v2(-o, -n)))))
                }
            }, e.prototype.switchToCircleMode = function () {
                this.circleNodes.runAction(cc.fadeIn(.5)), this.floatNodes.runAction(cc.fadeOut(.5))
            }, e.prototype.switchToTriangleMode = function () {
                this.circleNodes.runAction(cc.fadeOut(.5)), this.floatNodes.runAction(cc.fadeIn(.5))
            }, e.prototype.update = function (t) {
                if (this.count < this.MAX_NUM) {
                    var e = this.nodePool.get();
                    if (null == e) cc.instantiate(this.floatSprite).active = !0;
                    var o = cc.callFunc(function (t, e) {
                        this.nodePool.put(e), this.count--
                    }, this, e);
                    e.scale = Math.random() * this.MAX_SCALE, e.position = cc.v2((cc.visibleRect.width - 200) * Math.random() - cc.visibleRect.width / 2, (cc.visibleRect.height - 200) * Math.random() - cc.visibleRect.height / 2), e.rotation = 90 * Math.random(), e.opacity = 0;
                    var n = this.MAX_TIME * Math.random() + this.MIN_TIME, a = [];
                    a.push(cc.rotateBy(n, 90 * Math.random())), a.push(cc.moveBy(n, cc.v2(this.MAX_DISTANCE * Math.random(), this.MAX_DISTANCE * Math.random()))), a.push(cc.scaleTo(n, e.scale + .5)), a.push(cc.fadeIn(n));
                    var i = [];
                    i.push(cc.rotateBy(n, 90 * Math.random())), i.push(cc.moveBy(n, cc.v2(this.MAX_DISTANCE * Math.random(), this.MAX_DISTANCE * Math.random()))), i.push(cc.scaleTo(n, e.scale - .5 < 0 ? 0 : e.scale - .5)), i.push(cc.fadeOut(n)), e.runAction(cc.sequence(cc.spawn(a), cc.spawn(i), o)), this.floatNodes.addChild(e), this.count++
                }
            }, e.instance = null, __decorate([i(cc.Node)], e.prototype, "floatSprite", void 0), __decorate([i(cc.Node)], e.prototype, "floatNodes", void 0), __decorate([i(cc.Node)], e.prototype, "circleNodes", void 0), __decorate([i(cc.Node)], e.prototype, "circle", void 0), e = o = __decorate([a], e)
        }(cc.Component);
        o.default = s, cc._RF.pop()
    }, {}],
    CommonUI: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "83f7egU4lNBpqO4B/GZyzDQ", "CommonUI"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = t("../Controllers/UIControl"), a = t("../Controllers/GameControl"), i = t("./CommonBg"),
            s = t("./StageView"), r = cc._decorator, c = r.ccclass, l = r.property, d = function (t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.goldLabel = null, e.energyAnim = null, e.backBtn = null, e.energyLabel = null, e.energyCDLabel = null, e.lvLabel = null, e.lvProgress = null, e.titleBar = null, e.gmCount = 0, e.maxEnergy = 15, e.maxLevel = 7, e
                }

                var o;
                return __extends(e, t), o = e, e.getInstance = function () {
                    return o.instance
                }, e.prototype.onLoad = function () {
                    null == o.instance ? o.instance = this : o.instance != this && this.destroy(), this.backBtn.y = 130, this.titleBar.y = 130
                }, e.prototype.onEnable = function () {
                    this.refreshGold(), a.default.getInstance().refreshLv(), this.setEnergy(a.default.getInstance().playerInfo.energy), this.gmCount = 0
                }, e.prototype.refreshGold = function () {
                    this.setGold(a.default.getInstance().getFBData().diamond)
                }, e.prototype.setGold = function (t) {
                    this.goldLabel.string = t.toString()
                }, e.prototype.AnimOut = function () {
                    this.titleBar.runAction(cc.moveTo(.2, cc.v2(0, 130)).easing(cc.easeCubicActionIn())), this.backBtn.runAction(cc.moveTo(.2, cc.v2(0, 130)).easing(cc.easeCubicActionIn())), n.default.getInstance().showView("BlockView", !0), this.scheduleOnce(function () {
                        var t = n.default.getInstance();
                        t.showView("BlockView", !1), t.showView("CommonUI", !1), t.showView("BackBtnBg", !1)
                    }.bind(this), .4)
                }, e.prototype.AnimIn = function (t) {
                    t && this.titleBar.runAction(cc.moveTo(.2, cc.v2(0, 0)).easing(cc.easeCubicActionOut())), this.backBtn.runAction(cc.moveTo(.2, cc.v2(0, 0)).easing(cc.easeCubicActionOut())), n.default.getInstance().showView("BlockView", !0), this.scheduleOnce(function () {
                        n.default.getInstance().showView("BlockView", !1)
                    }.bind(this), .4)
                }, e.prototype.onTouchBtn = function (t, e) {
                    var a = n.default.getInstance();
                    "ShopBtn" == e ? (a.showView("ShopView", !0), a.showView("BackBtnBg", !0), o.getInstance().AnimIn(!1)) : "RankBtn" == e ? (a.showView("RankView", !0), a.showView("BackBtnBg", !0), o.getInstance().AnimIn(!1)) : "BackBtn" == e ? (a.showView("SettingView", !1), a.showView("RankView", !1), a.showView("ShopView", !1), o.getInstance().AnimOut(), a.isViewVisible("StageView") && (a.showView("TitleView", !0), s.default.getInstance().AnimOut(), i.default.getInstance().switchToCircleMode())) : "SettingBtn" == e ? (a.showView("SettingView", !0), a.showView("BackBtnBg", !0), o.getInstance().AnimIn(!1)) : "LevelBtn" == e ? a.showView("LevelView", !0) : "energyAdd" == e ? a.showView("EnergyView", !0) : "diaAdd" == e && a.showView("DiamondView", !0)
                }, e.prototype.touchGM = function () {
                    this.gmCount++, 15 == this.gmCount && (n.default.getInstance().showView("GMView", !0), this.gmCount = 0)
                }, e.prototype.playEnergyEffect = function (t, e) {
                    this.energyAnim.parent.convertToNodeSpaceAR(t);
                    this.energyAnim.position = cc.v2(-49, 0), this.energyAnim.scale = 1, this.energyAnim.opacity = 255, this.energyAnim.runAction(cc.sequence(cc.scaleTo(.1, 1.2), cc.spawn(cc.moveBy(.5, cc.v2(0, -100)), cc.fadeOut(.5)), cc.callFunc(e)))
                }, e.prototype.setEnergy = function (t) {
                    this.energyLabel.string = "<color=#ffffff>" + t + "</c><color=#ffffff>/15</color>"
                }, e.prototype.setEnergyCD = function (t) {
                    if (t <= 0) this.energyCDLabel.node.active = !1; else {
                        this.energyCDLabel.node.active = !0;
                        var e = Math.floor(t / 60), o = Math.floor(t - 60 * e);
                        this.energyCDLabel.string = e + ":" + (o >= 10 ? "" : "0") + o
                    }
                }, e.prototype.refreshLv = function (t, e) {
                    this.lvLabel.string = t.toString(), t >= this.maxLevel ? this.lvProgress.progress = 0 : this.lvProgress.progress = e
                }, e.instance = null, __decorate([l(cc.Label)], e.prototype, "goldLabel", void 0), __decorate([l(cc.Node)], e.prototype, "energyAnim", void 0), __decorate([l(cc.Node)], e.prototype, "backBtn", void 0), __decorate([l(cc.RichText)], e.prototype, "energyLabel", void 0), __decorate([l(cc.Label)], e.prototype, "energyCDLabel", void 0), __decorate([l(cc.Label)], e.prototype, "lvLabel", void 0), __decorate([l(cc.ProgressBar)], e.prototype, "lvProgress", void 0), __decorate([l(cc.Node)], e.prototype, "titleBar", void 0), e = o = __decorate([c], e)
            }(cc.Component);
        o.default = d, cc._RF.pop()
    }, {
        "../Controllers/GameControl": "GameControl",
        "../Controllers/UIControl": "UIControl",
        "./CommonBg": "CommonBg",
        "./StageView": "StageView"
    }],
    Constants: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "b90c2yc7ENPE6VZmuRQSX5F", "Constants"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = cc._decorator, a = n.ccclass, i = (n.property, function (t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.chapterData = [], e.shopData = [], e.unlockData = [], e
            }

            var o;
            return __extends(e, t), o = e, e.getInstance = function () {
                return o.instance
            }, e.prototype.onLoad = function () {
                null == o.instance ? o.instance = this : o.instance != this && this.destroy();
                var t = [{
                    chapter: 1,
                    chapterTitle: "Christmas",
                    chapterInfo: [{
                        order: 1,
                        id: 1,
                        level: 1,
                        title: "两只老虎",
                        subtitle: "法国民谣",
                        path: "Two Tigers",
                        map: "Two Tigers[EASY]",
                        cost: 0,
                        frameId: 6,
                        bpm: 125
                    }, {
                        order: 2,
                        id: 2,
                        level: 2,
                        title: "糖梅仙女的电舞",
                        subtitle: "夕阳异域",
                        path: "EDOTSPF",
                        map: "EDOTSPF[EASY]",
                        cost: 200,
                        frameId: 2,
                        bpm: 118
                    }, {
                        order: 3,
                        id: 3,
                        level: 2,
                        title: "沃尔夫冈 ",
                        subtitle: "人德洛里安",
                        path: "Wolfgang",
                        map: "Wolfgang[EASY]",
                        cost: 200,
                        frameId: 8,
                        bpm: 114
                    }, {
                        order: 4,
                        id: 4,
                        level: 3,
                        title: "70年代,公路之旅",
                        subtitle: "史葛杜格代尔",
                        path: "70's Rockin Road Trip",
                        map: "70's Rockin Road Trip[NORMAL]",
                        cost: 250,
                        frameId: 4,
                        bpm: 125
                    }, {
                        order: 4,
                        id: 22,
                        level: 3,
                        title: "80年代奶酪广告",
                        subtitle: "史葛杜格代尔",
                        path: "80's Cheese Infomercial",
                        map: "80's Cheese Infomercial[NORMAL]",
                        cost: 270,
                        frameId: 8,
                        bpm: 137
                    }, {
                        order: 5,
                        id: 5,
                        level: 3,
                        title: "永远的朋友4 ",
                        subtitle: "布伦特资产阶级",
                        path: "Friends 4 Ever",
                        map: "Friends 4 Ever[NORMAL]",
                        cost: 300,
                        frameId: 10,
                        bpm: 148
                    }, {
                        order: 6,
                        id: 6,
                        level: 3,
                        title: "华美博萨土地 ",
                        subtitle: "史葛杜格代尔",
                        path: "Groovy Bossa Land",
                        map: "Groovy Bossa Land[NORMAL]",
                        cost: 350,
                        frameId: 3,
                        bpm: 146
                    }, {
                        order: 7,
                        id: 7,
                        level: 4,
                        title: "谢伊兹",
                        subtitle: "人德洛里安",
                        path: "Cheeeez",
                        map: "Cheeeez[NORMAL]",
                        cost: 350,
                        frameId: 6,
                        bpm: 173
                    }, {
                        order: 8,
                        id: 8,
                        level: 4,
                        title: "乔伊在唱歌，没有乔伊。",
                        subtitle: "史葛杜格代尔",
                        path: "Joey Singing Minus Joey",
                        map: "Joey Singing Minus Joey[NORMAL]",
                        cost: 400,
                        frameId: 8,
                        bpm: 160
                    }, {
                        order: 9,
                        id: 9,
                        level: 4,
                        title: "在屋顶上",
                        subtitle: "布伦特资产阶级",
                        path: "Up On The Housetop",
                        map: "Up On The Housetop[NORMAL]",
                        cost: 400,
                        frameId: 3,
                        bpm: 160
                    }, {
                        order: 10,
                        id: 10,
                        level: 4,
                        title: "亚克博",
                        subtitle: "人德洛里安",
                        path: "Ackbar",
                        map: "Ackbar[NORMAL]",
                        cost: 450,
                        frameId: 5,
                        bpm: 140
                    }, {
                        order: 12,
                        id: 12,
                        level: 5,
                        title: "机器人",
                        subtitle: "人德洛里安",
                        path: "Robots",
                        map: "Robots[NORMAL]",
                        cost: 500,
                        frameId: 9,
                        animMulti: .5,
                        bpm: 154
                    }, {
                        order: 11,
                        id: 11,
                        level: 5,
                        title: "汽车追逐赛",
                        subtitle: "史葛杜格代尔",
                        path: "SF Car Chase",
                        map: "SF Car Chase[NORMAL]",
                        cost: 500,
                        frameId: 2,
                        animMulti: .5,
                        bpm: 127
                    }, {
                        order: 13,
                        id: 13,
                        level: 5,
                        title: "糖梅仙女的电舞",
                        subtitle: "夕阳异域",
                        path: "EDOTSPF",
                        map: "EDOTSPF[NORMAL]",
                        cost: 550,
                        frameId: 9,
                        animMulti: .5,
                        bpm: 118
                    }, {
                        order: 14,
                        id: 14,
                        level: 6,
                        title: "70年代公路之旅",
                        subtitle: "史葛杜格代尔",
                        path: "70's Rockin Road Trip",
                        map: "70's Rockin Road Trip[HARD]",
                        cost: 600,
                        frameId: 4,
                        animMulti: .5,
                        bpm: 125
                    }, {
                        order: 15,
                        id: 15,
                        level: 6,
                        title: "华美博萨土地",
                        subtitle: "史葛杜格代尔",
                        path: "Groovy Bossa Land",
                        map: "Groovy Bossa Land[HARD]",
                        cost: 650,
                        frameId: 3,
                        animMulti: .5,
                        bpm: 146
                    }, {
                        order: 16,
                        id: 16,
                        level: 7,
                        title: "亚克博",
                        subtitle: "人德洛里安",
                        path: "Ackbar",
                        map: "Ackbar[HARD]",
                        cost: 700,
                        frameId: 5,
                        animMulti: .5,
                        bpm: 140
                    }, {
                        order: 17,
                        id: 17,
                        level: 7,
                        title:
                            "乔伊在唱歌，没有乔伊。 ",
                        subtitle: "史葛杜格代尔",
                        path: "Joey Singing Minus Joey",
                        map: "Joey Singing Minus Joey[HARD]",
                        cost: 700,
                        frameId: 8,
                        animMulti: .5,
                        bpm: 160
                    }, {
                        order: 18,
                        id: 18,
                        level: 7,
                        title: "在屋顶上",
                        subtitle: "布伦特资产阶级",
                        path: "Up On The Housetop",
                        map: "Up On The Housetop[HARD]",
                        cost: 750,
                        frameId: 3,
                        animMulti: .5,
                        bpm: 160
                    }, {
                        order: 19,
                        id: 19,
                        level: 8,
                        title: "永远的朋友4",
                        subtitle:
                            "布伦特资产阶级 ",
                        path: "Friends 4 Ever",
                        map: "Friends 4 Ever[HARD]",
                        cost: 800,
                        frameId: 10,
                        animMulti: .5,
                        bpm: 148
                    }, {
                        order: 20,
                        id: 20,
                        level: 8,
                        title: "谢伊兹",
                        subtitle: "人德洛里安",
                        path: "Cheeeez",
                        map: "Cheeeez[HARD]",
                        cost: 800,
                        frameId: 6,
                        animMulti: .5,
                        bpm: 173
                    }, {
                        order: 21,
                        id: 21,
                        level: 8,
                        title: "机器人",
                        subtitle: "人德洛里安",
                        path: "Robots",
                        map: "Robots[HARD]",
                        cost: 800,
                        frameId: 9,
                        animMulti: .5,
                        bpm: 154
                    }, {
                        order: 21,
                        id: 23,
                        level: 8,
                        title: "80年代奶酪广告",
                        subtitle: "史葛杜格代尔",
                        path: "80's Cheese Infomercial",
                        map: "80's Cheese Infomercial[HARD]",
                        cost: 800,
                        frameId: 8,
                        animMulti: .5,
                        bpm: 137
                    }]
                }];
                this.chapterData = t, t = [{id: 1, icon: "chick", cost: 0}, {id: 2, icon: "Pig", cost: 400}, {
                    id: 3,
                    icon: "sheep",
                    cost: 1e3
                }], this.shopData = t, t = [[1, 4, 11], [2, 7], [8, 12], [6, 10], [14, 15], [9, 13], [5]], this.unlockData = t
            }, e.prototype.sortSongData = function () {
                for (var t = 0; t < this.chapterData.length; t++) this.chapterData[t].chapterInfo.sort(function (t, e) {
                    return t.order > e.order ? 1 : -1
                })
            }, e.prototype.getChpater = function (t) {
                return this.chapterData[t - 1]
            }, e.prototype.getStage = function (t, e) {
                for (var o = this.getChpater(t).chapterInfo, n = 0; n < o.length; n++) if (e == o[n].id) return o[n];
                return console.log("getStage Failed", t, e), null
            }, e.prototype.getPath = function (t, e) {
                var o = "Chapter/" + t + "/Songs/" + this.getStage(t, e).path + "/";
                return cc.log("getPath", o), o
            }, e.prototype.getShopData = function () {
                return this.shopData
            }, e.prototype.getStageUnLockData = function () {
                return this.unlockData
            }, e.prototype.testRankData = function () {
                return []
            }, e.prototype.fixData = function (t) {
                for (var e = 0; e < this.chapterData[0].chapterInfo.length; e++) null == t.state[e] && (t.state[e] = 0), null == t.bestScore[e] && (t.bestScore[e] = 0), null == t.star[e] && (t.star[e] = 0);
                for (e = 0; e < this.shopData.length; e++) null == t.skinInfo[e] && (t.skinInfo[e] = 0)
            }, e.instance = null, e = o = __decorate([a], e)
        }(cc.Component));
        o.default = i, cc._RF.pop()
    }, {}],
    DateUtility: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "749b18nKJ5F+7usm0sO6lBf", "DateUtility"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = function () {
            function t() {
            }

            return t.GetDateNow = function () {
                var t = new Date, e = t.getFullYear(), o = t.getMonth() + 1, n = t.getDate();
                return o < 10 && (o = "0" + o), n < 10 && (n = "0" + n), e + "" + o + n
            }, t.FormatDate = function (t) {
                var e = t, o = e.getFullYear(), n = e.getMonth() + 1, a = e.getDate();
                return n < 10 && (n = "0" + n), a < 10 && (a = "0" + a), o + "" + n + a
            }, t.GetCurrentMinutesTostring = function () {
                var t = new Date;
                return t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes().toString()
            }, t.GetCurrentDateToString_ss = function () {
                var t = new Date, e = t.getFullYear(), o = t.getMonth() + 1, n = t.getDate(),
                    a = t.getHours() < 10 ? "0" + t.getHours() : t.getHours();
                t.getMinutes(), t.getMinutes();
                return o < 10 && (o = "0" + o), n < 10 && (n = "0" + n), e + "" + o + n + ":" + a
            }, t.FormatToDay = function (t) {
                var e = t.getFullYear(), o = t.getMonth() + 1, n = t.getDate();
                return o < 10 && (o = "0" + o), n < 10 && (n = "0" + n), e + "" + o + n
            }, t.FormatTohh = function (t) {
                var e = t.getFullYear(), o = t.getMonth() + 1, n = t.getDate(),
                    a = t.getHours() < 10 ? "0" + t.getHours() : t.getHours();
                t.getMinutes(), t.getMinutes();
                return o < 10 && (o = "0" + o), n < 10 && (n = "0" + n), e + "" + o + n + ":" + a
            }, t.GetCurrentHour = function () {
                var t = new Date;
                return t.getHours() < 10 ? "0" + t.getHours() : t.getHours() + ""
            }, t.AddDays = function (t, e) {
                return new Date(t.setDate(t.getDate() + e))
            }, t.FormatStringToDate = function (t) {
                return new Date(Date.parse(t.replace(/-/g, "/")))
            }, t.AddMonths = function (t, e) {
                var o = t, n = o.getFullYear(), a = (e = o.getMonth() + e, o.getDate());
                return e / 12 > 0 && (n += e / 12), new Date(n, e, a)
            }, t.IsDateLimit = function (t, e) {
                return t <= e
            }, t.GetDateStr = function (t) {
                var e = new Date(t), o = e.getFullYear(), n = e.getMonth() + 1, a = e.getDate(), i = e.getHours(),
                    s = e.getMinutes(), r = e.getSeconds();
                return cc.js.formatStr("%s-%s-%s %s:%s:%s", o, n, a, i, s, r)
            }, t.GetDateByFormat = function (t, e) {
                void 0 === e && (e = "yyyy-MM-dd hh:mm:ss");
                var o = new Date(t), n = {
                    yyyy: o.getFullYear(),
                    MM: o.getMonth() + 1,
                    dd: o.getDate(),
                    hh: o.getHours(),
                    mm: o.getMinutes(),
                    ss: o.getSeconds()
                }, a = e;
                for (var i in n) a = a.replace(i, n[i]);
                return a
            }, t.GetHourAndMinites = function () {
                var t = new Date;
                return (t.getHours() > 9 ? t.getHours() : "0" + t.getHours()) + ":" + (t.getMinutes() > 9 ? t.getMinutes() : "0" + t.getMinutes())
            }, t.SecondToDayTime = function (t) {
                var e = new Array, o = Math.floor(t / 86400);
                t -= 86400 * o;
                var n = Math.floor(t / 3600);
                t -= 3600 * n;
                var a = Math.floor(t / 60);
                t -= 60 * a;
                var i = Math.floor(t);
                return e.push(o), e.push(n), e.push(a), e.push(i), e
            }, t
        }();
        o.default = n, cc._RF.pop()
    }, {}],
    DiamondView: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "3fada5kM91IOLNswbY+RR6U", "DiamondView"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = t("../Controllers/GameControl"), a = t("./CommonUI"), i = t("Logger"), s = t("./TipsView"),
            r = cc._decorator, c = r.ccclass, l = (r.property, function (t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.addNum = 200, e
                }

                return __extends(e, t), e.prototype.onEnable = function () {
                    i.default.analytics("ads_diamond", {player_id: FBInstant.player.getID()})
                }, e.prototype.successCallback = function () {
                    i.default.analytics("ads_diamond_2", {player_id: FBInstant.player.getID()});
                    var t = n.default.getInstance().getFBData();
                    t.diamond += this.addNum, n.default.getInstance().setFBData(t), a.default.getInstance().refreshGold(), this.node.active = !1, s.default.getInstance().showTips("You get " + this.addNum + " diamond!")
                }, e.prototype.onTouchBtn = function (t, e) {
                    var o = this;
                    "CancelBtn" == e ? this.node.active = !1 : (i.default.analytics("ads_diamond_1", {player_id: FBInstant.player.getID()}), n.default.getInstance().showAdWithRetry(function () {
                        o.successCallback()
                    }))
                }, e = __decorate([c], e)
            }(cc.Component));
        o.default = l, cc._RF.pop()
    }, {
        "../Controllers/GameControl": "GameControl",
        "./CommonUI": "CommonUI",
        "./TipsView": "TipsView",
        Logger: "Logger"
    }],
    DontDestroy: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "a7226n8Sc1Ax445bw8NMsR8", "DontDestroy"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = cc._decorator, a = n.ccclass, i = (n.property, function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }

            return __extends(e, t), e.prototype.onLoad = function () {
                cc.game.addPersistRootNode(this.node)
            }, e = __decorate([a], e)
        }(cc.Component));
        o.default = i, cc._RF.pop()
    }, {}],
    EnergyView: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "6c2b94d06tJjL+30OVzaYrG", "EnergyView"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = t("Facebook"), a = t("../Controllers/GameControl"), i = t("./CommonUI"), s = t("Logger"),
            r = t("./TipsView"), c = cc._decorator, l = c.ccclass, d = (c.property, function (t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.addNum = 2, e
                }

                return __extends(e, t), e.prototype.onTouchBtn = function (t, e) {
                    "CancelBtn" == e ? this.node.active = !1 : (s.default.analytics("energy_share", {player_id: FBInstant.player.getID()}), n.default.ChooseAsync({filters: ["INCLUDE_EXISTING_CHALLENGES"]}, function () {
                        var t = a.default.getInstance().getFBData();
                        t.energy += 2, a.default.getInstance().setFBData(t), i.default.getInstance().setEnergy(t.energy), this.node.active = !1, r.default.getInstance().showTips("You get 2 energy!")
                    }.bind(this)))
                }, e = __decorate([l], e)
            }(cc.Component));
        o.default = d, cc._RF.pop()
    }, {
        "../Controllers/GameControl": "GameControl",
        "./CommonUI": "CommonUI",
        "./TipsView": "TipsView",
        Facebook: "Facebook",
        Logger: "Logger"
    }],
    FacebookAd: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "d2b36aTaHJFh4u5UBRFZN3s", "FacebookAd"), Object.defineProperty(o, "__esModule", {value: !0});
        var n, a, i = t("./Facebook"), s = t("../Logger/Logger"), r = t("../MsgSystem/MsgSystem"),
            c = t("../MsgSystem/MsgDefine");
        (function (t) {
            t[t.INTERSTITIAL = 0] = "INTERSTITIAL", t[t.REWARDED = 1] = "REWARDED"
        })(n = o.AdType || (o.AdType = {})), function (t) {
            t[t.NONE = 0] = "NONE", t[t.REQUESTING = 1] = "REQUESTING", t[t.SUCCESS = 2] = "SUCCESS", t[t.FAIL = 3] = "FAIL"
        }(a = o.REQUEST_STATE || (o.REQUEST_STATE = {}));
        var l = function () {
            function t(t) {
                this.instance = null, this.getAdState = a.NONE, this.preloadState = a.NONE, this.preloadSuccessCallback = null, this.preloadFailCallback = null, this.timeoutHandler = null, this.loadTime = 0, this.adType = t
            }

            return t.prototype.init = function () {
                this.instance = null, this.getAdState = a.NONE, this.preloadState = a.NONE, this.preloadSuccessCallback = null, this.preloadFailCallback = null, this.timeoutHandler = null, this.loadTime = 0
            }, t
        }(), d = function () {
            function t() {
                this._adsInstanceMap = new Map, this._adsPreloadQueue = new Array, this._adsPreloadLock = !1, this._adsAutoPlayMap = new Map, this.cdLock = !1
            }

            return t.prototype.match_type_platform = function (t) {
                return cc.sys.isMobile && t == n.REWARDED || !cc.sys.isMobile && t == n.INTERSTITIAL
            }, t.prototype.Init = function (t) {
                var e = this;
                i.default.IsFBSupport() && t.forEach(function (t, o) {
                    var n = new l(t);
                    e._adsInstanceMap.set(o, n), e.match_type_platform(t) && (e._adsAutoPlayMap.set(o, !1), e.InitSingleAd(o, t))
                })
            }, t.prototype.InitSingleAd = function (t, e) {
                e == n.REWARDED ? this.InitRewardedVideo(t) : e == n.INTERSTITIAL ? this.InitInterstitialAd(t) : s.default.error("unknown adType : placementId = " + t)
            }, t.prototype.InitRewardedVideo = function (t) {
                var e = this;
                if (i.default.IsApiSupport("getRewardedVideoAsync")) {
                    var o = this._adsInstanceMap.get(t);
                    o.init(), o.getAdState = a.REQUESTING, FBInstant.getRewardedVideoAsync(t).then(function (n) {
                        o.instance = n, o.getAdState = a.SUCCESS, e.pushAdToPreloadQueue(t)
                    }).catch(function (t) {
                        o.getAdState = a.FAIL, s.default.error("RewardedVideo failed to get : " + t.code + " :: " + t.message), s.default.analytics("ads_initFail", {
                            errCode: t.code,
                            errorMsg: t.message,
                            type: "REWARDED"
                        })
                    })
                }
            }, t.prototype.InitInterstitialAd = function (t) {
                var e = this;
                if (i.default.IsApiSupport("getInterstitialAdAsync")) {
                    var o = this._adsInstanceMap.get(t);
                    o.init(), o.getAdState = a.REQUESTING, FBInstant.getInterstitialAdAsync(t).then(function (n) {
                        o.instance = n, o.getAdState = a.SUCCESS, e.pushAdToPreloadQueue(t)
                    }).catch(function (t) {
                        o.getAdState = a.FAIL, s.default.error("InterstitialAd failed to get : " + t.code + " :: " + t.message), s.default.analytics("ads_initFail", {
                            errCode: t.code,
                            errorMsg: t.message,
                            type: "INTERSTITIAL"
                        })
                    })
                }
            }, t.prototype.pushAdToPreloadQueue = function (t) {
                this._adsPreloadQueue.push(t), this.awakePreloadQueue()
            }, t.prototype.awakePreloadQueue = function () {
                var t = this;
                if (!this._adsPreloadLock && 0 != this._adsPreloadQueue.length) {
                    var e = this._adsPreloadQueue[0], o = this._adsInstanceMap.get(e);
                    if (o.preloadState != a.REQUESTING) {
                        if (o.preloadState == a.SUCCESS || o.preloadState == a.FAIL) return this._adsPreloadQueue.shift(), void this.awakePreloadQueue();
                        this._adsPreloadLock = !0, this.PreloadAd(e, function () {
                            t._adsPreloadLock = !1, t.awakePreloadQueue()
                        }, function (n) {
                            setTimeout(function () {
                                t._adsPreloadLock = !1, t._adsPreloadQueue.shift(), "INVALID_PARAM" == n ? t.InitSingleAd(e, o.adType) : "ADS_FREQUENT_LOAD" == n ? o.preloadState = a.NONE : "ADS_NO_FILL" != n || cc.sys.isMobile ? (o.preloadState = a.NONE, t.pushAdToPreloadQueue(e)) : o.preloadState = a.NONE
                            }, 3e3)
                        })
                    }
                }
            }, t.prototype.PreloadAd = function (t, e, o) {
                void 0 === e && (e = null), void 0 === o && (o = null);
                var n = this._adsInstanceMap.get(t);
                null != n.instance && (n.preloadState = a.REQUESTING, n.loadTime = (new Date).getTime(), n.instance.loadAsync().then(function () {
                    n.loadTime = (new Date).getTime() - n.loadTime, s.default.log("Ad preloaded, placementId:" + t + ", type:" + n.adType), n.preloadState = a.SUCCESS, n.preloadSuccessCallback && n.preloadSuccessCallback(), e && e(), s.default.analytics("ads_loadTime", {type: "defaultAds"})
                }).catch(function (t) {
                    s.default.error("Ad failed to preload : " + t.code + " :: " + t.message), n.preloadState = a.FAIL, n.preloadFailCallback && n.preloadFailCallback(), o && o(t.code), s.default.analytics("ads_preloadFail", {
                        errCode: t.code,
                        errorMsg: t.message,
                        type: "defaultAds"
                    })
                }))
            }, t.prototype.ShowAd = function (t, e, o, n) {
                var r = this;
                void 0 === e && (e = null), void 0 === o && (o = null), void 0 === n && (n = -1);
                var c = function () {
                    o && o()
                };
                if (i.default.IsFBSupport()) {
                    var l = this._adsInstanceMap.get(t);
                    if (null != l) return null == l.instance ? (l.getAdState != a.REQUESTING && this.InitSingleAd(t, l.adType), void c()) : void (l.preloadState == a.SUCCESS ? l.instance.showAsync().then(function () {
                        s.default.log("ShowAdSuccess : " + t + ", type:" + l.adType), r.InitSingleAd(t, l.adType), e && e()
                    }).catch(function (e) {
                        c(), s.default.error("ShowAdFail : " + t + "::" + e.code + " :: " + e.message), s.default.analytics("ads_showFail", {
                            errCode: e.code,
                            errorMsg: e.message,
                            type: "defaultAds"
                        })
                    }) : l.preloadState == a.FAIL ? c() : l.preloadState == a.NONE ? (c(), this.pushAdToPreloadQueue(t)) : (s.default.log(t + "Ad preload not finished yet"), n < 0 ? (l.preloadSuccessCallback = function () {
                        r.ShowAd(t, e, o)
                    }, l.preloadFailCallback = function () {
                        c()
                    }) : 0 == n ? c() : (l.timeoutHandler = setTimeout(function () {
                        l.preloadSuccessCallback = null, l.preloadFailCallback = null, c()
                    }, n), l.preloadSuccessCallback = function () {
                        clearTimeout(l.timeoutHandler), l.preloadSuccessCallback = null, l.preloadFailCallback = null, r.ShowAd(t, e, o)
                    }, l.preloadFailCallback = function () {
                        clearTimeout(l.timeoutHandler), l.preloadSuccessCallback = null, l.preloadFailCallback = null, c()
                    })));
                    c()
                } else c()
            }, t.prototype.isCdLock = function () {
                return this.cdLock
            }, t.prototype.AutoPlay = function (e, o) {
                var n = this;
                if (void 0 === e && (e = null), void 0 === o && (o = null), i.default.IsFBSupport()) {
                    if (1 == this.cdLock) return o && o(), void r.default.instance.SendMessage(c.default.fbAdMsg, "AD not ready, please try later");
                    this.cdLock = !0, setTimeout(function () {
                        n.cdLock = !1
                    }, 1e3 * t.requestCD), r.default.instance.SendMessage(c.default.onFBAdPlayStart);
                    var a = "";
                    this._adsAutoPlayMap.forEach(function (t, e) {
                        a = e
                    }), this.ShowAd(a, function () {
                        e && e(), r.default.instance.SendMessage(c.default.onFBAdPlayEnd)
                    }, function () {
                        o && o(), r.default.instance.SendMessage(c.default.onFBAdPlayEnd), r.default.instance.SendMessage(c.default.fbAdMsg, "AD not ready, please try later")
                    }, 1e4)
                } else e && e()
            }, t.requestCD = 30, t
        }();
        o.default = d, cc._RF.pop()
    }, {
        "../Logger/Logger": "Logger",
        "../MsgSystem/MsgDefine": "MsgDefine",
        "../MsgSystem/MsgSystem": "MsgSystem",
        "./Facebook": "Facebook"
    }],
    FacebookAnalytics: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "e8eff6QaJFDA7wCzQLtYvSZ", "FacebookAnalytics"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = cc._decorator, a = n.ccclass, i = (n.property, function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }

            return __extends(e, t), e.watchPicAd = "watchPicAd", e.watchVideoAd = "watchVideoAd", e.noWatchPicAd = "noWatchPicAd", e.noWatchVideoAd = "noWatchVideoAd", e.shareGame = "shareGame", e.shareGameSuccess = "shareGameSuccess", e.shareGameFail = "shareGameFail", e.rejectShare = "rejectShare", e.inviteFriend = "inviteFriend", e.inviteFriendSuccess = "inviteFriendSuccess", e.inviteFriendFail = "inviteFriendFail", e.addToDesktopSuccess = "addToDeskTopSuccess", e.addToDesktopFail = "addToDesktopFail", e.showPlayWithFriendWindow = "showPlayWithFriendWindow", e.clickRecommendGame = "clickRecommendGame", e.showRecommendWindow = "showRecommendWindow", e.buySkin = "buySkin", e.startPk = "startPk", e = __decorate([a], e)
        }(cc.Component));
        o.default = i, cc._RF.pop()
    }, {}],
    FacebookPlatform: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "f6185SI1+VDmIg2XaEfyivt", "FacebookPlatform"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = t("./Facebook"), a = t("../Logger/Logger"), i = t("../MsgSystem/MsgSystem"),
            s = t("../MsgSystem/MsgDefine"), r = cc._decorator, c = (r.ccclass, r.property, function () {
                function t() {
                    this.contextId = null, this.contextType = "", this.local = "", this.lanCode = "", this.platform = "", this.SDKVersion = "", this.entryPoint = "", this.entryPointData = null
                }

                return t.prototype.Init = function () {
                    n.default.IsFBSupport() && (this.contextType = FBInstant.context.getType(), "SOLO" == this.contextType ? this.contextId = FBInstant.player.getID() + "_SOLO" : this.contextId = FBInstant.context.getID(), this.local = FBInstant.getLocale(), this.lanCode = this.local.substr(0, 2), this.platform = FBInstant.getPlatform(), this.SDKVersion = FBInstant.getSDKVersion(), this.entryPoint = FBInstant.getEntryPointAsync(), this.entryPointData = FBInstant.getEntryPointData(), a.default.log("contextType:" + this.contextType), a.default.log("contextId:" + this.contextId), a.default.log("local:" + this.local), a.default.log("lanCode:" + this.lanCode), a.default.log("SDKVersion:" + this.SDKVersion), a.default.log("entryPoint:" + this.entryPoint), a.default.log("entryPointData:" + JSON.stringify(this.entryPointData)), i.default.instance.SendMessage(s.default.contextInfoLoadFinish))
                }, t.prototype.RefreshContextInfo = function () {
                    this.contextType = FBInstant.context.getType(), "SOLO" == this.contextType ? this.contextId = FBInstant.player.getID() + "_SOLO" : this.contextId = FBInstant.context.getID()
                }, t
            }());
        o.default = c, cc._RF.pop()
    }, {
        "../Logger/Logger": "Logger",
        "../MsgSystem/MsgDefine": "MsgDefine",
        "../MsgSystem/MsgSystem": "MsgSystem",
        "./Facebook": "Facebook"
    }],
    FacebookPlayerInfoInRank: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "49b88MoK5NNQIisPR6AkY+d", "FacebookPlayerInfoInRank"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = cc._decorator, a = n.ccclass, i = (n.property, function () {
            function t() {
                this.playerPic = new cc.SpriteFrame
            }

            return t = __decorate([a], t)
        }());
        o.default = i, cc._RF.pop()
    }, {}],
    FacebookPlayerPicDic: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "229c9+kT39PWbCtCK5cgjyy", "FacebookPlayerPicDic"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = t("../Utility/CSDictionary"), a = cc._decorator, i = (a.ccclass, a.property, function () {
            function t() {
            }

            return t.AddToPlayerPicDic = function (e, o) {
                if (!t.playerPicMap.ContainsKey(e)) {
                    var n = new cc.SpriteFrame;
                    t.playerPicMap.Add(e, n), cc.loader.load(o, function (o, n) {
                        t.playerPicMap.TryGetValue(e).setTexture(n)
                    }.bind(this))
                }
            }, t.GetPlayerPic = function (e) {
                return t.playerPicMap.TryGetValue(e)
            }, t.playerPicMap = new n.default, t
        }());
        o.default = i, cc._RF.pop()
    }, {"../Utility/CSDictionary": "CSDictionary"}],
    FacebookRank: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "57203Yqmj9C8JOej91Z6DH8", "FacebookRank"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = t("./Facebook"), a = t("../Logger/Logger"), i = t("./FacebookPlayerInfoInRank"),
            s = t("./FacebookPlayerPicDic"), r = cc._decorator, c = r.ccclass, l = (r.property, function () {
                function t() {
                    this.globalRankName = "permanentRank", this.weeklyRankName = "weeklyRank", this.contextRankName = "", this.globalRank = null, this.weeklyRank = null, this.contextRank = null, this.loadedRankListCount = 0, this.needLoadedRankListCount = 4, this.globalRankList = new Array, this.friendRankList = new Array, this.weeklyFriendRankList = new Array, this.weeklyGlobalRankList = new Array, this.contextRankList = new Array, this.myRankInGlobal = null, this.myRankInWeeklyGlobal = null, this.myRankInFriends = null, this.myRankInWeeklyFriends = null
                }

                return t.prototype.GetGlobalRank = function () {
                    var t = !1;
                    n.default.IsApiSupport("getLeaderboardAsync") && "" != this.globalRankName && FBInstant.getLeaderboardAsync(this.globalRankName).then(function (t) {
                        return this.globalRank = t, t.getPlayerEntryAsync()
                    }.bind(this)).then(function (e) {
                        if (null == e) return a.default.warn("no data in", this.globalRank), t = !0, this.globalRank.setScoreAsync(0, "");
                        t = !1, this.GetGlobalRankList(), this.GetFriendRankList()
                    }.bind(this)).then(function () {
                        0 != t && (this.GetGlobalRankList(), this.GetFriendRankList())
                    }.bind(this)).catch(function (t) {
                        a.default.error("failed : " + t.code + " :: " + t.message)
                    })
                }, t.prototype.GetWeeklyRank = function () {
                    var t = !1;
                    n.default.IsApiSupport("getLeaderboardAsync") && "" != this.weeklyRankName && FBInstant.getLeaderboardAsync(this.weeklyRankName).then(function (t) {
                        return this.weeklyRank = t, t.getPlayerEntryAsync()
                    }.bind(this)).then(function (e) {
                        if (null == e) return a.default.warn("no data in", this.weeklyRank), t = !0, this.weeklyRank.setScoreAsync(0, "");
                        t = !1, this.GetWeeklyGlobalRankList(), this.GetWeeklyFriendRankList()
                    }.bind(this)).then(function () {
                        0 != t && (this.GetWeeklyGlobalRankList(), this.GetWeeklyFriendRankList())
                    }.bind(this)).catch(function (t) {
                        a.default.error("failed : " + t.code + " :: " + t.message)
                    })
                }, t.prototype.GetGlobalRankList = function (t, e) {
                    void 0 === t && (t = 30), void 0 === e && (e = 0), this.globalRank.getEntriesAsync(t, e).then(function (t) {
                        this.FullRank(t, this.globalRankList)
                    }.bind(this)).catch(function (t) {
                        a.default.error("failed : " + t.code + " :: " + t.message)
                    }), this.globalRank.getPlayerEntryAsync().then(function (t) {
                        this.myRankInGlobal = t, a.default.log("myRankInGlobal:", this.myRankInGlobal.getRank())
                    }.bind(this)).catch(function (t) {
                        a.default.error("failed : " + t.code + " :: " + t.message)
                    })
                }, t.prototype.GetWeeklyGlobalRankList = function (t, e) {
                    void 0 === t && (t = 30), void 0 === e && (e = 0), this.weeklyRank.getEntriesAsync(t, e).then(function (t) {
                        this.FullRank(t, this.weeklyGlobalRankList)
                    }.bind(this)).catch(function (t) {
                        a.default.error("failed : " + t.code + " :: " + t.message)
                    }), this.weeklyRank.getPlayerEntryAsync().then(function (t) {
                        this.myRankInWeeklyGlobal = t, a.default.log("myRankInWeeklyGlobal:", this.myRankInWeeklyGlobal.getRank())
                    }.bind(this)).catch(function (t) {
                        a.default.error("failed : " + t.code + " :: " + t.message)
                    })
                }, t.prototype.GetFriendRankList = function (t, e) {
                    void 0 === t && (t = 100), void 0 === e && (e = 0), this.globalRank.getConnectedPlayerEntriesAsync(t, e).then(function (t) {
                        this.FullRank(t, this.friendRankList, !0)
                    }.bind(this)).catch(function (t) {
                        a.default.error("failed : " + t.code + " :: " + t.message)
                    })
                }, t.prototype.GetWeeklyFriendRankList = function (t, e) {
                    void 0 === t && (t = 100), void 0 === e && (e = 0), this.weeklyRank.getConnectedPlayerEntriesAsync(t, e).then(function (t) {
                        this.FullRank(t, this.weeklyFriendRankList, !0, !0)
                    }.bind(this)).catch(function (t) {
                        a.default.error("failed : " + t.code + " :: " + t.message)
                    })
                }, t.prototype.FullRank = function (t, e, o, n) {
                    var r;
                    void 0 === o && (o = !1), void 0 === n && (n = !1), 1 == o && (r = FBInstant.player.getID());
                    t.length;
                    for (var c = 0; c < t.length; c++) {
                        var l = new i.default;
                        l.playerId = t[c].getPlayer().getID(), l.playerName = t[c].getPlayer().getName(), l.playerRank = t[c].getRank(), l.playerScore = t[c].getScore(), l.playerPicUrl = t[c].getPlayer().getPhoto(), e.push(l), s.default.AddToPlayerPicDic(l.playerId, l.playerPicUrl), l.playerPic = s.default.GetPlayerPic(l.playerId), 1 == o && l.playerId == r && (0 == n ? (this.myRankInFriends = t[c], a.default.log("myRankInFriends:", this.myRankInFriends.getRank())) : (this.myRankInWeeklyFriends = t[c], a.default.log("myRankInWeeklyFriends:", this.myRankInWeeklyFriends.getRank())))
                    }
                    a.default.log(e), this.LoadRankFinish()
                }, t.prototype.LoadRankFinish = function () {
                    this.loadedRankListCount++, this.loadedRankListCount, this.needLoadedRankListCount
                }, t.prototype.AddTestFriendsToRank = function () {
                    for (var t = 0; t < 10; t++) {
                        var e = new i.default;
                        e.playerId = "T00" + (t + 1).toString(), e.playerName = "TestPlayer-" + e.playerId, e.playerRank = t + 1, e.playerScore = 100 - 10 * t, this.friendRankList.push(e)
                    }
                }, t.prototype.SetScoreToGloalRank = function (t, e) {
                    n.default.IsFBSupport() && this.globalRank.setScoreAsync(t, e)
                }, t.prototype.SetScoreToWeeklyRank = function (t, e) {
                    n.default.IsFBSupport() && this.weeklyRank.setScoreAsync(t, e)
                }, t = __decorate([c], t)
            }());
        o.default = l, cc._RF.pop()
    }, {
        "../Logger/Logger": "Logger",
        "./Facebook": "Facebook",
        "./FacebookPlayerInfoInRank": "FacebookPlayerInfoInRank",
        "./FacebookPlayerPicDic": "FacebookPlayerPicDic"
    }],
    FacebookStorage: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "dd815yg35pLSaPsgD1XHR6W", "FacebookStorage"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = t("./Facebook"), a = t("../Logger/Logger"), i = function () {
            function t() {
            }
            return t.prototype.LoadDataFormFB = function (t, e, o) {
                n.default.IsApiSupport("player.getDataAsync") && FBInstant.player.getDataAsync(t).then(function (t) {
                    a.default.log("data is loaded"), e && e(t), this.fbStorageLoadFinish = !0
                }.bind(this)).catch(function (t) {
                    a.default.error("failed : " + t.code + " :: " + t.message), o && o()
                })
            }, t.prototype.SaveDataToFB = function (t, e, o) {
                n.default.IsApiSupport("player.setDataAsync") && FBInstant.player.setDataAsync(t).then(function () {
                    a.default.log("Data Presaved"), e && e()
                }.bind(this)).catch(function (t) {
                    a.default.error("failed : " + t.code + " :: " + t.message), o && o()
                })
            }, t.prototype.FlushData = function (t, e) {
                n.default.IsApiSupport("player.flushDataAsync") && FBInstant.player.flushDataAsync().then(function () {
                    a.default.log("Data persisted to FB!"), t && t()
                }.bind(this)).catch(function (t) {
                    a.default.error("failed : " + t.code + " :: " + t.message), e && e()
                })
            }, t
        }();
        o.default = i,cc._RF.pop()
    }, {"../Logger/Logger": "Logger", "./Facebook": "Facebook"}],
    Facebook: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "bc5e92J2FBHa41XA31wqzKM", "Facebook"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = t("./FacebookAd"), a = t("./FacebookAnalytics"), i = t("./FacebookPlatform"), s = t("../Logger/Logger"),
            r = t("../MsgSystem/MsgSystem"), c = t("../MsgSystem/MsgDefine"), l = function () {
                function t() {
                }

                return t.Init = function () {
                    t.IsFBSupport() && (t.supportApi = FBInstant.getSupportedAPIs(), s.default.log(t.supportApi)), t.GenerateSubObj()
                }, t.GenerateSubObj = function () {
                    t.FBPlatformInfo = new i.default, t.FBAd = new n.default
                }, t.IsFBSupport = function () {
                    return "undefined" != typeof FBInstant || (s.default.warn("FBInstant is undefined"), !1)
                }, t.IsApiSupport = function (e) {
                    if (t.IsFBSupport()) return -1 != t.supportApi.indexOf(e) || (s.default.warn("Unsupport API:", e), !1)
                }, t.SetSessionData = function (e) {
                    var o;
                    (void 0 === e && (e = null), t.IsApiSupport("setSessionData")) && (o = null != e ? e : t.defaultSessionData, FBInstant.setSessionData(o), console.log("setSessionData:", o))
                }, t.Share = function (e, o, n, i, r, c) {
                    var l;
                    t.IsApiSupport("shareAsync") && (l = e || t.defaultSharePayload, o && (l.image = o), n && (l.text = n), i && (l.data = i), FBInstant.shareAsync(l).then(function () {
                        s.default.log("Shared"), t.LogEvent(a.default.shareGameSuccess), r && r()
                    }).catch(function (e) {
                        s.default.error("failed : " + e.code + " :: " + e.message), t.LogEvent(a.default.shareGameFail), c && c(e)
                    }))
                }, t.SendCustomUpdate = function (e, o, n, a, i, r, c, l, d, u) {
                    var p;
                    t.IsApiSupport("updateAsync") && (p = e || t.defaultUpdatePayload, o && (p.cta = o), n && (p.image = n), a && (p.text = a), i && (p.template = i), r && (p.data = r), c && (p.strategy = c), l && (p.notification = l), FBInstant.updateAsync(p).then(function () {
                        s.default.log("customUpdate finish"), s.default.log(p), d && d()
                    }).catch(function (t) {
                        s.default.error("failed : " + t.code + " :: " + t.message), u && u(t)
                    }))
                }, t.SwitchAsync = function (e, o, n) {
                    t.IsApiSupport("context.switchAsync") && FBInstant.context.switchAsync(e).then(function () {
                        s.default.log("switchAsync success"), t.FBPlatformInfo.RefreshContextInfo(), o && o()
                    }.bind(this)).catch(function (t) {
                        s.default.error("failed : " + t.code + " :: " + t.message), n && n(t)
                    })
                }, t.CreateAsync = function (e, o, n) {
                    t.IsApiSupport("context.createAsync") && FBInstant.context.createAsync(e).then(function () {
                        s.default.log("createAsync success"), t.FBPlatformInfo.RefreshContextInfo(), o && o()
                    }.bind(this)).catch(function (t) {
                        s.default.error("failed : " + t.code + " :: " + t.message), n && n(t)
                    })
                }, t.ChooseAsync = function (e, o, n) {
                    t.IsApiSupport("context.chooseAsync") && FBInstant.context.chooseAsync(e).then(function () {
                        t.FBPlatformInfo.RefreshContextInfo(), o && o()
                    }).catch(function (t) {
                        s.default.error("failed : " + t.code + " :: " + t.message), "SAME_CONTEXT" == t.code && r.default.instance.SendMessage(c.default.fbAdMsg, "Cannot invite the same one"), n && n(t)
                    })
                }, t.LogEvent = function (e, o, n) {
                    t.IsApiSupport("logEvent") && FBInstant.logEvent(e, o, n)
                }, t.CanCreatorShortCut = function () {
                    t.IsApiSupport("canCreateShortcutAsync") ? FBInstant.canCreateShortcutAsync().then(function (e) {
                        t.canCreateShortcut = e
                    }) : t.canCreateShortcut = !1
                }, t.CreatorShortCut = function () {
                    t.IsFBSupport() && (t.canCreateShortcut ? FBInstant.createShortcutAsync().then(function () {
                        s.default.log("Shortcut created"), t.LogEvent(a.default.addToDesktopSuccess)
                    }).catch(function () {
                        s.default.error("Shortcut not created"), t.LogEvent(a.default.addToDesktopFail)
                    }) : s.default.error("canCreateShortcut False"))
                }, t.SetPauseCallback = function (e) {
                    t.IsApiSupport("onPause") && FBInstant.onPause(e)
                }, t.QuitGame = function (e) {
                    t.IsApiSupport("quit") && (e && e(), FBInstant.quit())
                }, t.SwitchGame = function (e, o, n) {
                    t.IsApiSupport("switchGameAsync") && FBInstant.switchGameAsync(e, o).catch(function (t) {
                        s.default.error("failed : " + t.code + " :: " + t.message), n && n()
                    })
                }, t.defaultSharePayload = {
                    intent: "SHARE",
                    image: "",
                    text: "Try this fantastic game!"
                }, t.defaultSessionData = {
                    scoutSent: !0,
                    timeZone: Math.floor((new Date).getTimezoneOffset() / 60)
                }, t.defaultUpdatePayload = {
                    action: "CUSTOM",
                    image: "",
                    text: {
                        default: "Let us play game together",
                        localizations: {zh_CN: "\u8ba9\u6211\u4eec\u4e00\u8d77\u6765\u73a9\u6e38\u620f\u5427!"}
                    },
                    template: "VILLAGE_INVASION",
                    data: {myReplayData: "..."},
                    strategy: "IMMEDIATE",
                    notification: "NO_PUSH"
                }, t.canCreateShortcut = !1, t
            }();
        o.default = l, cc._RF.pop()
    }, {
        "../Logger/Logger": "Logger",
        "../MsgSystem/MsgDefine": "MsgDefine",
        "../MsgSystem/MsgSystem": "MsgSystem",
        "./FacebookAd": "FacebookAd",
        "./FacebookAnalytics": "FacebookAnalytics",
        "./FacebookPlatform": "FacebookPlatform"
    }],
    FailedView: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "b9c1cptg/pP5KSjg93IL6Il", "FailedView"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = t("../Controllers/GameControl"), a = t("../Controllers/PlayerControl"),
            i = t("../Controllers/UIControl"), s = t("../Controllers/CameraControl"), r = t("./CommonUI"),
            c = t("./RankView"), l = t("Facebook"), d = t("GlobalConfig"), u = t("../Controllers/MapControl"),
            p = t("Logger"), h = cc._decorator, g = h.ccclass, f = h.property, y = function (t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.progressBar = null, e.num_dia = null, e.num_pre = null, e.arrow = null, e.icon_dia = null, e.ReviveBtn = null, e.CancelBtn = null, e.StageBtn = null, e.RetryBtn = null, e.progressNode = null, e.stageProgress = null, e.playerSpine = null, e.markLine = null, e.progressLabel = null, e.yougetLabel = null, e.gameOverLabel = null, e.reviveBtnFrame = [], e.mask = null, e.countDown = 10, e.isCountDown = !1, e.progressMaxTime = 1, e.progressTime = 0, e.isProgressUpdate = !1, e.stageProgressPercent = 0, e.minAnimTime = .5, e.star = 2, e
                }

                return __extends(e, t), e.prototype.onTouchBtn = function (t, e) {
                    var o = this;
                    if ("ReviveBtn" == e) cc.log("play adv"), 0 == this.star ? (p.default.analytics("ads_double_1", {player_id: FBInstant.player.getID()}), n.default.getInstance().showAdWithRetry(function () {
                        p.default.analytics("ads_double_2", {player_id: FBInstant.player.getID()}), o.AdvFinished(!0)
                    }, function () {
                        o.AdvFinished(!1)
                    })) : (a.default.getInstance().revivePlayer(), this.node.active = !1); else if ("CancelBtn" == e) this.AdvFinished(!1), this.isCountDown = !1; else if ("StageBtn" == e) {
                        var c = i.default.getInstance();
                        c.showView("CommonBg", !0), c.showView("StageView", !0), c.showView("CommonUI", !0), c.showView("BackBtnBg", !0), r.default.getInstance().AnimIn(!0), s.default.getInstance().node.active = !1, this.node.active = !1
                    } else "RetryBtn" == e && n.default.getInstance().consumeEnergy() && (p.default.analytics("ads_retry_1", {
                        // player_id: FBInstant.player.getID(),
                        type: 0
                    }), l.default.FBAd.ShowAd(d.default.FacebookAdIndex.get("INTERSTITIAL_" + d.default.packageType), function () {
                        p.default.analytics("ads_retry_2", {
                            // player_id: FBInstant.player.getID(),
                            type: 0
                        }), n.default.getInstance().restartGame(), this.node.active = !1
                    }.bind(this), function () {
                        n.default.getInstance().restartGame(), this.node.active = !1
                    }.bind(this), 5))
                }, e.prototype.onEnable = function () {
                            this.star = a.default.getInstance().playerStar,
                            // 0 == this.star ? (this.gameOverLabel.getComponent("cc.Label").string = "GAME OVER",
                            // this.ReviveBtn.getComponent("cc.Sprite").spriteFrame = this.reviveBtnFrame[0],
                            // p.default.analytics("ads_double", {player_id: FBInstant.player.getID()})) : (this.gameOverLabel.getComponent("cc.Label").string = "OOPS!",
                            // this.ReviveBtn.getComponent("cc.Sprite").spriteFrame = this.reviveBtnFrame[1], p.default.analytics("ads_revive", {player_id: FBInstant.player.getID()})),
                            this.progressBar.progress = 1,
                            this.countDown = 10,
                            this.ReviveBtn.active = !0,
                            this.CancelBtn.active = !0,
                            this.StageBtn.active = !1,
                            this.RetryBtn.active = !1,
                            this.num_dia.string = a.default.getInstance().diaNum.toString(),
                            this.num_pre.node.active = !1,
                            this.arrow.node.active = !1,
                            this.icon_dia.node.x = -60,
                            this.num_dia.node.x = 41,
                            null != c.default.getInstance() && (c.default.getInstance().isNeedRefresh = !0),
                            this.stageProgressPercent = a.default.getInstance().getPassedDis() / ((u.default.getInstance().getBeatNum() + 3) * a.default.getInstance().MOVEMENT),
                            this.AnimReady(), this.AnimPlay()
                }, e.prototype.setFBData = function () {
                    var t = n.default.getInstance().chaperId, e = n.default.getInstance().stageId,
                        o = a.default.getInstance().score, i = n.default.getInstance().getFBData(),
                        s = i.chapterInfo[t - 1].bestScore[e - 1];
                    i.chapterInfo[t - 1].bestScore[e - 1] = s > o ? s : o;
                    var r = i.chapterInfo[t - 1].star[e - 1];
                    // i.chapterInfo[t - 1].star[e - 1] = r > 0 ? r : 0, i.diamond += a.default.getInstance().diaNum, n.default.getInstance().setFBData(i), n.default.getInstance().stageLeaderBoard[t - 1][e - 1].setScoreAsync(o, "")
                }, e.prototype.onDisable = function () {
                    this.isCountDown = !1, this.isProgressUpdate = !1
                }, e.prototype.update = function (t) {
                    if (this.isCountDown) {
                        this.countDown -= t;
                        var e = 1 - this.countDown / 10;
                        e >= 1 && (e = 1, this.progressBar.progress = 0, this.AdvFinished(!1), this.isCountDown = !1), this.progressBar.progress = 1 - e
                    }
                    if (this.isProgressUpdate) {
                        this.progressTime += t;
                        var o = this.progressTime / this.progressMaxTime;
                        this.stageProgressPercent < this.minAnimTime && (o = this.progressTime / this.minAnimTime * this.stageProgressPercent), o > this.stageProgressPercent && (o = this.stageProgressPercent, this.isProgressUpdate = !1, this.playerSpine.timeScale = 0), this.stageProgress.progress = o, this.progressLabel.string = Math.floor(100 * o) + "%"
                    }
                }, e.prototype.AdvFinished = function (t) {
                    this.ReviveBtn.active = !1, this.CancelBtn.active = !1, this.StageBtn.active = !0, this.RetryBtn.active = !0;
                    var e = n.default.getInstance().chaperId, o = n.default.getInstance().stageId;
                    if (this.RetryBtn.scale = 1, this.RetryBtn.stopAllActions(), 1 == e && 1 == o && this.RetryBtn.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(.5, 1.3), cc.scaleTo(.5, 1)))), this.setFBData(), t) {
                        this.num_pre.string = a.default.getInstance().diaNum.toString(), this.num_dia.string = (2 * a.default.getInstance().diaNum).toString(), this.icon_dia.node.x = -123, this.num_pre.node.x = -38, this.arrow.node.x = 44, this.num_dia.node.x = 122, this.num_pre.node.active = !0, this.arrow.node.active = !0;
                        var i = n.default.getInstance().getFBData();
                        i.diamond += a.default.getInstance().diaNum, n.default.getInstance().setFBData(i), r.default.getInstance().setGold(i.diamond)
                    }
                    p.default.analytics("ads_retry", {
                        // player_id: FBInstant.player.getID(),
                        type: 0
                    }), p.default.analytics("stage_fail", {
                        // player_id: FBInstant.player.getID(),
                        stageId: 1e3 * n.default.getInstance().chaperId + n.default.getInstance().stageId,
                        progress: this.stageProgressPercent,
                        revivetimes: this.star
                    })
                }, e.prototype.AnimReady = function () {
                    this.gameOverLabel.y = 1142, this.progressNode.active = !1, this.stageProgress.progress = 0, this.playerSpine.node.x = -239, this.markLine.x = -240, this.progressLabel.string = "0%", this.yougetLabel.active = !1, this.icon_dia.node.active = !1, this.num_dia.node.active = !1, this.ReviveBtn.active = !1, this.CancelBtn.active = !1
                }, e.prototype.AnimPlay = function () {
                    this.playerSpine.skeletonData = a.default.getInstance().playerSpine.skeletonData, this.playerSpine.animation = "run", this.playerSpine.timeScale = 1;
                    var t = n.default.getInstance().chaperId, e = n.default.getInstance().stageId, o = function () {
                        this.progressTime = 0;
                        var t = this.stageProgressPercent * this.progressMaxTime;
                        t < this.minAnimTime && (t = this.minAnimTime), this.isProgressUpdate = !0, this.playerSpine.node.runAction(cc.moveBy(t, cc.v2(this.stageProgressPercent * this.stageProgress.totalLength, 0))), this.markLine.runAction(cc.moveBy(t, cc.v2(this.stageProgressPercent * this.stageProgress.totalLength, 0))), this.progressNode.active = !0
                    }.bind(this), i = function () {
                        this.yougetLabel.active = !0, this.scheduleOnce(function () {
                            this.icon_dia.node.active = !0, this.num_dia.node.active = !0
                        }.bind(this), .05), 1 == t && 1 == e ? this.AdvFinished(!1) : (this.ReviveBtn.active = !0, this.progressBar.progress = 1, this.countDown = 10, this.ReviveBtn.scale = .1, this.isCountDown = !0, this.ReviveBtn.runAction(cc.scaleTo(.25, 1)), this.CancelBtn.active = !0, this.CancelBtn.runAction(cc.scaleTo(.25, 1)))
                    }.bind(this);
                    this.gameOverLabel.runAction(cc.sequence(cc.moveTo(.25, cc.v2(0, 392)), cc.callFunc(o), cc.spawn(cc.moveBy(.05, cc.v2(.05 * 3, -13)), cc.scaleTo(.05 * 3, 1.05)), cc.scaleTo(.25, 1), cc.delayTime(.25), cc.callFunc(i)))
                }, __decorate([f(cc.ProgressBar)], e.prototype, "progressBar", void 0), __decorate([f(cc.Label)], e.prototype, "num_dia", void 0), __decorate([f(cc.Label)], e.prototype, "num_pre", void 0), __decorate([f(cc.Sprite)], e.prototype, "arrow", void 0), __decorate([f(cc.Sprite)], e.prototype, "icon_dia", void 0), __decorate([f(cc.Node)], e.prototype, "ReviveBtn", void 0), __decorate([f(cc.Node)], e.prototype, "CancelBtn", void 0), __decorate([f(cc.Node)], e.prototype, "StageBtn", void 0), __decorate([f(cc.Node)], e.prototype, "RetryBtn", void 0), __decorate([f(cc.Node)], e.prototype, "progressNode", void 0), __decorate([f(cc.ProgressBar)], e.prototype, "stageProgress", void 0), __decorate([f(sp.Skeleton)], e.prototype, "playerSpine", void 0), __decorate([f(cc.Node)], e.prototype, "markLine", void 0), __decorate([f(cc.Label)], e.prototype, "progressLabel", void 0), __decorate([f(cc.Node)], e.prototype, "yougetLabel", void 0), __decorate([f(cc.Node)], e.prototype, "gameOverLabel", void 0), __decorate([f(cc.SpriteFrame)], e.prototype, "reviveBtnFrame", void 0), __decorate([f(cc.Node)], e.prototype, "mask", void 0), e = __decorate([g], e)
            }(cc.Component);
        o.default = y, cc._RF.pop()
    }, {
        "../Controllers/CameraControl": "CameraControl",
        "../Controllers/GameControl": "GameControl",
        "../Controllers/MapControl": "MapControl",
        "../Controllers/PlayerControl": "PlayerControl",
        "../Controllers/UIControl": "UIControl",
        "./CommonUI": "CommonUI",
        "./RankView": "RankView",
        Facebook: "Facebook",
        GlobalConfig: "GlobalConfig",
        Logger: "Logger"
    }],
    Form: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "5dde7qalZlHs7jtGmWcd33e", "Form"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = cc._decorator, a = n.ccclass, i = (n.property, function () {
            function t() {
                this.keys = new Array, this.values = new Array
            }

            return t.prototype.Set = function (t, e) {
                null == this.values[t] && this.keys.push(t), this.values[t] = e
            }, t.prototype.SetArray = function (t, e) {
                null == this.values[t] && this.keys.push(t), this.values[t] = e
            }, t.prototype.Get = function (t) {
                return this.values[t]
            }, t.prototype.GetArray = function (t) {
                return this.values[t]
            }, t.prototype.Remove = function (t) {
                this.values[t] = null
            }, t.prototype.IsEmpty = function () {
                return 0 == this.keys.length
            }, t.prototype.Size = function () {
                return this.keys.length
            }, t.prototype.ToRequestPrama = function () {
                var t = "?";
                t = "?";
                for (var e = 0; e < this.keys.length; e++) if (e > 0 && (t += "&"), Array.isArray(this.values[this.keys[e]])) {
                    var o = this.values[this.keys[e]];
                    t += this.keys[e] + "=";
                    for (var n = 0; n < o.length; n++) n > 0 && (t += ","), t += o[n]
                } else t += this.keys[e] + "=" + this.values[this.keys[e]];
                return t
            }, t = __decorate([a], t)
        }());
        o.default = i, cc._RF.pop()
    }, {}],
    GMView: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "223a3SchLNKfLXvMJHnEi/0", "GMView"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = t("../Controllers/GameControl"), a = t("./CommonUI"), i = cc._decorator, s = i.ccclass,
            r = (i.property, function (t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.diamond = 0, e
                }

                return __extends(e, t), e.prototype.setDiamond = function () {
                    var t = n.default.getInstance().getFBData();
                    t.diamond = this.diamond, n.default.getInstance().setFBData(t), a.default.getInstance().refreshGold(), console.log("set Diamond ", t.diamond)
                }, e.prototype.setTili = function () {
                    var t = n.default.getInstance().getFBData();
                    t.energy = 15, n.default.getInstance().setFBData(t), a.default.getInstance().setEnergy(15), console.log("set Tili ")
                }, e.prototype.resetUserData = function () {
                    console.log("reset user data"), n.default.getInstance().clearUserCloudData()
                }, e.prototype.onEditBoxChange = function (t, e) {
                    var o = parseFloat(t.string);
                    isNaN(o) && (o = 0), this.diamond = o
                }, e.prototype.close = function () {
                    this.node.active = !1
                }, e = __decorate([s], e)
            }(cc.Component));
        o.default = r, cc._RF.pop()
    }, {"../Controllers/GameControl": "GameControl", "./CommonUI": "CommonUI"}],
    GameBackground: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "f2180nGCDJDVauT/iQ+tHy3", "GameBackground"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = t("../Controllers/PlayerControl"), a = cc._decorator, i = a.ccclass, s = a.property, r = function (t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.bgSprite = [], e.animNode = null, e.spriteIndex = 0, e.nodePool = null, e.beatPool = null, e.player = null, e.count = 0, e.isPaused = !0, e.rotationDirection = 0, e.NEED_NUM = 6, e.PRECREATENUM = 20, e.MAX_SCALE = 1, e.MIN_TIME = 3, e.MAX_TIME = 6, e.ROW = 8, e.COL = 14, e.DISTANCE = 300, e.passedTime = 0, e.beatTime = 0, e.heartBeat = !1, e.bgCondition = [], e.newCircle = [], e.randomMoveMulti = 90, e
            }

            var o;
            return __extends(e, t), o = e, e.getInstance = function () {
                return o.instance
            }, e.prototype.onLoad = function () {
                null == o.instance ? o.instance = this : o.instance != this && this.destroy(), this.nodePool = new cc.NodePool, this.beatPool = new cc.NodePool, this.resetBgCondition()
            }, e.prototype.setSpriteIndexAndSpeed = function (t, e, o) {
                if (this.nodePool.clear(), this.beatPool.clear(), this.newCircle = [], this.animNode.removeAllChildren(), this.count = 0, this.bgColor = o, this.spriteIndex = Math.floor(Math.random() * this.bgSprite.length), this.spriteIndex = this.spriteIndex > this.bgSprite.length - 1 ? this.bgSprite.length - 1 : this.spriteIndex, t >= 0 && t < this.bgSprite.length && e > 0) for (var a = 0; a < this.ROW * this.COL; a++) {
                    var i = cc.instantiate(this.bgSprite[this.spriteIndex]);
                    i.active = !0, this.nodePool.put(i)
                } else console.log("GameBackground param is wrong", t, e);
                this.beatTime = n.default.getInstance().getBeatTime(), this.player = n.default.getInstance(), this.heartBeat = !1, this.passedTime = 0, this.preCreate()
            }, e.prototype.preCreate = function () {
                for (var t = cc.v2(-this.ROW * this.DISTANCE / 2, -this.COL * this.DISTANCE / 2), e = 0; e < this.ROW * this.COL; e++) if (e % 2 != 1) {
                    var o = this.nodePool.get();
                    null == o && (o = cc.instantiate(this.bgSprite[this.spriteIndex])), o.active = !0, o.scale = .2 + 1.3 * Math.pow(Math.random(), 3), o.opacity = 2.55 * (5 + o.scale / 2 * 10 + (3 - 6 * Math.random())), o.rotation = 180 * Math.random(), o.position = cc.v2(t.x + 300 * (e % this.ROW + Math.random()), t.y + 300 * (Math.floor(e / this.ROW) + Math.random())), this.animNode.addChild(o), o.randomMoveVec = cc.v2((.5 - Math.random()) * this.randomMoveMulti * o.scale, (.5 - Math.random()) * this.randomMoveMulti * o.scale)
                }
            }, e.prototype.reset = function () {
                this.node.rotation = 0, this.node.position = cc.v2(0, 0), this.animNode.position = cc.v2(0, 0), this.heartBeat = !1, this.passedTime = 0
            }, e.prototype.pauseGameBg = function (t) {
                if (t) for (var e = 0, o = this.animNode.children; e < o.length; e++) {
                    o[e].pauseAllActions()
                } else for (var n = 0, a = this.animNode.children; n < a.length; n++) {
                    a[n].resumeAllActions()
                }
            }, e.prototype.changeGameBgMove = function (t) {
                if (0 == t) for (var e = 0, o = this.animNode.children; e < o.length; e++) {
                    var n = o[e];
                    s = (s = cc.v2(0, -this.player.speed * (.25 + n.scale / 8))).add(n.randomMoveVec), n.stopActionByTag(1e4), (r = cc.repeatForever(cc.moveBy(1, s))).setTag(1e4), n.runAction(r)
                } else if (1 == t) for (var a = 0, i = this.animNode.children; a < i.length; a++) {
                    var s, r;
                    n = i[a];
                    s = (s = cc.v2(this.player.speed * (.25 + n.scale / 8), 0)).add(n.randomMoveVec), n.stopActionByTag(1e4), (r = cc.repeatForever(cc.moveBy(1, s))).setTag(1e4), n.runAction(r)
                }
            }, e.prototype.startHeartBeat = function () {
                for (var t = 0, e = this.animNode.children; t < e.length; t++) {
                    var o = e[t],
                        n = cc.repeatForever(cc.sequence(cc.scaleTo(.75 * this.beatTime, o.scale), cc.delayTime(this.beatTime), cc.scaleTo(.25 * this.beatTime, 1.1 * o.scale)));
                    o.runAction(n), o.runAction(cc.repeatForever(cc.rotateBy(1, 50 - 100 * Math.random())))
                }
                this.heartBeat = !0, this.schedule(this.syncBeatHeart, 2 * this.beatTime), console.log("start HeartBeat")
            }, e.prototype.syncBeatHeart = function () {
                for (; this.newCircle.length > 0;) {
                    var t = this.newCircle.pop(),
                        e = cc.repeatForever(cc.sequence(cc.scaleTo(.75 * this.beatTime, t.scale), cc.delayTime(this.beatTime), cc.scaleTo(.25 * this.beatTime, 1.1 * t.scale)));
                    t.runAction(e), t.runAction(cc.repeatForever(cc.rotateBy(1, 50 - 100 * Math.random())))
                }
            }, e.prototype.resetBgCondition = function () {
                for (var t = 0; t < this.ROW; t++) {
                    this.bgCondition[t] = [];
                    for (var e = 0; e < this.COL; e++) this.bgCondition[t][e] = 0
                }
            }, e.prototype.addCircle = function (t, e) {
                var o = cc.v2(-this.ROW * this.DISTANCE / 2, -this.COL * this.DISTANCE / 2), n = this.nodePool.get();
                null == n && (n = cc.instantiate(this.bgSprite[this.spriteIndex])), n.active = !0, n.stopAllActions(), n.scale = .2 + 1.3 * Math.pow(Math.random(), 3), n.opacity = 2.55 * (5 + n.scale / 2 * 10 + (3 - 6 * Math.random())), n.position = cc.v2(o.x + 300 * t, o.y + 300 * e), this.animNode.addChild(n), n.randomMoveVec = cc.v2((.5 - Math.random()) * this.randomMoveMulti * n.scale, (.5 - Math.random()) * this.randomMoveMulti * n.scale), this.newCircle.push(n)
            }, e.prototype.checkBgConditionAndAddCircle = function () {
                for (var t = 0; t < this.COL; t++) 0 == this.bgCondition[0][t] && t % 2 == 0 && this.addCircle(0, t);
                for (t = 1; t < this.ROW; t++) 0 == this.bgCondition[t][this.COL - 1] && t % 2 == 0 && this.addCircle(t, this.COL - 1)
            }, e.prototype.update = function (t) {
                this.heartBeat && (this.passedTime += t), null != this.player && (this.node.position = this.player.node.position), this.resetBgCondition();
                for (var e = 0, o = this.animNode.children; e < o.length; e++) {
                    var n = o[e], a = this.node.convertToWorldSpaceAR(n.position);
                    if (a.x > 1600 || a.y < -1390 || a.x < -800 || a.y > 2810) this.nodePool.put(n); else {
                        var i = a.x + 800, s = a.y + 1390;
                        this.bgCondition[Math.floor(i / 300)][Math.floor(s / 300)] += 1
                    }
                }
                this.passedTime > .3 && (this.checkBgConditionAndAddCircle(), this.passedTime = 0)
            }, e.instance = null, __decorate([s(cc.Node)], e.prototype, "bgSprite", void 0), __decorate([s(cc.Node)], e.prototype, "animNode", void 0), e = o = __decorate([i], e)
        }(cc.Component);
        o.default = r, cc._RF.pop()
    }, {"../Controllers/PlayerControl": "PlayerControl"}],
    GameControl: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "7f3d9j2fllJdoBJhPGxRgZ9", "GameControl"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = t("./CameraControl"), a = t("./PlayerControl"), i = t("./TerrainControl"), s = t("./UIControl"),
            r = t("./SoundControl"), c = t("./MapControl"), l = t("../Framework/Facebook/FacebookPlayerInfoInRank"),
            d = t("../Framework/Facebook/FacebookPlayerPicDic"), u = t("../Views/GameBackground"),
            p = t("../Views/LoadingView"), h = t("GlobalConfig"), g = t("../Views/CommonUI"),
            f = t("../Views/TipsView"), y = t("../Data/Constants"), m = t("../Views/LevelView"),
            v = t("../Views/TitleView"), I = t("Facebook"), _ = t("Logger"), C = t("MsgSystem"), b = t("MsgDefine"),
            S = cc._decorator, T = S.ccclass, w = S.property, B = function (t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.musicTitle = null, e.musicSubTitle = null, e.shrarePic = null, e.isPause = !1, e.url = "", e.playerInfo = null, e.chaperId = 0, e.stageId = 0, e.stageData = null, e.CHAPTERNUM = 1, e.NEED_LOAD_DATA_COUNT = 0, e.loadCount = 0, e.firstLoadFinished = !1, e.isGuideShowed = !1, e.isFirstPlay = !1, e.stageLeaderBoard = null, e.stageLeaderBoardEntries = null, e.totalLeaderBoard = null, e.totalLeaderBoardEntries = null, e.texture = null, e.energyTimeStamp = 0, e.energyInterval = 3, e.energyMax = 15, e.energyCD = 0, e.isEnergyCd = !1, e.expBase = 200, e.expIncrease = 20, e.level = 1, e.maxLevel = 7, e.expAddInfo = [], e.showFailedMsg = !0, e
                }

                var o;
                return __extends(e, t), o = e, e.getInstance = function () {
                    return o.instance
                }, e.prototype.onLoad = function () {
                    null == o.instance ? o.instance = this : o.instance != this && this.destroy(), cc.log("GameController onLoad"), cc.view.enableRetina(!0), cc.view.resizeWithBrowserSize(!0), cc.director.getCollisionManager().enabled = !0, this.stageLeaderBoard = [], this.stageLeaderBoardEntries = []
                }, e.prototype.start = function () {
                    console.log("====", this.node);
                    s.default.getInstance().showView("CommonBg", !0), s.default.getInstance().showView("TitleView", !0), this.initGame(), this.schedule(function () {
                        _.default.analytics("heartbeat", {})
                    }, 30)
                }, e.prototype.initGame = function () {
                    this.initFBPlayerData();
                    // console.log("contextId", FBInstant.context.getID()), 
                    // this.getTotalRankData();
                    for (var t = 0; t < this.CHAPTERNUM; t++) {
                        this.stageLeaderBoard[t] = [];
                        this.stageLeaderBoardEntries[t] = []
                    }
                    this.initAdListener()
                }, e.prototype.initAdListener = function () {
                    C.default.instance.AddListener(b.default.fbAdMsg, function (t) {
                        this.showFailedMsg && f.default.getInstance().showTips(t)
                    }.bind(this)), C.default.instance.AddListener(b.default.onFBAdPlayStart, function (t) {
                        s.default.getInstance().showView("LoadingView2", !0)
                    }), C.default.instance.AddListener(b.default.onFBAdPlayEnd, function (t) {
                        s.default.getInstance().showView("LoadingView2", !1)
                    })
                }, e.prototype.showAdWithRetry = function (t, e) {
                    o.getInstance().showFailedMsg = !1, I.default.FBAd.AutoPlay(function () {
                        t && t()
                    }.bind(this), function () {
                        var n = this;
                        o.getInstance().showFailedMsg = !0, I.default.FBAd.isCdLock() || (s.default.getInstance().showView("LoadingView2", !0), this.scheduleOnce(function () {
                            I.default.FBAd.AutoPlay(function () {
                                t && t()
                            }.bind(n), function () {
                                e && e()
                            }.bind(n))
                        }, 3))
                    }.bind(this))
                }, e.prototype.showAdWithMsg = function (t, e, n) {
                    o.getInstance().showFailedMsg = t, I.default.FBAd.AutoPlay(function () {
                        e && e()
                    }.bind(this), function () {
                        n && n()
                    }.bind(this))
                }, e.prototype.LoadFBDataFinished = function () {

                    
                    this.firstLoadFinished || (this.loadCount++, console.log("load count", this.loadCount), this.loadCount >= this.NEED_LOAD_DATA_COUNT && (this.firstLoadFinished = !0, this.refreshEnergy(), v.default.getInstance().initializeFinished(), s.default.getInstance().showView("CommonUI", !0)))
                }, e.prototype.initFBPlayerData = function () {
                    var t = wxHelper.getLocalData(["diamond", "chapterInfo", "skinInfo", "skinId", "firstPlay", "energy", "energyTimeStamp", "exp", "guideShow"]);
                    console.log("playerData is loaded", t.firstPlay), null == t.firstPlay || 1 == t.firstPlay ? (console.log("firstLogin"), this.isFirstPlay = !0, t = {
                        diamond: 0,
                        chapterInfo: [{state: [1, 1, 1], bestScore: [0, 0, 0], star: [0, 0, 0]}],
                        skinInfo: [1, 0, 0],
                        skinId: 0,
                        firstPlay: 0,
                        energy: 15,
                        energyTimeStamp: 0,
                        exp: 0,
                        guideShow: 0
                    },
                        wxHelper.saveLocalData(t),
                            console.log("playerData is set"),
                        // FBInstant.player.setDataAsync(t).then(function () {
                        //     console.log("playerData is set")
                        // }),
                        _.default.analytics("new_player", {
                            player_id: "",
                            player_name:""/* FBInstant.player.getName()*/,
                            // player_region: FBInstant.getLocale()
                        }),
                    I.default.FBPlatformInfo.entryPointData && I.default.FBPlatformInfo.entryPointData.player_id && _.default.analytics("new_player_fromShare", {
                        player_id: /*FBInstant.player.getID()*/"",
                        sharer_id: I.default.FBPlatformInfo.entryPointData.player_id
                    })) : console.table(t), this.playerInfo = t, _.default.analytics("login", {
                        player_id: /*FBInstant.player.getID()*/"",
                        player_name: ""/*FBInstant.player.getName()*/,
                        // player_region: FBInstant.getLocale()
                    }), null == this.playerInfo.exp && (this.playerInfo.exp = 0);
                    this.refreshLv(), this.refreshOpenState(1), this.LoadFBDataFinished()
                    // FBInstant.player.getDataAsync(["diamond", "chapterInfo", "skinInfo", "skinId", "firstPlay", "energy", "energyTimeStamp", "exp", "guideShow"]).then(function (t) {
                    //     console.log("playerData is loaded", t.firstPlay), null == t.firstPlay || 1 == t.firstPlay ? (console.log("firstLogin"), this.isFirstPlay = !0, t = {
                    //         diamond: 0,
                    //         chapterInfo: [{state: [1, 1, 1], bestScore: [0, 0, 0], star: [0, 0, 0]}],
                    //         skinInfo: [1, 0, 0],
                    //         skinId: 0,
                    //         firstPlay: 0,
                    //         energy: 15,
                    //         energyTimeStamp: 0,
                    //         exp: 0,
                    //         guideShow: 0
                    //     },
                    //         FBInstant.player.setDataAsync(t).then(function () {
                    //         console.log("playerData is set")
                    //     }),
                    //         _.default.analytics("new_player", {
                    //         player_id: FBInstant.player.getID(),
                    //         player_name: FBInstant.player.getName(),
                    //         player_region: FBInstant.getLocale()
                    //     }),
                    //     I.default.FBPlatformInfo.entryPointData && I.default.FBPlatformInfo.entryPointData.player_id && _.default.analytics("new_player_fromShare", {
                    //         player_id: FBInstant.player.getID(),
                    //         sharer_id: I.default.FBPlatformInfo.entryPointData.player_id
                    //     })) : console.table(t), this.playerInfo = t, _.default.analytics("login", {
                    //         player_id: FBInstant.player.getID(),
                    //         player_name: FBInstant.player.getName(),
                    //         player_region: FBInstant.getLocale()
                    //     }), null == this.playerInfo.exp && (this.playerInfo.exp = 0);
                    //     this.refreshLv(), this.refreshOpenState(1), this.LoadFBDataFinished()
                    // }.bind(this)).catch(function (t) {
                    //     console.log("getData Err" + t.message)
                    // })
                }, e.prototype.refreshEnergy = function () {
                    var t = Math.floor((new Date).getTime() / 1e3);
                    if (null == this.playerInfo.energy) this.playerInfo.energy = 10, this.playerInfo.energyTimeStamp = t; else if (this.playerInfo.energy < this.energyMax) {
                        var e = t - this.playerInfo.energyTimeStamp, o = Math.floor(e / 60 / this.energyInterval);
                        this.playerInfo.energy += o, this.playerInfo.energy >= this.energyMax ? this.playerInfo.energy = this.energyMax : (this.energyCD = (1 + o) * this.energyInterval * 60 - e, this.isEnergyCd = !0), this.setFBData(this.playerInfo)
                    }
                    g.default.getInstance() && g.default.getInstance().setEnergy(this.playerInfo.energy)
                }, e.prototype.consumeEnergy = function () {
                    return this.playerInfo.energy <= 0 ? (this.playerInfo.energy = 0, f.default.getInstance().showTips("Energy is empty."), !1) : (this.playerInfo.energy--, this.isEnergyCd || (this.isEnergyCd = !0, this.playerInfo.energyTimeStamp = Math.floor((new Date).getTime() / 1e3), this.energyCD = 60 * this.energyInterval), this.setFBData(this.playerInfo), g.default.getInstance() && g.default.getInstance().setEnergy(this.playerInfo.energy), !0)
                }, e.prototype.logGamePlay = function () {
                    _.default.analytics("stage_play", {
                        player_id: ""/*FBInstant.player.getID()*/,
                        stageId: 1e3 * this.chaperId + this.stageId
                    })
                }, e.prototype.addExp = function (t) {
                    if (this.level >= this.maxLevel) return !1;
                    null == this.playerInfo.exp && (this.playerInfo.exp = 0);
                    var e = this.getLvNum(this.playerInfo.exp), o = this.getExpSub(this.playerInfo.exp, e),
                        n = this.getNextExp(e), a = {level: e + 1, sub: o, next: n};
                    this.playerInfo.exp += t;
                    var i = {
                        level: (e = this.getLvNum(this.playerInfo.exp)) + 1,
                        sub: o = this.getExpSub(this.playerInfo.exp, e),
                        next: n = this.getNextExp(e)
                    };
                    return this.expAddInfo.prevData = a, this.expAddInfo.endData = i, this.setFBData(this.playerInfo), this.refreshLv(), this.refreshOpenState(1), !0
                }, e.prototype.refreshOpenState = function (t) {
                }, e.prototype.refreshLv = function () {
                    null == this.playerInfo.exp && (this.playerInfo.exp = 0);
                    var t = this.getLvNum(this.playerInfo.exp);
                    this.level = t + 1;
                    var e = this.getNextExp(t), o = this.getExpSub(this.playerInfo.exp, t);
                    g.default.getInstance() && g.default.getInstance().refreshLv(this.level, o / e), m.default.getInstance() && m.default.getInstance().refreshLevelView(this.level, o, e)
                }, e.prototype.getLvNum = function (t) {
                    return Math.floor((this.expIncrease - 2 * this.expBase + Math.sqrt(Math.pow(2 * this.expBase - this.expIncrease, 2) - 4 * this.expIncrease * (-2 * t))) / (2 * this.expIncrease))
                }, e.prototype.getExpSub = function (t, e) {
                    return t - (e * this.expBase + e * (e - 1) * this.expIncrease / 2)
                }, e.prototype.getNextExp = function (t) {
                    return this.expBase + this.expIncrease * t
                }, e.prototype.getLevelUpData = function () {
                    return this.expAddInfo
                }, e.prototype.clearUserCloudData = function () {
                    this.playerInfo.diamond = 0;
                    for (var t = this.playerInfo.chapterInfo[0], e = 0; e < t.state.length; e++) t.state[e] = 0 == e || 1 == e || 2 == e ? 1 : 0;
                    for (e = 0; e < t.bestScore.length; e++) t.bestScore[e] = 0;
                    for (e = 0; e < t.star.length; e++) t.star[e] = 0;
                    for (e = 0; e < this.playerInfo.skinInfo.length; e++) this.playerInfo.skinInfo[e] = 0 == e ? 1 : 0;
                    this.playerInfo.skinId = 0, this.playerInfo.firstPlay = 1, this.playerInfo.energy = 10, this.playerInfo.energyTimeStamp = 0, this.playerInfo.guideShow = 0, FBInstant.player.setDataAsync(this.playerInfo).then(function () {
                        console.log("Data Presaved"), this.isFirstPlay = !0
                    }.bind(this)).catch(function (t) {
                        console.log("failed : " + t.code + " :: " + t.message)
                    })
                }, e.prototype.getFBData = function () {
                    return this.playerInfo
                }, e.prototype.getStageOpenState = function (t) {
                    return this.playerInfo.chapterInfo[t - 1].state
                }, e.prototype.getStageStarInfo = function (t) {
                    return this.playerInfo.chapterInfo[t - 1].star
                }, e.prototype.getShopOpenState = function () {
                    return this.playerInfo.skinInfo
                }, e.prototype.syncFBData = function () {
                    this.setFBData(this.playerInfo)
                }, e.prototype.setFBData = function (t) {
                    this.playerInfo = t;
                    wxHelper.saveLocalData(t);
                    // FBInstant.player.setDataAsync(t).then(function () {
                    //     console.log("playerData is set")
                    // });
                    for (var e = 0, o = 0, n = this.playerInfo.chapterInfo; o < n.length; o++) for (var a = 0, i = n[o].star; a < i.length; a++) {
                        e += i[a]
                    }
                    // this.totalLeaderBoard.setScoreAsync(e, "").then(function (t) {
                    //     this.getTotalRankData()
                    // }.bind(this))
                }, e.prototype.FBShare = function (t, e, o, n) {
                    I.default.Share(void 0, this.getImgBase64(this.shrarePic.spriteFrame.getTexture().getHtmlElementObj()), e, {player_id: ""/*FBInstant.player.getID()*/}, o, n)
                }, e.prototype.getImgBase64 = function (t) {
                    var e = document.createElement("canvas"), o = e.getContext("2d");
                    return e.width = t.width, e.height = t.height, o.drawImage(t, 0, 0, t.width, t.height), e.toDataURL()
                }, e.prototype.getTotalRankData = function () {
                    FBInstant.getLeaderboardAsync("leaderboard_totalscore").then(function (t) {
                        this.totalLeaderBoard = t, this.totalLeaderBoard.getConnectedPlayerEntriesAsync(100, 0).then(function (t) {
                            this.totalLeaderBoardEntries = [], this.FullRank(t, this.totalLeaderBoardEntries), this.LoadFBDataFinished()
                        }.bind(this)).catch(function (t) {
                            console.log("failed1 : " + t.code + " :: " + t.message)
                        })
                    }.bind(this)).catch(function (t) {
                        console.log("failed2 : " + t.code + " :: " + t.message)
                    })
                }, e.prototype.getStageRankData = function (t, e) {
                    var o = "lb_stage_";
                    // "PRERELEASE" != h.default.packageType && "PLACEMENT" != h.default.packageType || (o = "leaderboard_stage_"), FBInstant.getLeaderboardAsync(o + e + "_" + t).then(function (o) {
                    //     this.stageLeaderBoard[e - 1][t - 1] = o, o.getConnectedPlayerEntriesAsync(30, 0).then(function (o) {
                    //         this.stageLeaderBoardEntries[e - 1][t - 1] = [], this.FullRank(o, this.stageLeaderBoardEntries[e - 1][t - 1]), console.log("get stage rank successs")
                    //     }.bind(this)).catch(function (t) {
                    //         console.log("failed1 : " + t.code + " :: " + t.message)
                    //     })
                    // }.bind(this)).catch(function (t) {
                    //     console.log("failed2 : " + t.code + " :: " + t.message)
                    // })
                }, e.prototype.setStageRankData = function (t, e, o, n) {
                    this.stageLeaderBoard[n - 1][o - 1].setScoreAsync(t, e)
                }, e.prototype.setTotalRankData = function (t, e) {
                    this.totalLeaderBoard.setScoreAsync(t, e)
                }, e.prototype.FullRank = function (t, e, o, n) {
                    void 0 === o && (o = !1), void 0 === n && (n = !1);
                    for (var a = 0; a < t.length; a++) {
                        var i = new l.default;
                        i.playerId = t[a].getPlayer().getID(), i.playerName = t[a].getPlayer().getName(), i.playerRank = t[a].getRank(), i.playerScore = t[a].getScore(), i.playerPicUrl = t[a].getPlayer().getPhoto(), e.push(i), d.default.AddToPlayerPicDic(i.playerId, i.playerPicUrl), i.playerPic = d.default.GetPlayerPic(i.playerId)
                    }
                }, e.prototype.showStartView = function () {
                    n.default.getInstance().node.active = !0, n.default.getInstance().focusOnPlayer(), n.default.getInstance().resetGameCamera();
                    var t = i.default.getInstance();
                    t.cleanTerrain(), t.mapType = 0, t.reset();
                    var e = a.default.getInstance();
                    e.resetPlayer(), e.setSpeedByBpm(200), e.autoPlay(!0), e.showAvator(!0), e.setSpineAnimation("run"), t.createBeginTerrain(e.node.getPosition(), 0), t.preCreateTerrrain(), s.default.getInstance().showView("TitleView", !0), this.pauseGame(!1)
                }, e.prototype.restartGame = function () {
                    n.default.getInstance().node.active = !0, n.default.getInstance().focusOnPlayer(), n.default.getInstance().resetGameCamera();
                    var t = s.default.getInstance();
                    t.showView("CommonBg", !1), t.showView("StageView", !1), t.showView("CommonUI", !1), t.showView("BackBtnBg", !1);
                    var e = i.default.getInstance(), o = c.default.getInstance();
                    e.mapType = 1, e.cleanTerrain(), e.reset(), e.setMovement(o.movement), e.createBeginTerrain(cc.v2(0, 0), 1), e.setTerrainData(o.getTerrainData()), e.preCreateTerrrain();
                    var l = a.default.getInstance();
                    l.autoPlay(!1), l.showAvator(!0), l.setPlayerAvator(parseInt(this.playerInfo.skinId)), l.resetPlayer(), l.setWaitBeats(o.waitBeats), l.setMovement(o.movement), l.setSpeedByBpm(o.bpm), r.default.getInstance().offset = o.getOffset(), s.default.getInstance().showView("startNode", !0), s.default.getInstance().showView("GameView", !0), this.pauseGame(!0), 1 != this.chaperId || 1 != this.stageId || null != this.playerInfo.guideShow && 0 != this.playerInfo.guideShow || t.showView("GuideView", !0)
                }, e.prototype.pauseGame = function (t) {
                    a.default.getInstance().pausePlayer(t), i.default.getInstance().pauseTerrain(t), this.isPause = t, this.isPause ? r.default.getInstance().pauseBGM() : r.default.getInstance().resumeBGM(), a.default.getInstance().isAutoPlay() || u.default.getInstance().pauseGameBg(t)
                }, e.prototype.showFinished = function () {
                    s.default.getInstance().showView("ScoreView", !0)
                }, e.prototype.showFailed = function () {
                    s.default.getInstance().showView("FailedView", !0)
                }, e.prototype.showContinue = function () {
                    s.default.getInstance().showView("FailedView", !0)
                }, e.prototype.onTouchPauseBtn = function () {
                    this.pauseGame(!0), a.default.getInstance().playerSpine.paused = !0, s.default.getInstance().showView("PauseView", !0)
                }, e.prototype.LoadGameStage = function (t, e, o, n) {
                    s.default.getInstance().showView("LoadingView", !0), this.url = t, c.default.getInstance().loadMapFile(t + n.map, e, o), this.stageId = o, this.chaperId = e, this.stageData = n, this.musicTitle.string = "Lv." + this.stageData.level + " " + this.stageData.title, this.musicSubTitle.string = this.stageData.subtitle, p.default.getInstance().setCompleteCallBack(function () {
                        this.restartGame()
                    }.bind(this))
                }, e.prototype.loadMapFinished = function (t, e) {
                    this.chaperId == t && this.stageId == e && (r.default.getInstance().loadBGM(this.url + this.stageData.path, this.chaperId, this.stageId), p.default.getInstance().addPercent(.1))
                }, e.prototype.loadBGMFinished = function (t, e) {
                    this.chaperId == t && this.stageId == e && (p.default.getInstance().addPercent(.9), _.default.analytics("stage_load_finish", {
                        player_id: ""/*FBInstant.player.getID()*/,
                        stageId: 1e3 * t + e
                    }))
                }, e.prototype.getCheapestMusicDia = function () {
                    var t = y.default.getInstance().getChpater(this.chaperId).chapterInfo,
                        e = this.getStageOpenState(this.chaperId);
                    if (null != t) {
                        for (var o = -1, n = 0; n < t.length; n++) 0 != e[t[n].id - 1] && null != e[t[n].id - 1] || (-1 == o ? o = t[n].cost : t[n].cost < o && (o = t[n].cost));
                        return o
                    }
                    return -1
                }, e.prototype.checkAdPlatform = function (t) {
                    return cc.sys.isMobile ? t : "INTERSTITIAL_"
                }, e.prototype.update = function (t) {
                    this.isEnergyCd && (this.energyCD > 0 ? (this.energyCD -= t, null != g.default.getInstance() && g.default.getInstance().setEnergyCD(this.energyCD), this.playerInfo.energy >= this.energyMax && (this.isEnergyCd = !1, null != g.default.getInstance() && g.default.getInstance().setEnergyCD(0))) : (this.playerInfo.energy++, this.playerInfo.energy >= this.energyMax ? (this.isEnergyCd = !1, null != g.default.getInstance() && g.default.getInstance().setEnergyCD(0)) : (this.playerInfo.energyTimeStamp = Math.floor((new Date).getTime() / 1e3), this.energyCD = 60 * this.energyInterval), null != g.default.getInstance() && g.default.getInstance().setEnergy(this.playerInfo.energy), this.setFBData(this.playerInfo)))
                }, e.instance = null, __decorate([w(cc.Label)], e.prototype, "musicTitle", void 0), __decorate([w(cc.Label)], e.prototype, "musicSubTitle", void 0), __decorate([w(cc.Sprite)], e.prototype, "shrarePic", void 0), e = o = __decorate([T], e)
            }(cc.Component);
        o.default = B, cc._RF.pop()
    }, {
        "../Data/Constants": "Constants",
        "../Framework/Facebook/FacebookPlayerInfoInRank": "FacebookPlayerInfoInRank",
        "../Framework/Facebook/FacebookPlayerPicDic": "FacebookPlayerPicDic",
        "../Views/CommonUI": "CommonUI",
        "../Views/GameBackground": "GameBackground",
        "../Views/LevelView": "LevelView",
        "../Views/LoadingView": "LoadingView",
        "../Views/TipsView": "TipsView",
        "../Views/TitleView": "TitleView",
        "./CameraControl": "CameraControl",
        "./MapControl": "MapControl",
        "./PlayerControl": "PlayerControl",
        "./SoundControl": "SoundControl",
        "./TerrainControl": "TerrainControl",
        "./UIControl": "UIControl",
        Facebook: "Facebook",
        GlobalConfig: "GlobalConfig",
        Logger: "Logger",
        MsgDefine: "MsgDefine",
        MsgSystem: "MsgSystem"
    }],
    GameManager: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "42937TGolRE/5vQyIHtx6Gt", "GameManager"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = t("Facebook"), a = t("Logger"), i = t("MsgSystem"), s = t("MsgDefine"), r = t("GlobalConfig"),
            c = cc._decorator, l = c.ccclass, d = (c.property, c.executionOrder), u = function (t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.startStep = 0, e.testhandler = null, e
                }

                var o;
                return __extends(e, t), o = e, e.prototype.onLoad = function () {
                    o.instance = this, cc.director.getCollisionManager().enabled = !0, this.testhandler = i.default.instance.AddListener(s.default.contextInfoLoadFinish, this.CheckStartFinish.bind(this), this, 11), this.AppStart(), this.test()
                }, e.prototype.test = function () {
                }, e.prototype.start = function () {
                    a.default.log("start App")
                }, e.prototype.update = function (t) {
                }, e.prototype.onDestroy = function () {
                }, e.prototype.OnGamePause = function () {
                    a.default.log("gamePause"), cc.game.pause()
                }, e.prototype.OnGameResume = function () {
                    cc.game.resume(), a.default.log("gameResume")
                }, e.prototype.AppStart = function () {
                    n.default.Init(), n.default.FBAd.Init(r.default.FacebookAdMap), n.default.FBPlatformInfo.Init()
                }, e.prototype.CheckStartFinish = function () {
                    this.startStep++
                }, e.instance = null, e = o = __decorate([l, d(-1)], e)
            }(cc.Component);
        o.default = u, cc._RF.pop()
    }, {
        Facebook: "Facebook",
        GlobalConfig: "GlobalConfig",
        Logger: "Logger",
        MsgDefine: "MsgDefine",
        MsgSystem: "MsgSystem"
    }],
    GameVIew: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "bbaf0Lc8FlC0IPgLF1evta7", "GameVIew"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = t("../Controllers/SoundControl"), a = cc._decorator, i = a.ccclass, s = a.property, r = function (t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.leftParticleNode = null, e.rightParticleNode = null, e.leftNode = null, e.rightNode = null, e.pauseBtn = null, e.starNode = [], e.finishParticle = [], e.protectNode = null, e.protectLabel = null, e.protectProgress = null, e.progressNode = [], e.protectTimeCD = null, e.touchHintNode = null, e.toucHintLabel = null, e.count = 0, e.isUseHint = !1, e
            }

            var o;
            return __extends(e, t), o = e, e.getInstance = function () {
                return o.instance
            }, e.prototype.onLoad = function () {
                console.log("111",this.node);
                null == o.instance ? o.instance = this : o.instance != this && this.destroy(), this.schedule(this.protectLabelupdate, .5)
            }, e.prototype.onEnable = function () {
                this.leftNode.removeAllChildren(), this.rightNode.removeAllChildren(), this.touchHintNode.active = !1
            }, e.prototype.showFinishParticle = function () {
                var t = cc.instantiate(this.leftParticleNode);
                t.position = cc.v2(0, 0), this.leftNode.removeAllChildren(), this.leftNode.addChild(t), t.active = !0;
                var e = cc.instantiate(this.rightParticleNode);
                e.position = cc.v2(0, 0), this.rightNode.removeAllChildren(), this.rightNode.addChild(e), e.active = !0, n.default.getInstance().playSE(7)
            }, e.prototype.enablePauseBtn = function (t) {
                this.pauseBtn.interactable = t
            }, e.prototype.resetProgress = function () {
                for (var t = 0; t < this.progressNode.length; t++) this.progressNode[t].progress = 1
            }, e.prototype.setProgress = function (t) {
                t >= .85 ? this.progressNode[0].progress = 1 - (1 - t) / .15 : t >= .85 - .2 && t < .85 ? (this.progressNode[0].progress = 0, this.progressNode[1].progress = .5 * (1 - (.85 - t) / .2)) : t >= .7 - .2 && t < .85 - .2 ? (this.progressNode[1].progress = 0, this.progressNode[2].progress = 1 - (.85 - .2 - t) / .15) : t >= .55 - .2 && t < .7 - .2 ? (this.progressNode[2].progress = 0, this.progressNode[3].progress = 1 - (.7 - .2 - t) / .15) : t >= .55 - .4 && t < .55 - .2 ? (this.progressNode[3].progress = 0, this.progressNode[4].progress = .5 * (1 - (.55 - .2 - t) / .2)) : t >= 0 && t < .55 - .4 ? (this.progressNode[4].progress = 0, this.progressNode[5].progress = 1 - (.55 - .4 - t) / .15) : console.log("percent is wrong", t)
            }, e.prototype.updateStar = function (t) {
                for (var e = function (e) {
                    e < t ? (o.starNode[e].active = !0, o.starNode[e].stopAllActions(), o.starNode[e].opacity = 255, o.starNode[e].scale = 2, o.starNode[e].position = cc.v2(0, 0)) : o.starNode[e].active && o.starNode[e].runAction(cc.sequence(cc.spawn(cc.rotateBy(1, 360), cc.moveBy(1, cc.v2(200, -200)), cc.fadeOut(1)), cc.callFunc(function () {
                        this.starNode[e].active = !1
                    }.bind(o))))
                }, o = this, n = 0; n < 3; n++) e(n)
            }, e.prototype.protectLabelupdate = function () {
                0 == this.count ? this.protectLabel.string = "Auto Protect." : 1 == this.count ? this.protectLabel.string = "Auto Protect.." : 2 == this.count ? this.protectLabel.string = "Auto Protect..." : (this.protectLabel.string = "Auto Protect", this.count = -1), this.count++
            }, e.prototype.hideHint = function () {
                this.touchHintNode.active = !1
            }, e.prototype.isHintShow = function () {
                return this.touchHintNode.active
            }, e.prototype.NoTap = function () {
                var t = this;
                this.isUseHint && (this.touchHintNode.color = cc.color(255, 0, 0), this.toucHintLabel.string = "Don't Tap", this.touchHintNode.active = !0, this.toucHintLabel.node.active = !0, this.touchHintNode.stopAllActions(), this.touchHintNode.opacity = 200, this.touchHintNode.runAction(cc.sequence(cc.fadeOut(1).easing(cc.easeCubicActionIn()), cc.callFunc(function () {
                    t.toucHintLabel.node.active = !1
                }))))
            }, e.prototype.TapNow = function () {
                var t = this;
                this.isUseHint && (this.touchHintNode.color = cc.color(0, 255, 0), this.toucHintLabel.string = "Tap Now!", this.toucHintLabel.node.active = !0, this.touchHintNode.stopAllActions(), this.touchHintNode.opacity = 200, this.touchHintNode.runAction(cc.sequence(cc.fadeOut(1).easing(cc.easeCubicActionIn()), cc.callFunc(function () {
                    t.toucHintLabel.node.active = !1
                }))))
            }, e.prototype.TooLate = function () {
                var t = this;
                this.isUseHint && (this.touchHintNode.color = cc.color(255, 0, 0), this.toucHintLabel.string = "Too Late", this.touchHintNode.active = !0, this.toucHintLabel.node.active = !0, this.touchHintNode.stopAllActions(), this.touchHintNode.opacity = 200, this.touchHintNode.runAction(cc.sequence(cc.fadeOut(1).easing(cc.easeCubicActionIn()), cc.callFunc(function () {
                    t.toucHintLabel.node.active = !1
                }))))
            }, e.prototype.TooSoon = function () {
                var t = this;
                this.isUseHint && (this.touchHintNode.color = cc.color(255, 0, 0), this.toucHintLabel.string = "Too Soon", this.touchHintNode.active = !0, this.toucHintLabel.node.active = !0, this.touchHintNode.stopAllActions(), this.touchHintNode.opacity = 200, this.touchHintNode.runAction(cc.sequence(cc.fadeOut(1).easing(cc.easeCubicActionIn()), cc.callFunc(function () {
                    t.toucHintLabel.node.active = !1
                }))))
            }, e.instance = null, __decorate([s(cc.Node)], e.prototype, "leftParticleNode", void 0), __decorate([s(cc.Node)], e.prototype, "rightParticleNode", void 0), __decorate([s(cc.Node)], e.prototype, "leftNode", void 0), __decorate([s(cc.Node)], e.prototype, "rightNode", void 0), __decorate([s(cc.Button)], e.prototype, "pauseBtn", void 0), __decorate([s(cc.Node)], e.prototype, "starNode", void 0), __decorate([s(cc.ParticleSystem)], e.prototype, "finishParticle", void 0), __decorate([s(cc.Node)], e.prototype, "protectNode", void 0), __decorate([s(cc.Label)], e.prototype, "protectLabel", void 0), __decorate([s(cc.Node)], e.prototype, "protectProgress", void 0), __decorate([s(cc.ProgressBar)], e.prototype, "progressNode", void 0), __decorate([s(cc.Label)], e.prototype, "protectTimeCD", void 0), __decorate([s(cc.Node)], e.prototype, "touchHintNode", void 0), __decorate([s(cc.Label)], e.prototype, "toucHintLabel", void 0), e = o = __decorate([i], e)
        }(cc.Component);
        o.default = r, cc._RF.pop()
    }, {"../Controllers/SoundControl": "SoundControl"}],
    GlobalConfig: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "a200cwTlfpJwrOfeVfMBGzG", "GlobalConfig"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = t("FacebookAd"), a = [{
                index: "INTERSTITIAL_PLACEMENT",
                placementId: "937145626674600_937151870007309",
                type: n.AdType.INTERSTITIAL
            }, {index: "REWARDED_PLACEMENT", placementId: "937145626674600_937152176673945", type: n.AdType.REWARDED}],
            i = new Map, s = new Map;
        a.forEach(function (t) {
            i.set(t.placementId, t.type), t.index = "" == t.index ? t.placementId : t.index, s.set(t.index, t.placementId)
        });
        var r = function () {
            function t() {
            }

            return t.gameId = "TEST", t.FacebookAdMap = i, t.FacebookAdIndex = s, t.baseOutput = 200, t.packageType = "PLACEMENT", t
        }();
        o.default = r, cc._RF.pop()
    }, {FacebookAd: "FacebookAd"}],
    GuideNode: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "8907d8qbDJAR7+fXD6XEew5", "GuideNode"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = cc._decorator, a = n.ccclass, i = n.property, s = function (t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.guideImg = [], e.guideLabel = [], e
            }

            return __extends(e, t), e.prototype.onEnable = function () {
                for (var t = 0; t < 3; t++) this.guideLabel[t].node.stopAllActions(), this.guideLabel[t].node.active = !1, this.guideLabel[t].node.position = cc.v2(0, 0);
                this.unscheduleAllCallbacks();
                var e = cc.sequence(cc.place(cc.v2(0, 0)), cc.show(), cc.moveBy(.3, cc.v2(0, 60)), cc.hide(), cc.delayTime(.9)),
                    o = cc.repeatForever(e);
                this.guideLabel[0].node.active = !0, this.guideLabel[0].node.runAction(o), this.scheduleOnce(function () {
                    this.guideLabel[1].node.active = !0, this.guideLabel[1].node.runAction(o.clone())
                }, .3), this.scheduleOnce(function () {
                    this.guideLabel[2].node.active = !0, this.guideLabel[2].node.runAction(o.clone())
                }, .6)
            }, __decorate([i(cc.Sprite)], e.prototype, "guideImg", void 0), __decorate([i(cc.Label)], e.prototype, "guideLabel", void 0), e = __decorate([a], e)
        }(cc.Component);
        o.default = s, cc._RF.pop()
    }, {}],
    GuideView: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "97e04+kMzRLgo3tDbeGUpy0", "GuideView"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = t("../Controllers/GameControl"), a = cc._decorator, i = a.ccclass, s = a.property, r = function (t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.okLabel = null, e.okBtn = null, e.checkBtn = null, e.checkSprite = null, e.guideSpine = null, e.AnimNode = [], e.countdown = 0, e
            }

            return __extends(e, t), e.prototype.onLoad = function () {
            }, e.prototype.onEnable = function () {
                var t = this;
                this.guideSpine.animation = "Chick_zhishi_anim", this.guideSpine.loop = !0, this.guideSpine.timeScale = 0, this.node.scale = 0, this.node.runAction(cc.sequence(cc.scaleTo(.5, 1).easing(cc.easeBackOut()), cc.delayTime(.2), cc.callFunc(function () {
                    t.guideSpine.timeScale = 1
                })))
            }, e.prototype.checkShowGuide = function (t) {
                n.default.getInstance().playerInfo.guideShow = t ? 1 : 0
            }, e.prototype.onDisable = function () {
                n.default.getInstance().syncFBData()
            }, e.prototype.onTouchOK = function () {
                this.node.active = !1
            }, e.prototype.onTouchCheck = function () {
                this.checkSprite.active = !this.checkSprite.active, this.checkShowGuide(this.checkSprite.active)
            }, __decorate([s(cc.Label)], e.prototype, "okLabel", void 0), __decorate([s(cc.Button)], e.prototype, "okBtn", void 0), __decorate([s(cc.Button)], e.prototype, "checkBtn", void 0), __decorate([s(cc.Node)], e.prototype, "checkSprite", void 0), __decorate([s(sp.Skeleton)], e.prototype, "guideSpine", void 0), __decorate([s(cc.Node)], e.prototype, "AnimNode", void 0), e = __decorate([i], e)
        }(cc.Component);
        o.default = r, cc._RF.pop()
    }, {"../Controllers/GameControl": "GameControl"}],
    Http: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "b0256btSZ5FAolvO4S72LMt", "Http"), Object.defineProperty(o, "__esModule", {value: !0});
        var n, a, i = t("./NetConfig"), s = t("../Logger/Logger");
        (function (t) {
            t[t.GET = 1] = "GET", t[t.POST = 2] = "POST", t[t.PUT = 3] = "PUT", t[t.DELETE = 4] = "DELETE"
        })(n || (n = {})), function (t) {
            t.DEFAULT = "application/x-www-form-urlencoded", t.JSON = "application/json"
        }(a || (a = {}));
        var r = function () {
            function t() {
                this.baseURL = i.NetConfig.httpUrl
            }

            return t.GetInstance = function () {
                return null == t.instance && (t.instance = new t), t.instance
            }, t.prototype.send = function (t, e, o, r, c, l, d, u, p, h) {
                void 0 === o && (o = {}), void 0 === c && (c = null), void 0 === l && (l = null), void 0 === d && (d = null), void 0 === u && (u = null), void 0 === p && (p = 1), void 0 === h && (h = !1);
                var g = cc.loader.getXMLHttpRequest();
                switch (g.onreadystatechange = function () {
                    if (4 === g.readyState) if (g.status >= 200 && g.status < 400) {
                        var t = g.responseText;
                        try {
                            s.default.debug("=================\u6536\u5230http\u8fd4\u56de\u6570\u636ebegin============"), s.default.debug("status:" + g.status), s.default.debug(t), s.default.debug("=================\u6536\u5230http\u8fd4\u56de\u6570\u636eend==============");
                            var e = JSON.parse(t);
                            h || e.code != i.HTTP_CODE.SUCCEED || c && c(e)
                        } catch (t) {
                            s.default.error(t), l && l(t)
                        }
                    } else s.default.error("status:" + g.status)
                }, g.onerror = function (t) {
                    l && l(t)
                }, g.ontimeout = d ? function () {
                    d()
                } : function () {
                    p <= i.NetConfig.httpRequestTryTime ? this.send(t, e, o, c, l, d, u, p + 1, h) : s.default.error("\u7f51\u7edc\u65e0\u54cd\u5e94")
                }.bind(this), "http" != e.substr(0, 4) && (e = this.baseURL + e), s.default.debug("====================\u53d1\u9001http\u8bf7\u6c42begin=================="), s.default.debug("url:" + e), s.default.debug(o), s.default.debug("====================\u53d1\u9001http\u8bf7\u6c42end===================="), t) {
                    case n.GET:
                        g.open("GET", e, !0), g.timeout = i.NetConfig.httpGetTimeout;
                        break;
                    case n.POST:
                        g.open("POST", e, !0), g.timeout = i.NetConfig.httpPostTimeout, g.setRequestHeader("Content-Type", r);
                        break;
                    case n.PUT:
                        g.open("PUT", e, !0), g.timeout = i.NetConfig.httpPutTimeout, g.setRequestHeader("Content-Type", r);
                        break;
                    case n.DELETE:
                        g.open("DELETE", e, !0), g.timeout = i.NetConfig.httpDeleteTimeout, g.setRequestHeader("Content-Type", r)
                }
                null != u && g.setRequestHeader("authorization", u), t == n.GET ? g.send() : r == a.JSON ? g.send(JSON.stringify(o)) : g.send(this.convertParamToUrlencodedStr(o))
            }, t.prototype.getUrl = function (t, e) {
                return void 0 === e && (e = null), e && (t += "?" + this.convertParamToUrlencodedStr(e)), t
            }, t.prototype.convertParamToUrlencodedStr = function (t) {
                void 0 === t && (t = null);
                var e = "";
                if (t) {
                    for (var o in t) {
                        e += "&" + o + "=" + encodeURIComponent(t[o])
                    }
                    t = e.substr(1)
                }
                return e
            }, t.prototype.get = function (t, e, o, i, s, r, c, l, d) {
                void 0 === e && (e = {}), void 0 === o && (o = a.DEFAULT), void 0 === i && (i = null), void 0 === s && (s = null), void 0 === r && (r = null), void 0 === c && (c = null), void 0 === l && (l = 1), void 0 === d && (d = !1), t = this.getUrl(t, e), this.send(n.GET, t, e, o, i, s, r, c, l, d)
            }, t.prototype.post = function (t, e, o, i, s, r, c, l, d) {
                void 0 === e && (e = {}), void 0 === o && (o = a.DEFAULT), void 0 === i && (i = null), void 0 === s && (s = null), void 0 === r && (r = null), void 0 === c && (c = null), void 0 === l && (l = 1), void 0 === d && (d = !1), this.send(n.POST, t, e, o, i, s, r, c, l, d)
            }, t.prototype.put = function (t, e, o, i, s, r, c, l, d) {
                void 0 === e && (e = {}), void 0 === o && (o = a.DEFAULT), void 0 === i && (i = null), void 0 === s && (s = null), void 0 === r && (r = null), void 0 === c && (c = null), void 0 === l && (l = 1), void 0 === d && (d = !1), this.send(n.PUT, t, e, o, i, s, r, c, l, d)
            }, t.prototype.delete = function (t, e, o, i, s, r, c, l, d) {
                void 0 === e && (e = {}), void 0 === o && (o = a.DEFAULT), void 0 === i && (i = null), void 0 === s && (s = null), void 0 === r && (r = null), void 0 === c && (c = null), void 0 === l && (l = 1), void 0 === d && (d = !1), this.send(n.DELETE, t, e, o, i, s, r, c, l, d)
            }, t.instance = null, t
        }();
        o.default = r, cc._RF.pop()
    }, {"../Logger/Logger": "Logger", "./NetConfig": "NetConfig"}],
    LevelUpView: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "21e2elo8A9HmLjak9TZY91e", "LevelUpView"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = t("../Controllers/GameControl"), a = t("./ScoreView"), i = t("../Data/Constants"), s = cc._decorator,
            r = s.ccclass, c = s.property, l = function (t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.lvlabel = null, e.expProgress = null, e.expLabel = null, e.newSong = null, e.levelNode = null, e.touchNode = null, e.touchLabel = null, e.itemNode = [], e.data = [], e.progressTime = 1, e.progressRun = !1, e.isLevelUp = !1, e.isLevelChanged = !1, e
                }

                var o;
                return __extends(e, t), o = e, e.getInstance = function () {
                    return o.instance
                }, e.prototype.onLoad = function () {
                    null == o.instance ? o.instance = this : o.instance != this && this.destroy()
                }, e.prototype.onEnable = function () {
                    this.data = n.default.getInstance().getLevelUpData(), this.isLevelUp = !1, this.data.prevData.level < this.data.endData.level && (this.isLevelUp = !0), this.AnimReady(), this.playAnim()
                }, e.prototype.onDisable = function () {
                    a.default.getInstance().pauseDoubleCD(!1), this.progressRun = !1
                }, e.prototype.AnimReady = function () {
                    this.progressTime = 1, this.levelNode.position = cc.v2(0, 0), this.newSong.node.opacity = 0;
                    for (var t = 0; t < this.itemNode.length; t++) this.itemNode[t].opacity = 0;
                    this.touchLabel.stopAllActions(), this.touchLabel.opacity = 0, this.touchNode.active = !1, this.lvlabel.string = "Lv." + this.data.prevData.level, this.expLabel.string = this.data.prevData.sub + "/" + this.data.prevData.next, this.expProgress.progress = this.data.prevData.sub / this.data.prevData.next, this.lvlabel.node.opacity = 255, this.lvlabel.node.scale = 1, this.isLevelChanged = !1
                }, e.prototype.playAnim = function () {
                    this.progressRun = !0
                }, e.prototype.showTouch = function () {
                    this.touchNode.active = !0;
                    var t = cc.sequence(cc.fadeIn(2), cc.fadeOut(2));
                    this.touchLabel.runAction(cc.repeatForever(t))
                }, e.prototype.onTouchClose = function () {
                    this.node.active = !1
                }, e.prototype.showUnlcokItems = function () {
                    var t = i.default.getInstance().getStageUnLockData();
                    if (null != t[this.data.prevData.level]) {
                        this.newSong.node.x = 424, this.newSong.node.runAction(cc.spawn(cc.fadeIn(.5), cc.moveTo(.5, cc.v2(0, this.newSong.node.y))));
                        for (var e = t[this.data.prevData.level], o = 0, n = 0; n < this.itemNode.length; n++) if (null != e[n]) {
                            var a = i.default.getInstance().getStage(1, e[n]);
                            if (null != a) {
                                this.itemNode[n].getChildByName("lvLabel").getComponent("cc.Label").string = "Lv." + a.level;
                                var s = this.itemNode[n].getChildByName("titileLabel").getComponent("cc.Label");
                                s.string = a.title, s.string.length > 24 ? s.node.scaleX = 25 / s.string.length : s.node.scaleX = 1
                            }
                            this.itemNode[n].x = 283;
                            var r = cc.sequence(cc.delayTime(.5 * (n + 1)), cc.spawn(cc.fadeIn(.5), cc.moveTo(.5, cc.v2(-283, this.itemNode[n].y))));
                            this.itemNode[n].runAction(r), o++
                        }
                        this.node.runAction(cc.sequence(cc.delayTime(.5 * (o + 2)), cc.callFunc(function () {
                            this.showTouch()
                        }.bind(this))))
                    } else this.showTouch()
                }, e.prototype.update = function (t) {
                    if (this.progressRun) if (console.log("AAAA"), this.progressTime -= t, this.progressTime <= 0 && (this.progressTime = 0, this.progressRun = !1, this.isLevelUp ? this.levelNode.runAction(cc.sequence(cc.delayTime(1), cc.moveTo(.5, cc.v2(0, 288)), cc.callFunc(function () {
                        this.showUnlcokItems()
                    }.bind(this)))) : this.showTouch()), this.isLevelUp) {
                        var e = this.data.endData.sub + this.data.prevData.next - this.data.prevData.sub,
                            o = this.data.prevData.next - this.data.prevData.sub, n = e * (1 - this.progressTime);
                        if (n >= o) {
                            if (!this.isLevelChanged) {
                                this.isLevelChanged = !0;
                                var a = cc.sequence(cc.spawn(cc.fadeOut(.5), cc.scaleTo(.5, 3)), cc.callFunc(function () {
                                    this.lvlabel.string = "等级." + this.data.endData.level
                                }.bind(this)), cc.spawn(cc.fadeIn(.5), cc.scaleTo(.5, 1)));
                                this.lvlabel.node.runAction(a)
                            }
                            this.expProgress.progress = (n - o) / this.data.endData.next, this.expLabel.string = Math.floor(n - o).toString() + "/" + this.data.endData.next
                        } else this.expProgress.progress = (this.data.prevData.sub + n) / this.data.prevData.next, this.expLabel.string = Math.floor(this.data.prevData.sub + (1 - this.progressTime) * (this.data.endData.sub - this.data.prevData.sub)).toString() + "/" + this.data.prevData.next
                    } else this.expProgress.progress = this.data.prevData.sub / this.data.prevData.next + (1 - this.progressTime) * (this.data.endData.sub - this.data.prevData.sub) / this.data.prevData.next, this.expLabel.string = Math.floor(this.data.prevData.sub + (1 - this.progressTime) * (this.data.endData.sub - this.data.prevData.sub)).toString() + "/" + this.data.prevData.next
                }, e.instance = null, __decorate([c(cc.Label)], e.prototype, "lvlabel", void 0), __decorate([c(cc.ProgressBar)], e.prototype, "expProgress", void 0), __decorate([c(cc.Label)], e.prototype, "expLabel", void 0), __decorate([c(cc.Label)], e.prototype, "newSong", void 0), __decorate([c(cc.Node)], e.prototype, "levelNode", void 0), __decorate([c(cc.Node)], e.prototype, "touchNode", void 0), __decorate([c(cc.Node)], e.prototype, "touchLabel", void 0), __decorate([c(cc.Node)], e.prototype, "itemNode", void 0), e = o = __decorate([r], e)
            }(cc.Component);
        o.default = l, cc._RF.pop()
    }, {"../Controllers/GameControl": "GameControl", "../Data/Constants": "Constants", "./ScoreView": "ScoreView"}],
    LevelView: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "a4f5dTRBuVDoaZCzjeKl0Rd", "LevelView"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = t("../Data/Constants"), a = t("../Controllers/GameControl"), i = cc._decorator, s = i.ccclass,
            r = i.property, c = function (t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.lvLabel = null, e.expProgres = null, e.expLabel = null, e.itemNode = [], e
                }

                var o;
                return __extends(e, t), o = e, e.getInstance = function () {
                    return o.instance
                }, e.prototype.onLoad = function () {
                    null == o.instance ? o.instance = this : o.instance != this && this.destroy(), a.default.getInstance().refreshLv()
                }, e.prototype.refreshLevelView = function (t, e, o) {
                    var a = n.default.getInstance().getStageUnLockData();
                    if (this.lvLabel.string = "等级." + t, null != a[t]) {
                        this.expProgres.progress = e / o, this.expLabel.string = e + "/" + o;
                        for (var i = 0; i < this.itemNode.length; i++) if (null != a[t][i]) {
                            this.itemNode[i].active = !0;
                            var s = n.default.getInstance().getStage(1, a[t][i]);
                            if (null != s) {
                                this.itemNode[i].getChildByName("lvLabel").getComponent("cc.Label").string = "等级." + s.level;
                                var r = this.itemNode[i].getChildByName("titileLabel").getComponent("cc.Label");
                                r.string = s.title, r.string.length > 24 ? r.node.scaleX = 25 / r.string.length : r.node.scaleX = 1
                            }
                        } else this.itemNode[i].active = !1
                    } else {
                        this.expProgres.progress = 1, this.expLabel.string = "0/0";
                        for (i = 0; i < this.itemNode.length; i++) this.itemNode[i].active = !1
                    }
                }, e.prototype.onClose = function () {
                    this.node.active = !1
                }, e.instance = null, __decorate([r(cc.Label)], e.prototype, "lvLabel", void 0), __decorate([r(cc.ProgressBar)], e.prototype, "expProgres", void 0), __decorate([r(cc.Label)], e.prototype, "expLabel", void 0), __decorate([r(cc.Node)], e.prototype, "itemNode", void 0), e = o = __decorate([s], e)
            }(cc.Component);
        o.default = c, cc._RF.pop()
    }, {"../Controllers/GameControl": "GameControl", "../Data/Constants": "Constants"}],
    LoadingView: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "8bde9X8dIJCnowcq62ToykI", "LoadingView"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = t("../Controllers/UIControl"), a = t("../Controllers/CameraControl"), i = cc._decorator, s = i.ccclass,
            r = i.property, c = function (t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.label = null, e.percentLabel = null, e.progressBar = null, e.backBtn = null, e.errorLabel = null, e.tipsNode = null, e.loadingNode = null, e.percent = 0, e._percent = 0, e.completeCallBack = null, e.timeOut = 15, e.isInit = !1, e.initLeastTime = 1, e.completeFuncNotCalled = !1, e.count = 0, e
                }

                var o;
                return __extends(e, t), o = e, e.getInstance = function () {
                    return o.instance
                }, e.prototype.onLoad = function () {
                    null == o.instance ? o.instance = this : o.instance != this && this.destroy()
                }, e.prototype.onEnable = function () {
                    this.label.string = "Loading", this.schedule(this.updateLabel, .5), this.count = 0, this.percent = 0, this._percent = 0, this.percentLabel.string = "0%", this.progressBar.progress = 0, this.percentLabel.node.x = -150, this.timeOut = 20, this.backBtn.active = !1, this.errorLabel.active = !1, this.initLeastTime = 1, this.tipsNode.active = !0
                }, e.prototype.onDisable = function () {
                    this.unschedule(this.updateLabel), this.isInit = !1
                }, e.prototype.addPercent = function (t) {
                    this.percent += t, this.percent > 1 && (console.log("loading error occurred!", this.percent), this.percent = 1)
                }, e.prototype.setCompleteCallBack = function (t) {
                    this.completeCallBack = t
                }, e.prototype.onTouchBack = function () {
                    this.node.active = !1;
                    var t = n.default.getInstance();
                    t.showView("CommonBg", !0), t.showView("StageView", !0), t.showView("CommonUI", !0), t.showView("BackBtnBg", !0), a.default.getInstance().node.active = !1
                }, e.prototype.updateLabel = function (t) {
                    0 == this.count ? this.label.string = "加载中." : 1 == this.count ? this.label.string = "加载中.." : 2 == this.count ? this.label.string = "加载中..." : (this.label.string = "加载中", this.count = -1), this.count++
                }, e.prototype.update = function (t) {
                    this.initLeastTime > 0 ? this.initLeastTime -= t : this.completeFuncNotCalled && (this.completeCallBack(), this.completeFuncNotCalled = !1, this.node.active = !1), this._percent < this.percent ? (this.percentLabel.string = Math.ceil(100 * this._percent) + "%", this.progressBar.progress = this._percent, this.percentLabel.node.x = 300 * this._percent - 150, this._percent += t) : 1 == this.percent && (this.percentLabel.string = "100%", this.progressBar.progress = 1, this.percentLabel.node.x = 150, null != this.completeCallBack && this.initLeastTime <= 0 ? (this.completeCallBack(), this.node.active = !1) : this.completeFuncNotCalled = !0), this.timeOut -= t, this.timeOut <= 0 && (this.backBtn.active = !0, this.errorLabel.active = !0)
                }, e.instance = null, __decorate([r(cc.Label)], e.prototype, "label", void 0), __decorate([r(cc.Label)], e.prototype, "percentLabel", void 0), __decorate([r(cc.ProgressBar)], e.prototype, "progressBar", void 0), __decorate([r(cc.Node)], e.prototype, "backBtn", void 0), __decorate([r(cc.Node)], e.prototype, "errorLabel", void 0), __decorate([r(cc.Node)], e.prototype, "tipsNode", void 0), __decorate([r(cc.Node)], e.prototype, "loadingNode", void 0), e = o = __decorate([s], e)
            }(cc.Component);
        o.default = c, cc._RF.pop()
    }, {"../Controllers/CameraControl": "CameraControl", "../Controllers/UIControl": "UIControl"}],
    Logger: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "ab7f1hFqbhHk65kDgbaLp8j", "Logger"), Object.defineProperty(o, "__esModule", {value: !0});
        var n, a = t("../Utility/DateUtility"), i = t("../Facebook/Facebook"), s = t("GlobalConfig");
        (function (t) {
            t[t.Debug = 0] = "Debug", t[t.Log = 1] = "Log", t[t.Info = 2] = "Info", t[t.Warn = 3] = "Warn", t[t.Error = 4] = "Error"
        })(n = o.LogLevel || (o.LogLevel = {}));
        var r = function () {
            function t() {
            }

            return t.SetLevel = function (e) {
                t.curLevel = e
            }, t.error = function (e) {
                for (var o = [], a = 1; a < arguments.length; a++) o[a - 1] = arguments[a];
                t.myLog.apply(t, [n.Error, e].concat(o))
            }, t.warn = function (e) {
                for (var o = [], a = 1; a < arguments.length; a++) o[a - 1] = arguments[a];
                t.myLog.apply(t, [n.Warn, e].concat(o))
            }, t.log = function (e) {
                for (var o = [], a = 1; a < arguments.length; a++) o[a - 1] = arguments[a];
                t.myLog.apply(t, [n.Log, e].concat(o))
            }, t.debug = function (e) {
                for (var o = [], a = 1; a < arguments.length; a++) o[a - 1] = arguments[a];
                t.myLog.apply(t, [n.Debug, e].concat(o))
            }, t.info = function (e) {
                for (var o = [], a = 1; a < arguments.length; a++) o[a - 1] = arguments[a];
                t.myLog.apply(t, [n.Info, e].concat(o))
            }, t.myLog = function (e, o) {
                for (var i = [], s = 2; s < arguments.length; s++) i[s - 2] = arguments[s];
                if (!(e < t.curLevel)) {
                    var r = a.default.GetDateStr(Date.now()) + " [" + t.levelDesc[e] + "]";
                    switch (e) {
                        case n.Debug:
                            console.debug.apply(console, [r, o].concat(i));
                            break;
                        case n.Log:
                            console.log.apply(console, [r, o].concat(i));
                            break;
                        case n.Info:
                            console.info.apply(console, [r, o].concat(i));
                            break;
                        case n.Warn:
                            console.warn.apply(console, [r, o].concat(i));
                            break;
                        case n.Error:
                            console.error.apply(console, [r, o].concat(i))
                    }
                }
            }, t.analytics = function (e, o) {
                var n = "debug";
                i.default.IsFBSupport() && (n = FBInstant.player.getID()), "DEV" == s.default.packageType && (console.log("eventName:", e), console.log("parameters:", o)), o.player_id = n, "defaultAds" == o.type && (o.type = cc.sys.isMobile ? "REWARDED" : "INTERSTITIAL"), i.default.LogEvent(e, 0, o), t.sendASTLog(e, o)
            }, t.sendASTLog = function (e, o, n) {
                // void 0 === n && (n = 1);
                // var a = "h5ins";
                // ["musicRoad", e, JSON.stringify(o)].forEach(function (t, e) {
                //     a = a + "#" + t
                // });
                // var s = "https://log-pub-hk.aoshitang.com/root/log.action?log=" + encodeURIComponent(a),
                //     r = cc.loader.getXMLHttpRequest();
                // r.onreadystatechange = function () {
                //     4 == r.readyState && (r.status >= 200 && r.status < 300 || (cc.log("http : request fail", r.status), i.default.IsFBSupport() && i.default.LogEvent("astLogFail", 0, {
                //         status: r.status,
                //         locale: FBInstant.getLocale()
                //     })))
                // }, r.ontimeout = function () {
                //     n < 3 ? t.sendASTLog(e, o, n + 1) : (cc.log("\u7f51\u7edc\u65e0\u54cd\u5e94"), i.default.IsFBSupport() && i.default.LogEvent("astLogTimeout", 0, {locale: FBInstant.getLocale()}))
                // }, r.open("GET", s, !0), r.setRequestHeader("CONTENT-TYPE", "application/x-www-form-urlencoded"), r.timeout = 1e4, r.send()
            }, t.curLevel = n.Debug, t.levelDesc = ["DEBUG", "LOG", "INFO", "WARN", "ERROR"], t
        }();
        o.default = r, cc._RF.pop()
    }, {"../Facebook/Facebook": "Facebook", "../Utility/DateUtility": "DateUtility", GlobalConfig: "GlobalConfig"}],
    MapControl: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "92856G9fVdMGY2ufyuzzIdb", "MapControl"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = t("./GameControl"), a = cc._decorator, i = a.ccclass, s = a.property, r = function (t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.terrainData = [], e.file = null, e.bpm = 0, e.offset = 0, e.waitBeats = 0, e.maxScore = 0, e.movement = 0, e.lastState = 0, e.lastJumpTerrainState = 0, e
            }

            var o;
            return __extends(e, t), o = e, e.getInstance = function () {
                return o.instance
            }, e.prototype.onLoad = function () {
                null == o.instance ? o.instance = this : o.instance != this && this.destroy()
            }, e.prototype.loadMapFile = function (t, e, o) {
                var a = this;
                console.log("loadMapFile1", t + "_t"), cc.loader.loadRes(t + "_t", cc.TextAsset, function (t, i) {
                    console.log("loadMapFile3", e, o), a.file = i, a.loadMap(), n.default.getInstance().loadMapFinished(e, o)
                })
            }, e.prototype.loadMap = function () {
                this.terrainData = [], this.lastState = 0;
                var t = this.file.text.split("\n"), e = 0, o = 0;
                this.movement = 148;
                for (var n = 0, a = t; n < a.length; n++) {
                    var i = a[n];
                    if (i.match("#BPMS") && (this.bpm = parseFloat(i.substring(6, 13)), console.log("bpm", this.bpm)), i.match("#OFFSET") && (this.offset = parseFloat(i.substring(8, 13))), i.match("#WAITBEATS") && (this.waitBeats = parseInt(i.substring(11, 12))), i.match("#MOVEMENT") && (this.movement = parseInt(i.substring(10, 13))), i.match("#NOTES:")) e = 1; else if (1 == e && i.match(";") && (e = 2, this.terrainData.push(3)), 1 == e) {
                        if (i.match(",") || i.match("//")) continue;
                        i.match("1000") ? o = 1 == o ? 0 : 1 : i.match("0010") ? o = 1 == o ? 0 : 1 : i.match("0001") ? o = 1 == o ? 0 : 1 : i.match("0000") ? o = this.lastState : i.match("0020") ? (this.lastJumpTerrainState = this.lastState, o = 7) : i.match("2000") ? (this.lastJumpTerrainState = this.lastState, o = 7) : i.match("0002") ? (this.lastJumpTerrainState = this.lastState, o = 7) : i.match("3") ? o = this.lastJumpTerrainState : console.log("Map something is wrong", i), this.lastState = o, this.terrainData.push(o)
                    }
                }
                console.log("terrain Data", this.terrainData.toString());
                for (var s = 0, r = 0, c = 0, l = this.terrainData; c < l.length; c++) {
                    var d = l[c];
                    s != d && (r++, s = d)
                }
                this.maxScore = 50 * (this.terrainData.length - r + 1) + 100 * (r - 1)
            }, e.prototype.getTerrainData = function () {
                return this.terrainData
            }, e.prototype.getBpm = function () {
                return this.bpm
            }, e.prototype.getOffset = function () {
                return this.offset
            }, e.prototype.getMaxScore = function () {
                return this.maxScore
            }, e.prototype.getBeatNum = function () {
                return this.terrainData.length
            }, e.instance = null, __decorate([s(cc.TextAsset)], e.prototype, "file", void 0), e = o = __decorate([i], e)
        }(cc.Component);
        o.default = r, cc._RF.pop()
    }, {"./GameControl": "GameControl"}],
    MsgDefine: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "bc98bpqlOZMrIfyNlK4MMsF", "MsgDefine"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = function () {
            function t() {
            }

            return t.server_startsearch = "server_startsearch", t.server_searching = "server_searching", t.server_available = "server_available", t.server_down = "server_down", t.languageLoadFinsih = "languageLoadFinsih", t.localization_finishChange = "localization_finishChange", t.hotUpdate_start = "hotUpdate_start", t.hotUpdate_percent = "hotUpdate_percent", t.hotUpdate_finish = "hotUpdate_finish", t.hotUpdate_faild = "hotUpdate_faild", t.hotUpdate_skip = "hotUpdate_skip", t.preLoadUIPanelFinish = "preLoadUIPanelFinish", t.contextInfoLoadFinish = "contextInfoLoadFinish", t.rankLoadFinish = "rankLoadFinish", t.loadDataFromFBFinish = "loadDataFromFBFinish", t.nodePoolInitFinish = "nodePoolInitFinish", t.userInfoLoadFinish = "userInfoLoadFinish", t.fbAdMsg = "fbAdMsg", t.onFBAdPlayStart = "onFBAdPlayStart", t.onFBAdPlayEnd = "onFBAdPlayEnd", t.dataChange = "dataChange", t
        }();
        o.default = n, cc._RF.pop()
    }, {}],
    MsgSystem: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "1f46fBpuLlIj6vyN1MDF2vq", "MsgSystem"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = t("../Logger/Logger"), a = function () {
            return function () {
            }
        }(), i = function () {
            return function () {
            }
        }(), s = Symbol("Listener"), r = function () {
            function t() {
                this.listenerMap = new Map
            }

            return Object.defineProperty(t, "instance", {
                get: function () {
                    return null == t._instance && (t._instance = new t), t._instance
                }, enumerable: !0, configurable: !0
            }), t.prototype.LogException = function (t) {
                n.default.warn("message:" + t + " has no listener")
            }, t.prototype.AddListener = function (e, o, n, r) {
                void 0 === n && (n = null), void 0 === r && (r = -1);
                var c = new a;
                c.callback = o, c.times = r, c.target = n;
                var l, d = t.msgID++;
                this.listenerMap.has(e) ? l = this.listenerMap.get(e) : (l = new Map, this.listenerMap.set(e, l)), l.set(d, c);
                var u = new i;
                return u.msgID = d, u.msgType = e, void 0 != n && (n[s] ? n[s].push(u) : (n[s] = new Array, n[s].push(u))), u
            }, t.prototype.SendMessage = function (t) {
                for (var e = this, o = [], a = 1; a < arguments.length; a++) o[a - 1] = arguments[a];
                if (n.default.log("Send Msg:" + t), this.listenerMap.has(t)) {
                    var i = this.listenerMap.get(t);
                    if (0 == i.size) return void this.LogException(t);
                    i.forEach(function (n, a) {
                        n.callback(o), n.times > 0 && (n.times--, n.times <= 0 && e.RemoveListener(t, a))
                    })
                } else this.LogException(t)
            }, t.prototype.RemoveListener = function (t, e) {
                if (this.listenerMap.has(t)) {
                    var o = this.listenerMap.get(t).delete(e);
                    return !o && this.LogException(t), o
                }
                return this.LogException(t), !1
            }, t.prototype.RemoveListenerByHandler = function (t) {
                return this.RemoveListener(t.msgType, t.msgID)
            }, t.prototype.RemoveListenerByTarget = function (t) {
                var e = this, o = t[s];
                o && o.forEach(function (t) {
                    e.RemoveListenerByHandler(t)
                }), t[s] = null
            }, t.prototype.RemoveListenerByType = function (t) {
                return this.listenerMap.has(t) ? this.listenerMap.delete(t) : (this.LogException(t), !1)
            }, t._instance = null, t.msgID = 0, t
        }();
        o.default = r, cc._RF.pop()
    }, {"../Logger/Logger": "Logger"}],
    NetConfig: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "004716RWh1KRJYSeRFwOCsM", "NetConfig"), Object.defineProperty(o, "__esModule", {value: !0}), function (t) {
            t[t.NET_ERROR = -2] = "NET_ERROR", t[t.ERROR = -1] = "ERROR", t[t.SUCCEED = 0] = "SUCCEED"
        }(o.HTTP_CODE || (o.HTTP_CODE = {}));
        var n = function () {
            function t() {
            }

            return t.httpRequestTryTime = 3, t.httpGetTimeout = 3e3, t.httpPostTimeout = 5e3, t.httpPutTimeout = 5e3, t.httpDeleteTimeout = 5e3, t.httpUrl = "http://", t
        }();
        o.NetConfig = n;
        var a = function () {
            function t() {
            }

            return t.getLocalizationAsset = "", t
        }();
        o.GameUrl = a, cc._RF.pop()
    }, {}],
    Net: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "b4939yA6ZlBaYNPntD7xbxf", "Net"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = t("../Logger/Logger"), a = function () {
            function t() {
                this.reconnectCount = 0, this.socket = null, this.listeners = {}
            }

            return t.GetInstance = function () {
                return null == this.instance && (this.instance = new t), this.instance
            }, t.prototype.initSocket = function (t, e) {
                this.socket = io.connect(t, {
                    reconnection: !1,
                    "force new connection": !0,
                    transports: ["websocket", "polling"]
                }), this.socket.on("connect", function () {
                    this.onConnect(), e && e()
                }.bind(this)), this.socket.on("message", this.onMessage.bind(this)), this.socket.on("command", this.onCommand.bind(this)), this.socket.on("disconnect", this.onDisconnect.bind(this))
            }, t.prototype.onCommand = function (t) {
                n.default.debug("====================\u6536\u5230socket\u8fd4\u56de\u6570\u636ebegin=================="), n.default.debug("routeSign:" + t.command), n.default.debug(t), n.default.debug("====================\u6536\u5230socket\u8fd4\u56de\u6570\u636eend==================");
                var e = this.listeners[t.command];
                e && (t.status && 1 != t.status ? e.err && e.callback && e.callback(t) : e.callback && e.callback(t))
            }, t.prototype.onConnect = function () {
                n.default.debug("connect")
            }, t.prototype.onMessage = function (t) {
                n.default.debug("message", t)
            }, t.prototype.onDisconnect = function (t) {
                n.default.debug("disconnect", t)
            }, t.prototype.disconnect = function () {
                this.socket = null
            }, t.prototype.simulateSendData = function (t) {
                this.onCommand(t)
            }, t.prototype.sendData = function (e, o, a, i) {
                void 0 === o && (o = null), void 0 === a && (a = null), void 0 === i && (i = !1);
                var s = t.getRouteSign(e);
                a = a || {}, n.default.debug("====================\u53d1\u9001socket\u8bf7\u6c42begin=================="), n.default.debug("routeSign:" + s), n.default.debug(a), n.default.debug("====================\u53d1\u9001socket\u8bf7\u6c42end=================="), this.socket.emit(e, JSON.stringify(a)), this.listeners[e] = {
                    err: i,
                    callback: o
                }
            }, t.prototype.regPush = function (t, e, o) {
                void 0 === o && (o = ""), this.listeners[o + t] = {sign: o, route: t, callback: e}
            }, t.prototype.unregPush = function (t, e) {
                void 0 === e && (e = ""), delete this.listeners[e + t]
            }, t.getRouteSign = function (t) {
                return t + "_" + ++this.routeIndex
            }, t.prototype.getUrl = function (t, e) {
                var o = "ws://" + t;
                return e && (o += ":" + e), o
            }, t.instance = null, t.routeIndex = 0, t
        }();
        o.Net = a, cc._RF.pop()
    }, {"../Logger/Logger": "Logger"}],
    PageViewEx: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "81f84N4l1ZHa6AAdLxTHufw", "PageViewEx"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = cc._decorator, a = n.ccclass, i = n.property, s = function (t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.content = null, e.pageView = null, e.itemHeight = 290, e.outScale = .4, e.outOpacity = .6, e
            }

            return __extends(e, t), e.prototype.onLoad = function () {
                this.pageView.scrollToPage(1, 0)
            }, e.prototype.onTouchPageItem = function (t, e) {
                var o = parseInt(e);
                o == this.pageView.getCurrentPageIndex() && cc.log("show stageView", o + 1), o >= 0 && this.pageView.scrollToPage(o, .5)
            }, e.prototype.update = function (t) {
                if (null != this.content && this.content.childrenCount > 0) for (var e = 0, o = this.content.children; e < o.length; e++) {
                    var n = o[e], a = Math.abs(this.content.y + n.y), i = 1 - a / this.itemHeight * (1 - this.outScale);
                    n.scale = i < 0 ? 0 : i;
                    var s = 255 * (1 - a / this.itemHeight * (1 - this.outOpacity));
                    n.opacity = s < 0 ? 0 : s
                }
            }, __decorate([i(cc.Node)], e.prototype, "content", void 0), __decorate([i(cc.PageView)], e.prototype, "pageView", void 0), __decorate([i], e.prototype, "itemHeight", void 0), __decorate([i], e.prototype, "outScale", void 0), __decorate([i], e.prototype, "outOpacity", void 0), e = __decorate([a], e)
        }(cc.Component);
        o.default = s, cc._RF.pop()
    }, {}],
    PauseView: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "0cbdcby7ghOPZ4qLJK9oJSL", "PauseView"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = t("../Controllers/GameControl"), a = t("../Controllers/UIControl"),
            i = t("../Controllers/CameraControl"), s = t("../Controllers/SoundControl"), r = t("./CommonUI"),
            c = cc._decorator, l = c.ccclass, d = (c.property, function (t) {
                function e() {
                    return null !== t && t.apply(this, arguments) || this
                }

                return __extends(e, t), e.prototype.onTouchBtn = function (t, e) {
                    if (this.node.active = !1, "restartBtn" == e) n.default.getInstance().consumeEnergy() && n.default.getInstance().restartGame(); else if ("continueBtn" == e) n.default.getInstance().pauseGame(!0), a.default.getInstance().showView("startNode", !0); else if ("leaveBtn" == e) {
                        var o = a.default.getInstance();
                        o.showView("CommonBg", !0), o.showView("StageView", !0), o.showView("CommonUI", !0), o.showView("BackBtnBg", !0), r.default.getInstance().AnimIn(!0), i.default.getInstance().node.active = !1, s.default.getInstance().stopBGM()
                    }
                }, e = __decorate([l], e)
            }(cc.Component));
        o.default = d, cc._RF.pop()
    }, {
        "../Controllers/CameraControl": "CameraControl",
        "../Controllers/GameControl": "GameControl",
        "../Controllers/SoundControl": "SoundControl",
        "../Controllers/UIControl": "UIControl",
        "./CommonUI": "CommonUI"
    }],
    PlayerControl: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "aa84eoHIdVMjKiXAhaJcElD", "PlayerControl"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = t("./GameControl"), a = t("./SoundControl"), i = t("./TerrainControl"), s = t("./CameraControl"),
            r = t("../Views/GameBackground"), c = t("../Views/GameVIew"), l = t("./UIControl"), d = cc._decorator,
            u = d.ccclass, p = d.property, h = function (t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.speed = 300, e.originspeed = 300, e.direction = 0, e.lastDirection = 0, e.touchSprite = null, e.playerSprite = null, e.scoreLabel = null, e.playerSpine = null, e.playerShadow = null, e.spineSkeleton = [], e.failedCross = null, e.gameBackgroundNode = null, e.animation = null, e.MOVEMENT = 148, e.defaultMovement = 148, e.tempMovement = 0, e.beatTimeFix = 0, e.beatTimeFixCount = 0, e.fixStartX = 0, e.fixStartY = 0, e.bpm = 0, e.avatorMulti = 1, e.animTimeScale = 1, e.beatTime = 0, e.WAIT_BEATS = 6, e.wait_time = 0, e.passed_time = 0, e.passed_beatNum = 0, e.passed_distance = 0, e.soundPlayed = !1, e.heartBeat = !1, e.systemOffset = 0, e.musicOffset = 0, e.playercenterOffset = 14, e.playerStar = 3, e.score = 0, e.diaNum = 0, e.isPause = !0, e.isAuto = !1, e.isRevive = !1, e.isJumping = !1, e.isJumpingProtect = !1, e.isJumpingTouch = !1, e.jumpPoint = cc.v2(0, 0), e.jumpTime = 0, e.jumpMulti = 1, e.jumpActionTime = .2, e.deathPoint = cc.v2(0, 0), e.isProtect = !1, e.protectBeatNum = 8, e.reviveTime = 0, e.touchInterval = 0, e.soundScheduleHandler = null, e.perfectLabel = null, e.labelPool = null, e.slowTime = 0, e.slowPassedTime = 0, e.instantCameraRoation = 0, e.touchDelay = 0, e.touchCount = 0, e.chapterId = 0, e.stageId = 0, e
                }

                var o;
                return __extends(e, t), o = e, e.getInstance = function () {
                    return o.instance
                }, e.prototype.onLoad = function () {
                    null == o.instance ? o.instance = this : o.instance != this && this.destroy(), this.touchSprite.setContentSize(cc.size(cc.visibleRect.height, cc.visibleRect.height)), this.touchSprite.on(cc.Node.EventType.TOUCH_START, this.onTouchPlayer, this), this.labelPool = new cc.NodePool, cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_LINUX ? this.systemOffset = -.2 : cc.sys.os == cc.sys.OS_IOS ? this.systemOffset = -.05 : this.systemOffset = 0, console.log("os", cc.sys.os)
                }, e.prototype.showPerfect = function (t) {
                }, e.prototype.setPlayerAvator = function (t) {
                    console.log("change avator skin", t), this.playerSpine.skeletonData = this.spineSkeleton[t], this.playerSpine.setMix("slip", "standby", .3), this.playerSpine.setMix("standby", "run", .3), this.playerSpine.setMix("run", "jump_high", .1)
                }, e.prototype.setSpineAnimation = function (t) {
                    this.playerSpine.animation = t
                }, e.prototype.getSkeletonData = function (t) {
                    return this.spineSkeleton[t]
                }, e.prototype.onTouchPlayer = function (t) {
                    var e = this;
                    if (1 == t || !(this.isPause || this.isProtect || this.touchInterval > 0 || this.isInCheckBoard())) {
                        if (this.touchInterval = .5 * this.beatTime, 1 == this.chapterId && 1 == this.stageId && -1 == i.default.getInstance().getPrevOp()) if (((a = i.default.getInstance().getNextOpByPlayer()).opTerrainData.pos.y - this.node.y) / this.speed - this.beatTime / 2 > 0) return void c.default.getInstance().NoTap();
                        var o = i.default.getInstance().getNextOp();
                        if (-1 != o) {
                            c.default.getInstance().hideHint();
                            var n = this.node.position.sub(cc.v2(o.opTerrainData.pos.x, o.opTerrainData.pos.y));
                            if (this.isAuto || (0 == this.direction ? Math.abs(n.y) < 20 ? this.score += 100 : this.score += 50 : Math.abs(n.x) < 20 ? this.score += 100 : this.score += 50), this.lastDirection = this.direction, this.direction = o.direction, this.passed_beatNum = o.opTerrainData.index, 0 == o.opType) {
                                this.isJumping = !1;
                                var a = i.default.getInstance().getNextOpByPlayer(), l = 0;
                                if ("run" != this.playerSpine.animation && (this.playerSpine.animation = "run"), -1 != a) {
                                    var d = a.opTerrainData.pos.sub(o.opTerrainData.pos);
                                    l = Math.sqrt(Math.pow(d.x, 2) + Math.pow(d.y, 2)), l /= this.MOVEMENT
                                }
                                var u = s.default.getInstance().gameCamera, p = r.default.getInstance();
                                if (0 == this.direction) {
                                    if (this.playerSprite.node.rotation = 0, l > 1) u.node.stopActionByTag(10001), (h = cc.rotateTo(.4, 0).easing(cc.easeCubicActionOut())).setTag(10001), u.node.runAction(h), this.instantCameraRoation = 0
                                } else if (1 == this.direction) {
                                    if (this.playerSprite.node.rotation = -90, l > 1) u.node.stopActionByTag(10001), (h = cc.rotateTo(.4, 45).easing(cc.easeCubicActionOut())).setTag(10001), u.node.runAction(h), (h = cc.rotateTo(.2, 45)).setTag(10001), this.instantCameraRoation = 45
                                } else if (2 == this.direction) {
                                    var h;
                                    if (this.playerSprite.node.rotation = 90, l > 1) u.node.stopActionByTag(10001), (h = cc.rotateTo(.4, -45).easing(cc.easeCubicActionOut())).setTag(10001), u.node.runAction(h), (h = cc.rotateTo(.2, -45)).setTag(10001), this.instantCameraRoation = -45
                                }
                                p.changeGameBgMove(this.direction)
                            } else if (1 == o.opType) {
                                this.isJumping = !0, this.jumpTime = this.passed_time, this.playerSpine.timeScale = this.animTimeScale * this.jumpMulti, this.playerSpine.animation = "jump_high", this.playerSpine.node.stopAllActions();
                                var g = cc.sequence(cc.scaleTo(this.jumpActionTime, this.playerSpine.node.scale + .3).easing(cc.easeCubicActionOut()), cc.delayTime(2 * (this.beatTime - this.jumpActionTime)), cc.callFunc(function () {
                                    e.playerSpine.animation = "jump_low"
                                }), cc.scaleTo(this.jumpActionTime, 1).easing(cc.easeCubicActionIn()));
                                this.playerSpine.node.runAction(g)
                            }
                            this.scoreLabel.string = this.score.toString(), i.default.getInstance().clickArrow()
                        }
                    }
                }, e.prototype.autoPlay = function (t) {
                    this.isAuto = t
                }, e.prototype.isAutoPlay = function () {
                    return this.isAuto
                }, e.prototype.resetPlayer = function () {
                    console.log("reset Player"), this.node.x = 0, this.node.y = 0, this.score = 0, this.diaNum = 0, this.scoreLabel.string = "0", this.wait_time = 0, this.passed_time = 0, this.soundPlayed = !1, this.heartBeat = !1, this.direction = 0, this.playerSprite.node.rotation = 0, this.playerSprite.node.scale = 1, this.playerShadow.active = !0, this.node.scale = 1, this.playerStar = 3, this.isRevive = !1, this.tempMovement = this.MOVEMENT, this.touchDelay = 0, this.touchCount = 0, this.node.runAction(cc.show()), this.bpm = 0, this.beatTimeFix = 0, this.beatTimeFixCount = 0, this.passed_beatNum = 0, this.passed_distance = 0, this.failedCross.active = !1, this.instantCameraRoation = 0, r.default.getInstance().reset(), this.avatorMulti = 1, null != c.default.getInstance() && (c.default.getInstance().enablePauseBtn(!0), c.default.getInstance().updateStar(this.playerStar)), a.default.getInstance().stopBGM(), this.playerSpine.paused = !1, this.playerSpine.animation = "standby", this.playerSpine.node.scale = 1, this.isProtect = !0, this.reviveTime = 0, this.chapterId = n.default.getInstance().chaperId, this.stageId = n.default.getInstance().stageId, c.default.getInstance() && c.default.getInstance().hideHint()
                }, e.prototype.fixSpeed = function (t, e, o) {
                    if (void 0 != t) {
                        var n = this.beatTime * t, a = this.MOVEMENT * t;
                        0 == this.lastDirection ? 1 == this.direction ? a += o.x : a -= o.x : 1 == this.lastDirection ? a -= o.y : 2 == this.lastDirection && (a -= o.y), t > 3 ? (n -= this.passed_time - this.passed_beatNum * this.beatTime, this.speed = a / n) : this.speed = this.MOVEMENT / this.beatTime
                    } else this.speed = this.MOVEMENT / this.beatTime
                }, e.prototype.setWaitBeats = function (t) {
                    this.WAIT_BEATS = t
                }, e.prototype.getBeatTime = function () {
                    return this.beatTime
                }, e.prototype.setOffset = function (t) {
                    this.musicOffset = t, cc.sys.localStorage.setItem("musicOffset", t)
                }, e.prototype.setMovement = function (t) {
                    this.MOVEMENT = t
                }, e.prototype.setSpeedByBpm = function (t) {
                    this.bpm = t, this.beatTime = 60 / t, this.speed = this.MOVEMENT / this.beatTime, this.originspeed = this.speed, console.log("player speed", this.speed, this.beatTime), null != n.default.getInstance().stageData && (this.avatorMulti = n.default.getInstance().stageData.animMulti, this.jumpMulti = n.default.getInstance().stageData.jumpMulti), null == this.avatorMulti && (this.avatorMulti = 1), null == this.jumpMulti && (this.jumpMulti = 1), this.playerSpine.timeScale = this.bpm / 120 * this.avatorMulti, this.animTimeScale = this.playerSpine.timeScale, this.jumpActionTime = this.beatTime > .2 ? .2 : this.beatTime, r.default.getInstance().setSpriteIndexAndSpeed(0, 1, cc.color(255, 255, 255, 255))
                }, e.prototype.pausePlayer = function (t) {
                    this.isPause = t
                }, e.prototype.showAvator = function (t) {
                    this.playerSprite.node.active = t, this.touchSprite.active = t, this.perfectLabel.node.active = t
                }, e.prototype.onCollisionEnter = function (t, e) {
                    if (20001 == t.tag) {
                        this.isProtect = !1, c.default.getInstance().protectNode.active = !1, c.default.getInstance().protectLabel.node.active = !1, c.default.getInstance().protectProgress.active = !1, this.isRevive = !1, this.pausePlayer(!0), null != c.default.getInstance() && c.default.getInstance().enablePauseBtn(!1), a.default.getInstance().stopBGM(), this.playerSpine.paused = !1;
                        var o = i.default.getInstance().getEndPos(), s = o.sub(this.node.position), r = 0;
                        0 == this.direction ? r = s.y / this.speed : 1 == this.direction ? r = -s.x / this.speed : 2 == this.direction && (r = s.x / this.speed), this.slowTime = 2 * r, this.playerSpine.animation = "slip";
                        var l = cc.sequence(cc.moveTo(this.slowTime, o).easing(cc.easeCubicActionOut()), cc.callFunc(function () {
                            this.playerSpine.animation = "standby"
                        }.bind(this)), cc.delayTime(.5), cc.callFunc(function () {
                            n.default.getInstance().showFinished()
                        }.bind(this)));
                        this.slowPassedTime = 0, this.node.runAction(l), c.default.getInstance().showFinishParticle()
                    } else if (20002 == t.tag) {
                        l = cc.sequence(cc.spawn(cc.scaleTo(.2, 2), cc.fadeOut(.2)), cc.callFunc(function () {
                            i.default.getInstance().removeTreasure(t.node)
                        }));
                        t.node.runAction(l), i.default.getInstance().addZuanshiParticle(t.node.position), this.score += 50, this.scoreLabel.string = this.score.toString(), this.diaNum++
                    }
                }, e.prototype.isInCheckBoard = function () {
                    return i.default.getInstance().checkIsInCheckBoard(this.node.position)
                }, e.prototype.revivePlayer = function () {
                    console.log("revivePlayer"), c.default.getInstance().updateStar(this.playerStar), c.default.getInstance().hideHint(), this.failedCross.active = !1, s.default.getInstance().reviveZoom(), this.node.runAction(cc.show()), this.reviveTime = this.passed_time;
                    var t = this.passed_time + this.musicOffset + this.systemOffset, e = s.default.getInstance().gameCamera,
                        o = i.default.getInstance(), n = Math.floor(t / this.beatTime), a = t - this.beatTime * n,
                        r = o.getPositionByBeatNum(n), d = o.getPositionByBeatNum(n + 1),
                        u = o.getPositionByBeatNum(n + this.protectBeatNum);
                    if (null != d) {
                        d.y > r.y ? (this.direction = 0, this.playerSprite.node.rotation = 0, e.node.rotation = 0, this.node.position = cc.v2(r.x, r.y + this.MOVEMENT * a / this.beatTime)) : d.x < r.x ? (this.direction = 1, this.playerSprite.node.rotation = -90, e.node.rotation = -45, this.node.position = cc.v2(r.x - this.MOVEMENT * a / this.beatTime, r.y)) : d.x > r.x && (this.direction = 2, this.playerSprite.node.rotation = 90, e.node.rotation = 45, this.node.position = cc.v2(r.x + this.MOVEMENT * a / this.beatTime, r.y)), this.node.scale = 1;
                        o.reviveFixArrow(this.node.position, u);
                        console.log("playerpos ", this.node.x, this.node.y), this.playerSprite.node.scale = 1, this.playerShadow.active = !0
                    } else console.log("revivePlayer error", n);
                    if (this.isRevive = !0, c.default.getInstance().resetProgress(), l.default.getInstance().showView("startNode", !0), !i.default.getInstance().checkIsInTerrain(cc.v2(this.node.x, this.node.y - 14)) || this.checkPrevJumpOp()) {
                        console.log("player is not in Terrain!"), this.isJumpingProtect = !0;
                        var p = o.getNextJumpEndPostion(n);
                        null == p && console.log("getNextJumpEndPostion is null!");
                        var h = this.node.position.sub(p), g = Math.sqrt(h.x * h.x + h.y * h.y) / this.speed;
                        if (console.log("jumpendTime", g), g >= this.beatTime) {
                            var f = g - this.beatTime;
                            this.playerSpine.node.scale = 1.3;
                            var y = cc.sequence(cc.delayTime(f), cc.delayTime(2 * (this.beatTime - this.jumpActionTime)), cc.scaleTo(this.jumpActionTime, 1), cc.callFunc(function () {
                                this.isJumpingProtect = !1, this.playerSpine.animation = "run", this.playerSpine.timeScale = this.animTimeScale
                            }.bind(this)));
                            this.playerSpine.node.runAction(y), this.playerSpine.node.pauseAllActions()
                        } else {
                            y = null;
                            g > this.jumpActionTime ? (this.playerSpine.node.scale = 1.3, y = cc.sequence(cc.delayTime(g - this.jumpActionTime), cc.scaleTo(this.jumpActionTime, 1), cc.callFunc(function () {
                                this.isJumpingProtect = !1, this.playerSpine.animation = "run", this.playerSpine.timeScale = this.animTimeScale
                            }.bind(this)))) : (this.playerSpine.node.scale = 1 + .3 * g / this.jumpActionTime, y = cc.sequence(cc.scaleTo(g, 1), cc.callFunc(function () {
                                this.isJumpingProtect = !1, this.playerSpine.animation = "run", this.playerSpine.timeScale = this.animTimeScale
                            }.bind(this)))), this.playerSpine.node.runAction(y), this.playerSpine.node.pauseAllActions()
                        }
                    } else console.log("player is in Terrain!")
                }, e.prototype.checkPrevJumpOp = function () {
                    var t = i.default.getInstance().getPrevOp();
                    if (-1 != t && 1 == t.opType) {
                        var e = t.opTerrainData.pos.sub(this.node.position), o = Math.sqrt(e.x * e.x + e.y * e.y);
                        if (t.direction == this.direction && o < 2 * this.MOVEMENT) return console.log("player is in jumping"), !0
                    }
                    return !1
                }, e.prototype.resumeSpineAction = function () {
                    this.playerSpine.paused = !1, this.playerSpine.node.resumeAllActions()
                }, e.prototype.checkJumping = function () {
                    this.isJumping && (this.passed_time - this.jumpTime > 2 * this.beatTime && (this.isJumping = !1, this.playerSpine.animation = "run", this.playerSpine.timeScale = this.animTimeScale))
                }, e.prototype.update = function (t) {
                    if (!this.isPause) {
                        if (0 == this.direction ? this.node.y += this.speed * t : 1 == this.direction ? this.node.x -= this.speed * t : 2 == this.direction && (this.node.x += this.speed * t), this.soundPlayed && (this.passed_time += t), this.gameBackgroundNode.position = this.node.position, this.passed_distance += this.speed * t, this.touchInterval -= t, 1 == this.chapterId && 1 == this.stageId && -1 == i.default.getInstance().getPrevOp()) (i.default.getInstance().getNextOpByPlayer().opTerrainData.pos.y - this.node.y) / this.speed - this.beatTime / 2 < 0 && c.default.getInstance().TapNow();
                        if (this.isAuto) this.AutoPlay(); else if (this.wait_time += t, this.isProtect) if (this.checkJumping(), this.AutoPlay(), this.isRevive) {
                            var e = (this.protectBeatNum + .5) * this.beatTime;
                            c.default.getInstance().protectNode.active = !0, c.default.getInstance().protectLabel.node.active = !0;
                            var o = e - (this.passed_time - this.reviveTime);
                            c.default.getInstance().setProgress(o / e), c.default.getInstance().protectTimeCD.string = o.toFixed(2), c.default.getInstance().protectProgress.active = !0, this.passed_time / this.beatTime - Math.floor(this.reviveTime / this.beatTime) > this.protectBeatNum + .5 && (this.isProtect = !1, c.default.getInstance().protectNode.active = !1, c.default.getInstance().protectLabel.node.active = !1, c.default.getInstance().protectProgress.active = !1, c.default.getInstance().enablePauseBtn(!0), this.isRevive = !1)
                        } else this.wait_time >= this.WAIT_BEATS * this.beatTime && 0 == this.heartBeat && (r.default.getInstance().startHeartBeat(), this.heartBeat = !0), this.wait_time >= this.WAIT_BEATS * this.beatTime + this.musicOffset + this.systemOffset && 0 == this.soundPlayed && (a.default.getInstance().playBGM(), this.soundPlayed = !0, this.isProtect = !1, console.log("music!")); else if (this.checkJumping(), !i.default.getInstance().checkIsInTerrain(cc.v2(this.node.x, this.node.y - 14)) && !this.isJumping && !this.isJumpingProtect) {
                            1 == this.chapterId && 1 == this.stageId && -1 == i.default.getInstance().getPrevOp() && c.default.getInstance().TooLate(), 1 == this.chapterId && 1 == this.stageId && 2 == i.default.getInstance().getPrevOpLength() && c.default.getInstance().TooSoon(), null != c.default.getInstance() && c.default.getInstance().enablePauseBtn(!1), this.playerStar--, 1 == this.chapterId && 1 == this.stageId && (this.playerStar = 0), 0 == this.playerStar ? a.default.getInstance().stopBGM() : a.default.getInstance().pauseBGM(), n.default.getInstance().pauseGame(!0), s.default.getInstance().failedZoom();
                            var l = cc.sequence(cc.spawn(cc.rotateBy(.3, 180), cc.scaleTo(.3, 0)), cc.hide(), cc.delayTime(.2), cc.callFunc(function () {
                                n.default.getInstance().showFailed()
                            }));
                            this.playerSprite.node.runAction(l), this.playerShadow.active = !1, this.playerSpine.paused = !0, a.default.getInstance().playSE(0), this.failedCross.active = !0, this.failedCross.opacity = 0, this.failedCross.scale = 0, this.failedCross.position = this.node.position;
                            s.default.getInstance().gameCamera;
                            0 == this.instantCameraRoation ? this.failedCross.rotation = 45 : this.failedCross.rotation = 0, this.failedCross.runAction(cc.sequence(cc.delayTime(.15), cc.spawn(cc.fadeIn(.15), cc.scaleTo(.15, 1.5))))
                        }
                    }
                }, e.prototype.AutoPlay = function () {
                    this.isJumpingProtect || this.isJumping || (0 == this.direction ? i.default.getInstance().checkIsInTerrain(cc.v2(this.node.x, this.node.y + this.defaultMovement / 2)) || this.onTouchPlayer(!0) : 1 == this.direction ? i.default.getInstance().checkIsInTerrain(cc.v2(this.node.x - this.defaultMovement / 2, this.node.y)) || this.onTouchPlayer(!0) : 2 == this.direction && (i.default.getInstance().checkIsInTerrain(cc.v2(this.node.x + this.defaultMovement / 2, this.node.y)) || this.onTouchPlayer(!0)))
                }, e.prototype.setPlayerProtect = function (t, e, o) {
                    this.isProtect = t
                }, e.prototype.getPassedDis = function () {
                    return this.passed_distance
                }, e.instance = null, __decorate([p], e.prototype, "speed", void 0), __decorate([p], e.prototype, "direction", void 0), __decorate([p(cc.Node)], e.prototype, "touchSprite", void 0), __decorate([p(cc.Sprite)], e.prototype, "playerSprite", void 0), __decorate([p(cc.Label)], e.prototype, "scoreLabel", void 0), __decorate([p(sp.Skeleton)], e.prototype, "playerSpine", void 0), __decorate([p(cc.Node)], e.prototype, "playerShadow", void 0), __decorate([p(sp.SkeletonData)], e.prototype, "spineSkeleton", void 0), __decorate([p(cc.Node)], e.prototype, "failedCross", void 0), __decorate([p(cc.Node)], e.prototype, "gameBackgroundNode", void 0), __decorate([p], e.prototype, "MOVEMENT", void 0), __decorate([p(cc.Label)], e.prototype, "perfectLabel", void 0), e = o = __decorate([u], e)
            }(cc.Component);
        o.default = h, cc._RF.pop()
    }, {
        "../Views/GameBackground": "GameBackground",
        "../Views/GameVIew": "GameVIew",
        "./CameraControl": "CameraControl",
        "./GameControl": "GameControl",
        "./SoundControl": "SoundControl",
        "./TerrainControl": "TerrainControl",
        "./UIControl": "UIControl"
    }],
    Random: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "9d0789/yeZOdIWjRYANgZ3Y", "Random"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = function () {
            function t() {
            }

            return t.Random0To1Float = function () {
                return Math.random()
            }, t.Random0To1Int = function () {
                return Math.round(Math.random())
            }, t.Random0TO9Int = function () {
                return Math.floor(10 * Math.random())
            }, t.RandomInt = function (t, e) {
                var o = e - t;
                return Math.floor(Math.random() * (o + 1)) + t
            }, t.RandomFloat = function (t, e) {
                return Math.random() * (e - t) + t
            }, t
        }();
        o.Random = n, cc._RF.pop()
    }, {}],
    RankFrame: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "f00987Ol3pOvLK2qLGG/lB5", "RankFrame"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = cc._decorator, a = n.ccclass, i = (n.property, function (t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.graphics = null, e
            }

            return __extends(e, t), e.prototype.onLoad = function () {
                this.graphics = this.node.getComponent("cc.Graphics")
            }, e.prototype.drawFrame = function (t, e, o, n) {
                var a = this.graphics;
                a.fillColor = n, a.moveTo(t.x, t.y), a.lineTo(t.x + e, t.y), a.lineTo(t.x + e, t.y + o), a.lineTo(t.x, t.y + o), a.fill()
            }, e.prototype.clear = function () {
                this.graphics.clear()
            }, e = __decorate([a], e)
        }(cc.Component));
        o.default = i, cc._RF.pop()
    }, {}],
    RankView: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "4af6eIc9lZMkrA7wwAbiHII", "RankView"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = t("../Controllers/GameControl"), a = t("Logger"), i = cc._decorator, s = i.ccclass, r = i.property,
            c = function (t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.rankItem = null, e.content = null, e.rankFrame = [], e.colorWhite = cc.color(255, 255, 255, 99.45), e.colorBlack = cc.color(0, 0, 0, 99.45), e.BUTTONWIDTH = 344, e.BUTTONHEIGHT = 127, e.FRAMEWIDTH = 2, e.FRAMEHEIGHT = 6, e.WINDOWWIDTH = 720, e.WINDOWHEIGHT = 935, e.BTN_INTERVAL = 372, e.BTN_NUM = 2, e.selectedIndex = 1, e.rankData = [], e.isNeedRefresh = !0, e
                }

                var o;
                return __extends(e, t), o = e, e.getInstance = function () {
                    return o.instance
                }, e.prototype.onLoad = function () {
                    null == o.instance ? o.instance = this : o.instance != this && this.destroy()
                }, e.prototype.start = function () {
                }, e.prototype.onEnable = function () {
                    this.isNeedRefresh && (this.createRankList(n.default.getInstance().totalLeaderBoardEntries), this.isNeedRefresh = !1)
                }, e.prototype.getRankData = function () {
                    return this.rankData
                }, e.prototype.createRankList = function (t) {
                    if (this.rankData = t, this.content.removeAllChildren(), !(null == this.rankData || this.rankData.length <= 0)) {
                        for (var e = 0, o = 0, n = this.rankData; o < n.length; o++) {
                            var a = n[o], i = cc.instantiate(this.rankItem);
                            i.active = !0;
                            var s = i.getChildByName("rankLabel").getComponent(cc.Label);
                            s.string = a.playerRank.toString();
                            var r = i.getChildByName("rankSp").getComponent(cc.Sprite);
                            a.playerRank > 0 && a.playerRank < 4 ? (r.spriteFrame = this.rankFrame[a.playerRank - 1], r.node.active = !0, s.node.active = !1) : (r.node.active = !1, s.node.active = !0), i.getChildByName("nameLabel").getComponent(cc.Label).string = a.playerName, i.getChildByName("scoreLabel").getComponent(cc.Label).string = a.playerScore.toString();
                            var c = i.getChildByName("mask").getChildByName("rankIcon").getComponent(cc.Sprite);
                            c.spriteFrame = a.playerPic, c.node.setContentSize(cc.size(80, 80)), this.content.addChild(i), i.y = -145 * e, e++
                        }
                        this.content.setContentSize(cc.size(this.content.width, 145 * this.rankData.length))
                    }
                }, e.prototype.onBackClick = function () {
                }, e.prototype.onInviteFriend = function () {
                    n.default.getInstance().FBShare("INVITE", FBInstant.player.getName() + " is challenging you!"), a.default.analytics("rank_share", {player_id: FBInstant.player.getID()})
                }, e.prototype.onTouchPageBtn = function (t, e) {
                    this.selectedIndex = e
                }, e.instance = null, __decorate([r(cc.Node)], e.prototype, "rankItem", void 0), __decorate([r(cc.Node)], e.prototype, "content", void 0), __decorate([r(cc.SpriteFrame)], e.prototype, "rankFrame", void 0), e = o = __decorate([s], e)
            }(cc.Component);
        o.default = c, cc._RF.pop()
    }, {"../Controllers/GameControl": "GameControl", Logger: "Logger"}],
    ScoreView: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "87cb7n9i2BMppFHZxoZ3IZq", "ScoreView"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = t("../Controllers/GameControl"), a = t("../Controllers/UIControl"),
            i = t("../Controllers/CameraControl"), s = t("../Controllers/PlayerControl"),
            r = t("../Controllers/MapControl"), c = t("../Framework/Facebook/FacebookPlayerInfoInRank"),
            l = t("./RankView"), d = t("./CommonUI"), u = t("../Framework/Facebook/FacebookPlayerPicDic"),
            p = t("Facebook"), h = t("GlobalConfig"), g = t("../Controllers/SoundControl"), f = t("../Data/Constants"),
            y = t("Logger"), m = cc._decorator, v = m.ccclass, I = m.property, _ = function (t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.progressBar = null, e.num_dia = null, e.num_pre = null, e.arrow = null, e.icon_dia = null, e.ReviveBtn = null, e.CancelBtn = null, e.StageBtn = null, e.RetryBtn = null, e.ShareBtn = null, e.starAnimation = null, e.scoreLabel = null, e.content = null, e.rankItem = null, e.myRankItem = null, e.scoreLayout = null, e.scoreLayoutOriPosY = 0, e.starBg = null, e.ptsLabel = null, e.yougetLabel = null, e.miniRankbar = null, e.rankBarOriPosY = 0, e.unlockTips = null, e.unlockIcon = null, e.unlockNode = null, e.unlockNode2 = null, e.mask = null, e.countDown = 10, e.isCountDown = !1, e.grade = 0, e.star = 0, e.isExpUp = !1, e.scoreTime = 1, e.scoreFinished = !0, e.stageRankData = null, e
                }

                var o;
                return __extends(e, t), o = e, e.getInstance = function () {
                    return o.instance
                }, e.prototype.onLoad = function () {
                    null == o.instance ? o.instance = this : o.instance != this && this.destroy(), this.rankBarOriPosY = this.miniRankbar.y, this.scoreLayoutOriPosY = this.scoreLayout.y
                }, e.prototype.onTouchBtn = function (t, e) {
                    var o = this;
                    if ("restartBtn" == e) n.default.getInstance().consumeEnergy() && (y.default.analytics("ads_retry_1", {
                        player_id: ""/*FBInstant.player.getID()*/,
                        type: 1
                    }),
                        p.default.FBAd.ShowAd(h.default.FacebookAdIndex.get("INTERSTITIAL_" + h.default.packageType), function () {
                        y.default.analytics("ads_retry_2", {
                            player_id: ""/*FBInstant.player.getID()*/,
                            type: 1
                        }), n.default.getInstance().restartGame(), this.node.active = !1
                    }.bind(this), function () {
                        n.default.getInstance().restartGame(), this.node.active = !1
                    }.bind(this), 5)); else if ("nextBtn" == e) console.log("next Stage"); else if ("leaveBtn" == e) {
                        this.node.active = !1, (r = a.default.getInstance()).showView("CommonBg", !0), r.showView("StageView", !0), r.showView("CommonUI", !0), r.showView("BackBtnBg", !0), d.default.getInstance().AnimIn(!0), i.default.getInstance().node.active = !1
                    } else if ("continueBtn" == e) {
                        var r;
                        this.node.active = !1, (r = a.default.getInstance()).showView("CommonBg", !0), r.showView("StageView", !0), r.showView("CommonUI", !0), r.showView("BackBtnBg", !0), d.default.getInstance().AnimIn(!0), i.default.getInstance().node.active = !1
                    } else "shareBtn" == e ? (console.log("call share Func"), n.default.getInstance().FBShare("SHARE", FBInstant.player.getName() + " get " + s.default.getInstance().score + " score in " + f.default.getInstance().getStage(n.default.getInstance().chaperId, n.default.getInstance().stageId).title + ". Let's challenge!"), y.default.analytics("stage_share", {
                        player_id: FBInstant.player.getID(),
                        stageId: 1e3 * n.default.getInstance().chaperId + n.default.getInstance().stageId
                    })) : "CancelBtn" == e ? this.AdvFinished(!1) : "ReviveBtn" == e && (y.default.analytics("ads_double_1", {player_id: /*FBInstant.player.getID()*/""}), n.default.getInstance().showAdWithRetry(function () {
                        y.default.analytics("ads_double_2", {player_id: /*FBInstant.player.getID()*/""}), o.AdvFinished(!0)
                    },
                        function () {
                        o.AdvFinished(!1)
                    }))
                },
                    e.prototype.onEnable = function () {
                    var t = n.default.getInstance().chaperId, e = n.default.getInstance().stageId,
                        o = s.default.getInstance().score, a = s.default.getInstance().diaNum;
                    this.ReviveBtn.active = !0, this.CancelBtn.active = !0, this.StageBtn.active = !1, this.RetryBtn.active = !1, this.ShareBtn.active = !1, this.num_dia.string = a.toString(), this.scoreLabel.string = "0", this.num_pre.node.active = !1, this.arrow.node.active = !1, this.icon_dia.node.x = -60, this.num_dia.node.x = 41, this.createRankList(n.default.getInstance().stageLeaderBoardEntries[t - 1][e - 1]), this.grade = o / r.default.getInstance().maxScore, this.unlockNode.active = !1, this.unlockNode2.active = !1, this.star = s.default.getInstance().playerStar;
                    var i = n.default.getInstance().getFBData();
                    i.diamond += s.default.getInstance().diaNum;
                    var c = i.chapterInfo[t - 1].bestScore[e - 1];
                    i.chapterInfo[t - 1].bestScore[e - 1] = c > o ? c : o;
                    var d = i.chapterInfo[t - 1].star[e - 1];
                    i.chapterInfo[t - 1].star[e - 1] = d > this.star ? d : this.star, n.default.getInstance().setFBData(i),
                        // n.default.getInstance().stageLeaderBoard[t - 1][e - 1].setScoreAsync(o, ""),
                    null != l.default.getInstance() && (l.default.getInstance().isNeedRefresh = !0), this.viewAnimReady(), this.viewAnimPlay(), this.isExpUp = !1,
                        y.default.analytics("ads_double", {player_id: ""/*FBInstant.player.getID()*/}),
                        console.log("stage_pass", 1e3 * t + e, this.star, o), y.default.analytics("stage_pass", {
                        player_id: /*FBInstant.player.getID()*/"",
                        stageId: 1e3 * t + e,
                        star: this.star,
                        score: o
                    })
                }, e.prototype.onDisable = function () {
                    this.isCountDown = !1
                }, e.prototype.viewAnimReady = function () {
                    this.scoreLayout.active = !1, this.scoreLayout.y = this.scoreLayoutOriPosY + 420, this.starBg.active = !1, this.scoreLabel.node.active = !1, this.ptsLabel.active = !1, this.yougetLabel.active = !1, this.icon_dia.node.active = !1, this.num_dia.node.active = !1, this.ReviveBtn.active = !1, this.CancelBtn.active = !1, this.starAnimation.node.active = !1, this.miniRankbar.y = this.rankBarOriPosY - 200, this.scoreTime = 1, this.scoreFinished = !1
                }, e.prototype.viewAnimPlay = function () {
                    var t = function () {
                        g.default.getInstance().playSE(3), this.starBg.active = !0, this.starBg.scale = .1, this.starBg.runAction(cc.sequence(cc.scaleTo(.25, 1.05), cc.delayTime(.05), cc.scaleTo(.1, 1), cc.callFunc(function () {
                            this.scoreLabel.node.active = !0, this.ptsLabel.active = !0, this.starAnimation.node.active = !0, 1 == this.star ? (this.starAnimation.play("first_sanxing_anim"), this.scheduleOnce(function () {
                                g.default.getInstance().playSE(9)
                            }, .05)) : 2 == this.star ? (this.starAnimation.play("second_sanxing_anim"), this.scheduleOnce(function () {
                                g.default.getInstance().playSE(10)
                            }, .05)) : 3 == this.star && (this.starAnimation.play("third_sanxing_anim"), this.scheduleOnce(function () {
                                g.default.getInstance().playSE(11)
                            }, .05))
                        }.bind(this))))
                    }.bind(this), e = function () {
                        this.yougetLabel.active = !0, this.scheduleOnce(function () {
                            this.icon_dia.node.active = !0, this.num_dia.node.active = !0
                        }.bind(this), .05), this.ReviveBtn.active = !0, this.progressBar.progress = 1, this.countDown = 10, this.ReviveBtn.scale = .1, this.ReviveBtn.runAction(cc.scaleTo(.25, 1)), this.CancelBtn.active = !0, this.CancelBtn.runAction(cc.scaleTo(.25, 1)), this.isExpUp ? this.isCountDown = !1 : this.isCountDown = !0
                    }.bind(this), o = function () {
                        this.miniRankbar.runAction(cc.sequence(cc.delayTime(.05 * 3), cc.moveBy(.05 * 6, cc.v2(0, 200)))), this.isExpUp && a.default.getInstance().showView("LevelUpView", !0), this.updateUnlockNode()
                    }.bind(this);
                    this.scoreLayout.active = !0, this.scoreLayout.runAction(cc.sequence(cc.moveBy(.25, cc.v2(0, -407)), cc.callFunc(t), cc.spawn(cc.moveBy(.05, cc.v2(.05 * 3, -13)), cc.scaleTo(.05 * 3, 1.05)), cc.scaleTo(.25, 1), cc.delayTime(.25), cc.callFunc(e), cc.delayTime(.25), cc.callFunc(o)))
                }, e.prototype.updateUnlockNode = function () {
                    var t = n.default.getInstance().getCheapestMusicDia();
                    if (-1 == t) this.unlockNode.active = !1, this.unlockNode2.active = !1; else {
                        var e = n.default.getInstance().playerInfo.diamond;
                        e >= t ? this.unlockNode.active = !1 : (this.unlockTips.string = (t - e).toString(), this.unlockNode.active = !0)
                    }
                }, e.prototype.pauseDoubleCD = function (t) {
                    this.isCountDown = !t
                }, e.prototype.AdvFinished = function (t) {
                    n.default.getInstance().chaperId, n.default.getInstance().stageId;
                    var e = s.default.getInstance().diaNum;
                    s.default.getInstance().score;
                    if (this.ReviveBtn.active = !1, this.CancelBtn.active = !1, this.StageBtn.active = !0, this.RetryBtn.active = !0, this.ShareBtn.active = !0, t) {
                        this.num_pre.string = e.toString(), this.num_dia.string = (2 * e).toString(), this.icon_dia.node.x = -123, this.num_pre.node.x = -38, this.arrow.node.x = 44, this.num_dia.node.x = 122, this.num_pre.node.active = !0, this.arrow.node.active = !0;
                        var o = n.default.getInstance().getFBData();
                        o.diamond += s.default.getInstance().diaNum, n.default.getInstance().setFBData(o), null != d.default.getInstance() && d.default.getInstance().setGold(o.diamond)
                    }
                    this.countDown = 0, this.updateUnlockNode(), y.default.analytics("ads_retry", {
                        player_id: ""/*FBInstant.player.getID()*/,
                        type: 1
                    })
                }, e.prototype.createRankList = function (t) {
                    if (this.content.removeAllChildren(), null != t) {
                        for (var e = 0, o = !1, n = s.default.getInstance().score, a = 0, i = t; a < i.length; a++) {
                            if ((p = i[a]).playerId == FBInstant.player.getID()) {
                                p.playerScore = n > p.playerScore ? n : p.playerScore, o = !0;
                                break
                            }
                        }
                        if (!o) {
                            var r = new c.default;
                            r.playerScore = n, r.playerId = FBInstant.player.getID(), r.playerName = FBInstant.player.getName(), r.playerPicUrl = FBInstant.player.getPhoto(), t.push(r), u.default.AddToPlayerPicDic(r.playerId, r.playerPicUrl), r.playerPic = u.default.GetPlayerPic(r.playerId)
                        }
                        t.sort(function (t, e) {
                            return t.playerScore > e.playerScore ? -1 : 1
                        });
                        for (var l = 0, d = t; l < d.length; l++) {
                            var p = d[l], h = cc.instantiate(this.rankItem);
                            h.active = !0, h.getChildByName("rankLabel").getComponent(cc.Label).string = (e + 1).toString() + "." + p.playerName, h.getChildByName("scoreLabel").getComponent(cc.Label).string = this.getScoreFormatString(p.playerScore);
                            var g = h.getChildByName("mask").getChildByName("rankIcon").getComponent(cc.Sprite);
                            g.spriteFrame = p.playerPic, g.node.setContentSize(cc.size(80, 80)), this.content.addChild(h), h.x = 200 * e, e++, p.playerId == FBInstant.player.getID() && (p.playerRank = e, this.updateSelfInfo(p))
                        }
                        this.content.setContentSize(cc.size(200 * e, this.content.height)), this.stageRankData = t
                    }
                }, e.prototype.updateSelfInfo = function (t) {
                    var e = this.myRankItem;
                    e.getChildByName("rankLabel").getComponent(cc.Label).string = t.playerRank + "." + t.playerName, e.getChildByName("scoreLabel").getComponent(cc.Label).string = this.getScoreFormatString(t.playerScore);
                    var o = e.getChildByName("mask").getChildByName("rankIcon").getComponent(cc.Sprite);
                    o.spriteFrame = t.playerPic, o.node.setContentSize(cc.size(80, 80))
                }, e.prototype.getScoreFormatString = function (t) {
                    var e = t.toString();
                    if (t >= 1e3) {
                        e = Math.floor(t / 1e3) + ",";
                        for (var o = 0; o < 3 - (t % 1e3).toString().length; o++) e += "0";
                        e += (t % 1e3).toString()
                    }
                    return e
                }, e.prototype.update = function (t) {
                    if (this.isCountDown) {
                        this.countDown -= t;
                        var e = 1 - this.countDown / 10;
                        e >= 1 && (e = 1, this.progressBar.progress = 0, this.AdvFinished(!1), this.isCountDown = !1), this.progressBar.progress = 1 - e
                    }
                    !this.scoreFinished && this.scoreLabel.node.active && (this.scoreTime > 0 ? (this.scoreLabel.string = this.getScoreFormatString(Math.floor(s.default.getInstance().score * (1 - this.scoreTime))), this.scoreTime -= t) : (this.scoreLabel.string = this.getScoreFormatString(s.default.getInstance().score), this.scoreFinished = !0))
                }, e.instance = null, __decorate([I(cc.ProgressBar)], e.prototype, "progressBar", void 0), __decorate([I(cc.Label)], e.prototype, "num_dia", void 0), __decorate([I(cc.Label)], e.prototype, "num_pre", void 0), __decorate([I(cc.Sprite)], e.prototype, "arrow", void 0), __decorate([I(cc.Sprite)], e.prototype, "icon_dia", void 0), __decorate([I(cc.Node)], e.prototype, "ReviveBtn", void 0), __decorate([I(cc.Node)], e.prototype, "CancelBtn", void 0), __decorate([I(cc.Node)], e.prototype, "StageBtn", void 0), __decorate([I(cc.Node)], e.prototype, "RetryBtn", void 0), __decorate([I(cc.Node)], e.prototype, "ShareBtn", void 0), __decorate([I(cc.Animation)], e.prototype, "starAnimation", void 0), __decorate([I(cc.Label)], e.prototype, "scoreLabel", void 0), __decorate([I(cc.Node)], e.prototype, "content", void 0), __decorate([I(cc.Node)], e.prototype, "rankItem", void 0), __decorate([I(cc.Node)], e.prototype, "myRankItem", void 0), __decorate([I(cc.Node)], e.prototype, "scoreLayout", void 0), __decorate([I(cc.Node)], e.prototype, "starBg", void 0), __decorate([I(cc.Node)], e.prototype, "ptsLabel", void 0), __decorate([I(cc.Node)], e.prototype, "yougetLabel", void 0), __decorate([I(cc.Node)], e.prototype, "miniRankbar", void 0), __decorate([I(cc.Label)], e.prototype, "unlockTips", void 0), __decorate([I(cc.Node)], e.prototype, "unlockIcon", void 0), __decorate([I(cc.Node)], e.prototype, "unlockNode", void 0), __decorate([I(cc.Node)], e.prototype, "unlockNode2", void 0), __decorate([I(cc.Node)], e.prototype, "mask", void 0), e = o = __decorate([v], e)
            }(cc.Component);
        o.default = _, cc._RF.pop()
    }, {
        "../Controllers/CameraControl": "CameraControl",
        "../Controllers/GameControl": "GameControl",
        "../Controllers/MapControl": "MapControl",
        "../Controllers/PlayerControl": "PlayerControl",
        "../Controllers/SoundControl": "SoundControl",
        "../Controllers/UIControl": "UIControl",
        "../Data/Constants": "Constants",
        "../Framework/Facebook/FacebookPlayerInfoInRank": "FacebookPlayerInfoInRank",
        "../Framework/Facebook/FacebookPlayerPicDic": "FacebookPlayerPicDic",
        "./CommonUI": "CommonUI",
        "./RankView": "RankView",
        Facebook: "Facebook",
        GlobalConfig: "GlobalConfig",
        Logger: "Logger"
    }],
    ScreenShot: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "5c316WlyyZOwIcnyNKOPu+0", "ScreenShot"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = function () {
            return function () {
            }
        }();
        o.ScreenShot = n, cc._RF.pop()
    }, {}],
    SettingView: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "79fca+rU/NFfLLQ8sOzGGS+", "SettingView"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = t("../Controllers/PlayerControl"), a = t("../Controllers/SoundControl"), i = t("Logger"),
            s = cc._decorator, r = s.ccclass, c = s.property, l = function (t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.roadNode = null, e.lineNode = null, e.arrowFrame = [], e.arrowSprite = [], e.oplineNode = [], e.touchNode = null, e.checkIcon = null, e.testBpm = 125, e.movement = 148, e.passed_time = 0, e.beattime = 0, e.musicOffset = 0, e.allset = !1, e.isReseted = !0, e.resultArray = [], e.orginDelay = 0, e.systemOffset = 0, e.editBox = null, e.silder = null, e
                }

                return __extends(e, t), e.prototype.onLoad = function () {
                    this.touchNode.on(cc.Node.EventType.TOUCH_START, this.onTouchScreen, this), cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_LINUX ? this.systemOffset = -.2 : cc.sys.os == cc.sys.OS_IOS ? this.systemOffset = -.05 : this.systemOffset = 0
                }, e.prototype.onEnable = function () {
                    var t = parseFloat(cc.sys.localStorage.getItem("musicOffset"));
                    this.musicOffset = NaN != t ? t : 0, this.syncEditBox(1e3 * this.musicOffset), this.syncSilderbar(1e3 * this.musicOffset), this.passed_time = 4 * this.beattime, this.beattime = 60 / this.testBpm, this.resetArrowFrame(), this.resetOpLine(), this.isReseted = !0, a.default.getInstance().playTestMusic(), this.resultArray = [], this.orginDelay = this.musicOffset
                }, e.prototype.reset = function () {
                    this.passed_time = 4 * this.beattime, this.resetArrowFrame(), this.resetOpLine(), this.isReseted = !0, a.default.getInstance().playTestMusic()
                }, e.prototype.onDisable = function () {
                    a.default.getInstance().stopBGM(), this.orginDelay != this.musicOffset && i.default.analytics("setting_change", {player_id: /*FBInstant.player.getID()*/""})
                }, e.prototype.onTouchClose = function () {
                    this.node.active = !1
                }, e.prototype.onMusicDelayChanged = function (t, e) {
                    var o = parseFloat(t.string);
                    isNaN(o) && (o = 0), o > 400 ? o = 400 : o < -400 && (o = -400), o = Math.ceil(o), n.default.getInstance().setOffset(o / 1e3), this.musicOffset = o / 1e3, console.log("set Muisc Offset ", o / 1e3), t.placeholder = o.toString(), t.string = o.toString(), this.syncSilderbar(o)
                }, e.prototype.syncSilderbar = function (t) {
                    this.silder.progress = .5 * (t / 400 + 1)
                }, e.prototype.onSliderBarChanged = function (t, e) {
                    var o = 10 * Math.ceil(2 * (t.progress - .5) * 40);
                    n.default.getInstance().setOffset(o / 1e3), this.musicOffset = o / 1e3, this.syncEditBox(o)
                }, e.prototype.syncEditBox = function (t) {
                    this.editBox.placeholder = t.toString(), this.editBox.string = t.toString()
                }, e.prototype.onTouchScreen = function () {
                    console.log("Touch Screen");
                    for (var t = 0; t < 4; t++) if (0 == this.oplineNode[t].active) {
                        this.oplineNode[t].active = !0, this.oplineNode[t].position = this.lineNode.position;
                        break
                    }
                }, e.prototype.resetOpLine = function () {
                    for (var t = 0; t < 4; t++) this.oplineNode[t].active = !1
                }, e.prototype.resetArrowFrame = function () {
                    for (var t = 0; t < 4; t++) this.arrowSprite[t].spriteFrame = this.arrowFrame[0];
                    this.allset = !1
                }, e.prototype.autoFix = function () {
                    if (this.checkIcon.active) {
                        for (var t = !0, e = [], o = 0; o < 4; o++) {
                            if (!this.oplineNode[o].active) {
                                t = !1;
                                break
                            }
                            var a = (this.oplineNode[o].y - this.arrowSprite[o].node.y) / this.movement * this.beattime;
                            e.push(a)
                        }
                        if (t) {
                            var i = 0;
                            for (o = 0; o < e.length; o++) i += e[o];
                            var s = i / e.length;
                            this.resultArray.push(s), i = 0;
                            for (o = 0; o < this.resultArray.length; o++) i += this.resultArray[o];
                            var r = -i / this.resultArray.length;
                            this.musicOffset += Math.floor(1e3 * r) / 1e3, n.default.getInstance().setOffset(this.musicOffset), this.syncEditBox(Math.floor(1e3 * this.musicOffset)), this.syncSilderbar(Math.floor(1e3 * this.musicOffset))
                        }
                    }
                }, e.prototype.onTouchCheckBox = function () {
                    this.checkIcon.active = !this.checkIcon.active, this.checkIcon.active && (this.resultArray = [])
                }, e.prototype.update = function (t) {
                    this.passed_time += t;
                    var e = Math.floor((this.passed_time + this.musicOffset + this.systemOffset) / this.beattime),
                        o = e % 4, n = this.passed_time + this.musicOffset + this.systemOffset - e * this.beattime;
                    if (3 == o && n >= this.beattime / 2 ? (this.lineNode.position = cc.v2(0, -2 * this.movement + (n - this.beattime / 2) / (4 * this.beattime) * this.movement * 4), this.allset && (this.resetArrowFrame(), this.autoFix(), this.resetOpLine())) : this.lineNode.position = cc.v2(0, -1.5 * this.movement + (o * this.beattime + n) / (4 * this.beattime) * this.movement * 4), !this.allset) for (var a = 0; a < 4; a++) this.lineNode.y >= (-1.5 + a) * this.movement && this.arrowSprite[a].spriteFrame != this.arrowFrame[1] && (this.arrowSprite[a].spriteFrame = this.arrowFrame[1], 3 == a && (this.allset = !0));
                    cc.audioEngine.isMusicPlaying() || this.isReseted ? this.isReseted = !1 : this.reset()
                }, __decorate([c(cc.Node)], e.prototype, "roadNode", void 0), __decorate([c(cc.Node)], e.prototype, "lineNode", void 0), __decorate([c(cc.SpriteFrame)], e.prototype, "arrowFrame", void 0), __decorate([c(cc.Sprite)], e.prototype, "arrowSprite", void 0), __decorate([c(cc.Node)], e.prototype, "oplineNode", void 0), __decorate([c(cc.Node)], e.prototype, "touchNode", void 0), __decorate([c(cc.Node)], e.prototype, "checkIcon", void 0), __decorate([c(cc.EditBox)], e.prototype, "editBox", void 0), __decorate([c(cc.Slider)], e.prototype, "silder", void 0), e = __decorate([r], e)
            }(cc.Component);
        o.default = l, cc._RF.pop()
    }, {
        "../Controllers/PlayerControl": "PlayerControl",
        "../Controllers/SoundControl": "SoundControl",
        Logger: "Logger"
    }],
    ShopView: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "2130bk3MzZPAZYJP+DDoxp2", "ShopView"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = t("../Data/Constants"), a = t("../Controllers/UIControl"), i = t("./BuySkinView"),
            s = t("../Controllers/GameControl"), r = t("../Controllers/PlayerControl"), c = t("Logger"),
            l = cc._decorator, d = l.ccclass, u = l.property, p = function (t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.shopItem = null, e.content = null, e.iconFrame = [], e.shopGold = null, e.origSkinId = 0, e.shopdata = null, e
                }

                var o;
                return __extends(e, t), o = e, e.getInstance = function () {
                    return o.instance
                }, e.prototype.onLoad = function () {
                    null == o.instance ? o.instance = this : o.instance != this && this.destroy()
                }, e.prototype.onEnable = function () {
                    this.refreshShopGold(), this.origSkinId = parseInt(s.default.getInstance().getFBData().skinId)
                }, e.prototype.start = function () {
                    this.shopdata = n.default.getInstance().getShopData(), this.createShopList(), this.refreshUIState()
                }, e.prototype.addClickEvent = function (t) {
                    var e = new cc.Component.EventHandler;
                    e.target = this.node, e.component = "ShopView", e.handler = "onTouchItem", e.customEventData = t.data.id;
                    var o = t.getComponent("cc.Button");
                    2 == o.clickEvents.length && o.clickEvents.pop(), o.clickEvents.push(e)
                }, e.prototype.refreshShopGold = function () {
                    this.shopGold.string = s.default.getInstance().getFBData().diamond.toString()
                }, e.prototype.createShopList = function () {
                    for (var t = 0, e = 0, o = this.shopdata; e < o.length; e++) {
                        var n = o[e], a = cc.instantiate(this.shopItem);
                        a.active = !0;
                        var i = a.getChildByName("itemIcon").getComponent(cc.Sprite);
                        i.spriteFrame = this.iconFrame[2 * (n.id - 1)];
                        var s = a.getChildByName("goldNode");
                        s.getChildByName("goldIcon");
                        s.getChildByName("goldLabel").getComponent(cc.Label).string = n.cost, this.content.addChild(a), a.position = cc.v2(233 * (t % 3 - 1), -250 * Math.floor(t / 3)), a.data = n, a.data.spriteFrame = i.spriteFrame, this.addClickEvent(a);
                        var c = a.getChildByName("itemSpine").getComponent(sp.Skeleton);
                        c.skeletonData = r.default.getInstance().getSkeletonData(n.id - 1), c.animation = "standby", console.log("shopitem", t), t++
                    }
                }, e.prototype.onTouchItem = function (t, e) {
                    console.log("onTouchItem", t.target, e);
                    var o = s.default.getInstance().getFBData(), n = o.skinInfo, c = parseInt(e);
                    if (1 == n[c - 1]) o.skinId = c - 1, this.refreshUIState(), r.default.getInstance().setPlayerAvator(c - 1), r.default.getInstance().setSpineAnimation("run"); else {
                        var l = t.target;
                        a.default.getInstance().showView("BuySkinView", !0), i.default.getInstance().updateBuyInfo(l.data)
                    }
                }, e.prototype.refreshUIState = function () {
                    for (var t = s.default.getInstance().getFBData().skinInfo, e = parseInt(s.default.getInstance().getFBData().skinId), o = 0, n = this.content.children; o < n.length; o++) {
                        var a = n[o], i = a.getChildByName("selected"),
                            r = a.getChildByName("itemSpine").getComponent(sp.Skeleton);
                        a.data.id == e + 1 ? (i.active = !0, r.animation = "run") : (i.active = !1, r.animation = "standby");
                        var c = a.getChildByName("itemLock"), l = a.getChildByName("goldNode"),
                            d = a.getChildByName("itemIcon").getComponent(cc.Sprite);
                        a.getComponent(cc.Button);
                        1 == t[a.data.id - 1] ? (c.active = !1, l.active = !1, d.spriteFrame = this.iconFrame[2 * (a.data.id - 1)]) : (c.active = !0, l.active = !0, d.spriteFrame = this.iconFrame[2 * (a.data.id - 1) + 1])
                    }
                }, e.prototype.onDisable = function () {
                    s.default.getInstance().syncFBData();
                    var t = parseInt(s.default.getInstance().getFBData().skinId);
                    this.origSkinId != t && c.default.analytics("skin_change", {
                        player_id: FBInstant.player.getID(),
                        skinId: t
                    })
                }, e.instance = null, __decorate([u(cc.Node)], e.prototype, "shopItem", void 0), __decorate([u(cc.Node)], e.prototype, "content", void 0), __decorate([u(cc.SpriteFrame)], e.prototype, "iconFrame", void 0), __decorate([u(cc.Label)], e.prototype, "shopGold", void 0), e = o = __decorate([d], e)
            }(cc.Component);
        o.default = p, cc._RF.pop()
    }, {
        "../Controllers/GameControl": "GameControl",
        "../Controllers/PlayerControl": "PlayerControl",
        "../Controllers/UIControl": "UIControl",
        "../Data/Constants": "Constants",
        "./BuySkinView": "BuySkinView",
        Logger: "Logger"
    }],
    Socket: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "11c52GiApBEZLLamb2O4Nx3", "Socket"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = function () {
            function t() {
                this.reconnectCount = 0, this.ws = null, this.listeners = {}
            }

            return t.GetInstance = function () {
                return null == this.instance && (this.instance = new t), this.instance
            }, t.prototype.initSocket = function (t, e) {
                this.ws = new WebSocket(t), this.ws.binaryType = "arraybuffer", this.ws.onopen = function () {
                    this.onOpen(), e && e()
                }.bind(this), this.ws.onmessage = this.onMessage.bind(this), this.ws.onerror = this.onError.bind(this), this.ws.onclose = this.onClose.bind(this)
            }, t.prototype.doRequest = function (e, o) {
                for (var n = encodeURI(null == o ? e[1] : e[1].vsprintf(o)), a = new Uint8Array(36 + n.length), i = 0; i < e[0].length; i++) a[i] = e[0].charCodeAt(i);
                var s = t.packetId++;
                a[35] = Math.floor(255 & s), a[34] = Math.floor(s >> 8 & 255), a[33] = Math.floor(s >> 16 & 255), a[32] = Math.floor(s >> 24);
                for (i = 36; i < 36 + n.length; i++) a[i] = n.charCodeAt(i - 36);
                return this.ws.send(a), s
            }, t.prototype.onOpen = function (t) {
            }, t.prototype.onMessage = function (t) {
            }, t.prototype.onError = function (t) {
            }, t.prototype.onClose = function (t) {
            }, t.instance = null, t.packetId = 0, t
        }();
        o.Socket = n, cc._RF.pop()
    }, {}],
    SoundControl: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "450e1pZa4xPxpaiKyzyCYZj", "SoundControl"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = t("./GameControl"), a = cc._decorator, i = a.ccclass, s = a.property, r = function (t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.audioSource = null, e.testAudioClip = null, e.soundId = 0, e.seData = [], e.bgm_sData_1 = [], e.bgm_sData = [], e.offset = 0, e
            }

            var o;
            return __extends(e, t), o = e, e.getInstance = function () {
                return o.instance
            }, e.prototype.onLoad = function () {
                null == o.instance ? o.instance = this : o.instance != this && this.destroy(), this.bgm_sData[0] = this.bgm_sData_1
            }, e.prototype.setBGMClip = function (t) {
                this.audioSource.clip = t
            }, e.prototype.loadBGM = function (t, e, o) {
                t.replace(/ Lv.{1}/g, "");
                cc.loader.loadRes(t, cc.AudioClip, function (t, a) {
                    this.setBGMClip(a), console.log("BGM Load finished!", e, o), n.default.getInstance().loadBGMFinished(e, o), null != t && null != t.message && console.log("bgm load error", t.message)
                }.bind(this))
            }, e.prototype.playBGMAtTime = function (t) {
                console.log("BGM sec", t), this.soundId = cc.audioEngine.playMusic(this.audioSource.clip, !1), console.log("BGM length", this.soundId, cc.audioEngine.getDuration(this.soundId)), cc.audioEngine.setCurrentTime(this.soundId, t)
            }, e.prototype.playBGM = function (t) {
                void 0 === t && (t = !1), this.soundId = cc.audioEngine.playMusic(this.audioSource.clip, t)
            }, e.prototype.playBGMPre = function (t, e) {
                this.soundId = cc.audioEngine.playMusic(this.bgm_sData[t - 1][e - 1], !1)
            }, e.prototype.pauseBGM = function () {
                cc.audioEngine.pauseMusic()
            }, e.prototype.resumeBGM = function () {
                cc.audioEngine.resumeMusic()
            }, e.prototype.stopBGM = function () {
                cc.audioEngine.stopMusic()
            }, e.prototype.playSE = function (t, e) {
                void 0 === e && (e = !1), t >= this.seData.length ? console.log("se error", t) : cc.audioEngine.playEffect(this.seData[t], e)
            }, e.prototype.onSE = function (t, e) {
                var o = parseInt(e);
                NaN != o && this.playSE(o)
            }, e.prototype.playTestMusic = function () {
                this.audioSource.clip = this.testAudioClip, this.playBGM()
            }, e.prototype.isMusicPlaying = function () {
                return cc.audioEngine.isMusicPlaying()
            }, e.instance = null, __decorate([s(cc.AudioSource)], e.prototype, "audioSource", void 0), __decorate([s(cc.AudioClip)], e.prototype, "testAudioClip", void 0), __decorate([s(cc.AudioClip)], e.prototype, "seData", void 0), __decorate([s(cc.AudioClip)], e.prototype, "bgm_sData_1", void 0), e = o = __decorate([i], e)
        }(cc.Component);
        o.default = r, cc._RF.pop()
    }, {"./GameControl": "GameControl"}],
    StageView2: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "d2280LZL79CRo3WhTLqdvAi", "StageView2"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = cc._decorator, a = n.ccclass, i = (n.property, function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }

            var o;
            return __extends(e, t), o = e, e.getInstance = function () {
                return o.instance
            }, e.prototype.onLoad = function () {
                null == o.instance ? o.instance = this : o.instance != this && this.destroy()
            }, e.instance = null, e = o = __decorate([a], e)
        }(cc.Component));
        o.default = i, cc._RF.pop()
    }, {}],
    StageView: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "2bc5e0qMVhObqof8egA6/b9", "StageView"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = t("../Data/Constants"), a = t("../Controllers/UIControl"), i = t("./BuyMusicView"),
            s = t("../Controllers/GameControl"), r = t("../Controllers/CameraControl"), c = t("./TitleView"),
            l = t("Logger"), d = cc._decorator, u = d.ccclass, p = d.property, h = function (t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.stageTitle = null, e.stageItem = null, e.scrollView = null, e.stageFrame = [], e.nodePool = null, e.chapterId = 0, e.stageId = 0, e.stageItems = [], e
                }

                var o;
                return __extends(e, t), o = e, e.getInstance = function () {
                    return o.instance
                }, e.prototype.onLoad = function () {
                    console.log("===========26",this.node);

                    null == o.instance ? o.instance = this : o.instance != this && this.destroy(), this.nodePool = new cc.NodePool;
                    for (var t = 0; t < 5; t++) {
                        var e = cc.instantiate(this.stageItem);
                        e.active = !0, this.nodePool.put(e)
                    }
                }, e.prototype.onEnable = function () {
                    r.default.getInstance().setGameBackground(-1), a.default.getInstance().showView("startNode", !1), this.loadData(1)
                }, e.prototype.onDisable = function () {
                    this.clearItem()
                }, e.prototype.addTouchBtnEvent = function (t, e) {
                    var o = new cc.Component.EventHandler;
                    o.target = this.node, o.component = "StageView", o.handler = "onTouchGo", o.customEventData = e.toString();
                    var n = t.getChildByName("itemBtn").getComponent("cc.Button");
                    n.clickEvents.pop(), n.clickEvents.push(o), (o = new cc.Component.EventHandler).target = this.node, o.component = "StageView", o.handler = "onTouchBuy", o.customEventData = e.toString();
                    var a = t.getChildByName("openBtn").getComponent("cc.Button");
                    a.clickEvents.pop(), a.clickEvents.push(o)
                }, e.prototype.AnimOut = function () {
                    a.default.getInstance().showView("BlockView", !0);
                    for (var t = 0, e = 0, o = this.scrollView.content.children; e < o.length; e++) {
                        var n = o[e];
                        n.runAction(cc.sequence(cc.delayTime(.05 * t + .05), cc.moveTo(.2, cc.v2(800, n.y)).easing(cc.easeCubicActionIn()))), t++
                    }
                    this.scheduleOnce(function () {
                        this.node.active = !1, c.default.getInstance().AnimIn()
                    }.bind(this), .05 * (t + 7))
                }, e.prototype.loadData = function (t) {
                    this.clearItem(), this.chapterId = t;
                    var e = n.default.getInstance().getChpater(t);
                    if (null != e) {
                        this.stageItems = [];
                        for (var o = e.chapterInfo, a = s.default.getInstance().getStageOpenState(t), i = s.default.getInstance().getStageStarInfo(t), c = 0; c < o.length; c++) {
                            var l = this.nodePool.get();
                            null == l && (l = cc.instantiate(this.stageItem)), l.active = !0, l.info = o[c], this.stageItems[c] = l;
                            var d = l.getChildByName("diff").getComponent("cc.Label"),
                                u = l.getChildByName("number").getComponent("cc.Label"), p = "简单";
                            o[c].level > 2 && o[c].level < 7 ? p = "正常" : o[c].level >= 7 && (p = "困难"), u.string = "等级." + o[c].level, d.string = p, d.node.opacity = 100, l.position = cc.v2(800, -226 * c), this.scrollView.content.addChild(l), l.runAction(cc.sequence(cc.delayTime(.05 + .05 * c), cc.moveTo(.2, cc.v2(0, -226 * c)).easing(cc.easeCubicActionOut())));
                            var h = l.getChildByName("TitleMask").getChildByName("songTitle").getComponent("cc.Label");
                            h.string = o[c].title;
                            var g = o[c].title.length;
                            h.node.scaleX = 1, g > 24 && (h.node.scaleX = 25 / g), l.getChildByName("songTitle2").getComponent("cc.Label").string = o[c].subtitle, this.addTouchBtnEvent(l, o[c].id), l.getChildByName("openBtn").getChildByName("costLabel").getComponent("cc.Label").string = o[c].cost;
                            var f = l.getChildByName("MusicIconBg").getComponent(cc.Sprite);
                            if (f.node.color = r.default.getInstance().getColorById(o[c].frameId), 1 == a[o[c].id - 1]) l.getChildByName("itemBtn").active = !0, l.getChildByName("MusicIcon").active = !0, l.getChildByName("Lock").active = !1, l.getChildByName("openBtn").active = !1; else {
                                l.getChildByName("itemBtn").active = !1, l.getChildByName("MusicIcon").active = !1, l.getChildByName("Lock").active = !0, l.getChildByName("openBtn").active = !0, f.node.color = r.default.getInstance().getColorById(0);
                                var y = l.getChildByName("Lock").getChildByName("jiesuo_suo").getComponent(cc.Animation);
                                y.setCurrentTime(0, "jiesuo_suo"), y.stop()
                            }
                            var m = l.getChildByName("starNode"), v = i[o[c].id - 1];
                            null == v && (v = 0);
                            for (var I = 0; I < 3; I++) {
                                var _ = m.getChildByName("star" + (I + 1).toString());
                                _.active = I < v
                            }
                        }
                        this.scrollView.content.setContentSize(cc.size(this.scrollView.content.width, 226 * o.length)), this.scrollView.scrollToTop(0)
                    } else cc.log("get ChapterData Failed", t)
                }, e.prototype.updateItem = function (t) {
                    for (var e = function (e) {
                        var n = o.stageItems[e];
                        if (n.info.id == t) {
                            var i = n.info,
                                s = n.getChildByName("Lock").getChildByName("jiesuo_suo").getComponent(cc.Animation);
                            return a.default.getInstance().showView("BlockView", !0), s.play("jiesuo_suo"), o.node.runAction(cc.sequence(cc.delayTime(.87), cc.callFunc(function () {
                                var t = n.getChildByName("jiesuo_zouxian").getComponent(cc.Animation);
                                t.node.active = !0, t.play("jiesuo_zouxian");
                                var e = n.getChildByName("zhezhao");
                                e.active = !0, e.runAction(cc.sequence(cc.fadeIn(.5), cc.callFunc(function () {
                                    n.getChildByName("MusicIconBg").getComponent(cc.Sprite).node.color = r.default.getInstance().getColorById(i.frameId), n.getChildByName("itemBtn").active = !0, n.getChildByName("MusicIcon").active = !0, n.getChildByName("Lock").active = !1, n.getChildByName("openBtn").active = !1, t.node.active = !1
                                }.bind(this)), cc.fadeOut(.5), cc.callFunc(function () {
                                    e.active = !1, a.default.getInstance().showView("BlockView", !1)
                                }.bind(this))))
                            }.bind(o)))), "break"
                        }
                    }, o = this, n = 0; n < this.stageItems.length; n++) {
                        if ("break" === e(n)) break
                    }
                }, e.prototype.clearItem = function () {
                    for (var t = 0, e = this.scrollView.content.children; t < e.length; t++) {
                        var o = e[t];
                        o.stopAllActions(), this.nodePool.put(o)
                    }
                    this.scrollView.content.removeAllChildren()
                }, e.prototype.onTouchGo = function (t, e) {
                    a.default.getInstance().showView("BuyMusicView", !0);
                    var o = n.default.getInstance().getStage(this.chapterId, e);
                    i.default.getInstance().updateBuyInfo({
                        title: o.title,
                        subtitle: o.subtitle,
                        cost: o.cost,
                        chapterId: this.chapterId,
                        index: e,
                        level: o.level,
                        bpm: o.bpm,
                        isOpen: !0
                    }), l.default.analytics("open_stageCover", {
                        player_id: ""/*FBInstant.player.getID()*/,
                        stageId: 1e3 * this.chapterId + this.stageId
                    })
                }, e.prototype.onTouchBuy = function (t, e) {
                    a.default.getInstance().showView("BuyMusicView", !0);
                    var o = n.default.getInstance().getStage(this.chapterId, e);
                    i.default.getInstance().updateBuyInfo({
                        title: o.title,
                        subtitle: o.subtitle,
                        cost: o.cost,
                        chapterId: this.chapterId,
                        index: e,
                        level: o.level,
                        bpm: o.bpm,
                        isOpen: !1
                    })
                }, e.instance = null, __decorate([p(cc.Label)], e.prototype, "stageTitle", void 0), __decorate([p(cc.Node)], e.prototype, "stageItem", void 0), __decorate([p(cc.ScrollView)], e.prototype, "scrollView", void 0), __decorate([p(cc.SpriteFrame)], e.prototype, "stageFrame", void 0), e = o = __decorate([u], e)
            }(cc.Component);
        o.default = h, cc._RF.pop()
    }, {
        "../Controllers/CameraControl": "CameraControl",
        "../Controllers/GameControl": "GameControl",
        "../Controllers/UIControl": "UIControl",
        "../Data/Constants": "Constants",
        "./BuyMusicView": "BuyMusicView",
        "./TitleView": "TitleView",
        Logger: "Logger"
    }],
    TerrainControl: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "4ffa81ly0pFi4igaANkLNAm", "TerrainControl"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = t("./PlayerControl"), a = t("./GameControl"), i = cc._decorator, s = i.ccclass, r = i.property,
            c = function (t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.terrain = null, e.ui = null, e.root = null, e.figureTex = [], e.checkBoard = null, e.arrow = null, e.arrowNodes = null, e.treasure = null, e.treasureNodes = null, e.yinfu = null, e.zuanshi = null, e.effectNodes = null, e.arrowEffect = null, e.MAX_ZORDER = 1e7, e.currZIndex = 0, e.terrainsMap = [], e.mapData = [], e.mapLength = 0, e.markFlag = 0, e.LabelNodes = [], e.tapLabel = null, e.arrowFrame = [], e.mapType = 0, e.defaultMOVEMENT = 148, e.MOVEMENT = 148, e.CHANGESIZE = 80, e.lastDirection = 0, e.beginPos = cc.v2(0, 0), e.endPos = cc.v2(0, 0), e.currTerrainPos = cc.v2(0, 0), e.lastCreatePos = cc.v2(0, 0), e.TERRAINHEIGHT_LIMIT = 50, e.PRECREATE_TERRAINNUM = 100, e.GuideMarkNum = 5, e.guideMarkCount = 0, e.guideMarkPos = [1, -1, 1, -1, -1], e.isPause = !0, e.arrowList = [], e.usedArrowList = [], e.terrainData = [], e.createdTerrainData = [], e.allTerrainData = [], e.opArray = [], e.usedOpArray = [], e.lastTerrainData = null, e.terrainPool = null, e.checkBoardPool = null, e.arrowPool = null, e.treasurePool = null, e.zuanshiNodePool = null, e.yinfuNodePool = null, e.tapLabelNodePool = null, e.arrowEffectPool = null, e.lastRandomDirection2 = 0, e.lastRandomDirection = 0, e.isFinished = !1, e.stageId = 0, e
                }

                var o;
                return __extends(e, t), o = e, e.getInstance = function () {
                    return o.instance
                }, e.prototype.onLoad = function () {
                    console.log("===========1",this.node);

                    null == o.instance ? o.instance = this : o.instance != this && this.destroy(), this.terrainPool = new cc.NodePool, this.checkBoardPool = new cc.NodePool, this.arrowPool = new cc.NodePool, this.treasurePool = new cc.NodePool, this.yinfuNodePool = new cc.NodePool, this.zuanshiNodePool = new cc.NodePool, this.tapLabelNodePool = new cc.NodePool, this.arrowEffectPool = new cc.NodePool;
                    for (var t = 0; t < 3; t++) {
                        (e = cc.instantiate(this.checkBoard)).active = !0, this.checkBoardPool.put(e)
                    }
                    for (t = 0; t < 30; t++) {
                        (e = cc.instantiate(this.arrow)).active = !0, this.arrowPool.put(e)
                    }
                    for (t = 0; t < 30; t++) {
                        (e = cc.instantiate(this.treasure)).active = !0, this.treasurePool.put(e)
                    }
                    for (t = 0; t < 10; t++) {
                        (e = cc.instantiate(this.yinfu)).active = !0, this.yinfuNodePool.put(e), (e = cc.instantiate(this.zuanshi)).active = !0, this.zuanshiNodePool.put(e)
                    }
                    for (t = 0; t < 10; t++) {
                        var e;
                        (e = cc.instantiate(this.arrowEffect.node)).active = !0, this.arrowEffectPool.put(e)
                    }
                }, e.prototype.addGuideMark = function (t) {
                    if (this.checkIsGuideStage() && this.guideMarkCount < this.GuideMarkNum) {
                        var e = this.tapLabelNodePool.get();
                        null == e && (e = cc.instantiate(this.tapLabel)), null != e && (e.active = !0, e.position = t.pos, e.rotation = 0, this.effectNodes.addChild(e), 3 == t.type ? 1 == t.arrow ? e.x += 150 : (t.arrow, e.x -= 150) : 4 == t.type && (0 == t.arrow ? e.x -= 150 : 1 != t.arrow && 2 != t.arrow || (e.y -= 150)), this.guideMarkCount++)
                    }
                }, e.prototype.checkIsGuideStage = function () {
                    return 1 == this.stageId || 2 == this.stageId || 3 == this.stageId
                }, e.prototype.setMovement = function (t) {
                    this.MOVEMENT = t
                }, e.prototype.createTerrain2 = function (t) {
                    if (5 != t.type) {
                        var e = null;
                        0 == t.nodeType ? (null == (e = this.checkBoardPool.get()) && (e = cc.instantiate(this.checkBoard)), e.active = !0) : 1 == t.nodeType && (null == (e = this.terrainPool.get()) && (e = cc.instantiate(this.terrain)), e.active = !0);
                        var o = this.getZIndex();
                        if (e.setPosition(t.pos), this.node.addChild(e, o), e.active = !1, this.scheduleOnce(function () {
                            e.active = !0
                        }, 0), e.data = t, t.node = e, 1 == t.treasure) {
                            var n = this.treasurePool.get();
                            null == n && (n = cc.instantiate(this.treasure)), n.active = !0, n.scale = 1, n.opacity = 255, this.treasureNodes.addChild(n), n.position = t.pos
                        }
                        if (-1 != t.arrow) {
                            var a = this.arrowPool.get();
                            null == a && (a = cc.instantiate(this.arrow)), a.active = !0, 0 == t.arrow ? a.rotation = 0 : 1 == t.arrow ? a.rotation = -90 : 2 == t.arrow && (a.rotation = 90), this.arrowNodes.addChild(a), a.position = t.pos, a.scale = .8, a.opacity = 128, a.getComponent("cc.Sprite").spriteFrame = this.arrowFrame[0], this.arrowList.unshift(a)
                        }
                        if (1 == this.mapType && this.createdTerrainData.push(t), t.type >= 2 && t.type <= 4) {
                            var i = e.getChildByName("Sprite"), s = i.getComponent("cc.Sprite"), r = 0;
                            4 == t.type || 1 == t.jumpEnd ? (s.spriteFrame = this.figureTex[1], null != this.lastTerrainData && 1 == this.lastTerrainData.jumpEnd && (r = .4)) : s.spriteFrame = this.figureTex[0], i.setContentSize(cc.size(this.defaultMOVEMENT, this.defaultMOVEMENT)), 0 == t.direction ? i.setContentSize(cc.size(this.defaultMOVEMENT, this.MOVEMENT * (1 - t.jumpEnd) + this.defaultMOVEMENT * (.6 + r))) : 1 == t.direction ? (i.anchorX = 0, i.x = -74, i.setContentSize(cc.size(this.MOVEMENT * (1 - t.jumpEnd) + this.defaultMOVEMENT * (.6 + r), this.defaultMOVEMENT))) : 2 == t.direction && (i.anchorX = 1, i.x = 74, i.setContentSize(cc.size(this.MOVEMENT * (1 - t.jumpEnd) + this.defaultMOVEMENT * (.6 + r), this.defaultMOVEMENT))), 1 == t.jumpEnd && i.setContentSize(cc.size(this.defaultMOVEMENT, this.defaultMOVEMENT))
                        } else if (1 == t.type) {
                            var c = e.getChildByName("Block"), l = e.getChildByName("Flag");
                            l.active = !0, 0 == t.direction ? (c.setAnchorPoint(cc.v2(.5, 1)), c.position = cc.v2(0, 74), c.setContentSize(cc.size(this.defaultMOVEMENT, 2 * this.MOVEMENT + this.defaultMOVEMENT)), l.rotation = 0, l.position = cc.v2(0, -233)) : 1 == t.direction ? (c.setAnchorPoint(cc.v2(0, .5)), c.position = cc.v2(-74, 0), c.setContentSize(cc.size(2 * this.MOVEMENT + this.defaultMOVEMENT, this.defaultMOVEMENT)), l.rotation = -90, l.position = cc.v2(233, 0)) : 2 == t.direction && (c.setAnchorPoint(cc.v2(1, .5)), c.position = cc.v2(74, 0), c.setContentSize(cc.size(2 * this.MOVEMENT + this.defaultMOVEMENT, this.defaultMOVEMENT)), l.rotation = 90, l.position = cc.v2(-233, 0)), this.endPos = t.pos
                        }
                        this.lastCreatePos = t.pos
                    }
                }, e.prototype.getEndPos = function () {
                    return this.endPos
                }, e.prototype.nextTerrainData = function () {
                    var t = null;
                    return 0 == this.mapType ? t = this.generateRandomData() : 1 == this.mapType ? t = this.getNextMapData() : console.log("mapType Error", this.mapType), null != t && 1 == t.type && (console.log("create Finished!"), this.isFinished = !0), t
                }, e.prototype.generateRandomData = function () {
                    var t = this.getRandomTerrain(), e = {};
                    return null == this.lastTerrainData ? (this.lastRandomDirection2 = 0, this.lastRandomDirection = 0, this.currTerrainPos.y += 1, e = {
                        nodeType: 1,
                        index: 0,
                        pos: cc.v2(this.currTerrainPos.x * this.MOVEMENT, this.currTerrainPos.y * this.MOVEMENT),
                        treasure: 0,
                        arrow: -1,
                        type: 2,
                        direction: 0,
                        flag: 0,
                        jumpEnd: 0,
                        node: null,
                        prev: null,
                        next: null
                    }) : (0 == t ? this.currTerrainPos.y += 1 : 1 == t ? this.currTerrainPos.x -= 1 : 2 == t && (this.currTerrainPos.x += 1), this.lastTerrainData.direction != t && this.opArray.unshift({
                        opType: 0,
                        direction: t,
                        opTerrainData: this.lastTerrainData
                    }), e = {
                        nodeType: 1,
                        index: 0,
                        pos: cc.v2(this.currTerrainPos.x * this.MOVEMENT, this.currTerrainPos.y * this.MOVEMENT),
                        treasure: 0,
                        arrow: -1,
                        type: 2,
                        direction: t,
                        flag: 0,
                        jumpEnd: 0,
                        node: null,
                        prev: null,
                        next: null
                    }), e
                }, e.prototype.getNextMapData = function () {
                    if (this.terrainData.length > 0) {
                        var t = this.terrainData.pop();
                        return this.createdTerrainData.push(t), t
                    }
                    return null
                }, e.prototype.createNextTerrain = function () {
                    var t = this.nextTerrainData(), e = t.pos;
                    if (this.createTerrain2(t), 1 == this.mapType) {
                        var o = t.index / this.mapLength, n = null, a = t.arrow >= 0;
                        0 == this.markFlag && o >= .2 ? a && (n = this.LabelNodes[0], this.markFlag = 1) : 1 == this.markFlag && o >= .5 ? a && (n = this.LabelNodes[1], this.markFlag = 2) : 2 == this.markFlag && o >= .8 && a && (n = this.LabelNodes[2], this.markFlag = 3), null != n && (n.active = !0, n.position = e, n.rotation = 0, 3 == t.type ? 1 == t.arrow ? n.x += 150 : (t.arrow, n.x -= 150) : 4 == t.type && (0 == t.arrow ? n.x -= 150 : 1 != t.arrow && 2 != t.arrow || (n.y -= 150)))
                    }
                    this.lastTerrainData = t
                }, e.prototype.getRandomTerrain = function () {
                    var t = 0;
                    return Math.random() >= .5 ? 0 == this.lastRandomDirection ? (t = Math.random() > .5 ? 1 : 2) != this.lastRandomDirection2 && 0 != this.lastRandomDirection2 && (t = this.lastRandomDirection2) : 1 != this.lastRandomDirection && 2 != this.lastRandomDirection || (t = 0) : t = this.lastRandomDirection, this.lastRandomDirection2 = this.lastRandomDirection, this.lastRandomDirection = t, t
                }, e.prototype.reset = function () {
                    0 == this.mapType ? this.currTerrainPos = cc.v2(0, 0) : 1 == this.mapType && (this.currTerrainPos = cc.v2(0, 2)), this.lastCreatePos = cc.v2(0, 0), this.terrainData = [], this.createdTerrainData = [], this.allTerrainData = [], this.arrowList = [], this.usedArrowList = [], this.opArray = [], this.usedOpArray = [], this.isFinished = !1, this.markFlag = 0, this.guideMarkCount = 0;
                    for (var t = 0; t < this.LabelNodes.length; t++) this.LabelNodes[t].active = !1;
                    this.effectNodes.removeAllChildren()
                }, e.prototype.generateTerrainData = function () {
                    for (var t = 0; t < this.mapData.length; t++) {
                        var e = 1, o = -1, n = 1, a = 2, i = 0, s = 0, r = null, c = 0, l = 1;
                        switch (this.mapData[t]) {
                            case 0:
                                i = 0, t < this.mapData.length - 1 && (1 == this.mapData[t + 1] ? (o = 1, n = 0, a = 3) : 2 == this.mapData[t + 1] ? (o = 2, n = 0, a = 3) : 7 == this.mapData[t + 1] ? (o = 0, n = 0, a = 4) : 3 == this.mapData[t + 1] && (n = 0));
                                break;
                            case 1:
                                i = 1, t < this.mapData.length - 1 && (0 == this.mapData[t + 1] ? (o = 0, n = 0, a = 3) : 7 == this.mapData[t + 1] ? (o = 1, n = 0, a = 4) : 3 == this.mapData[t + 1] && (n = 0));
                                break;
                            case 2:
                                i = 2, t < this.mapData.length - 1 && (0 == this.mapData[t + 1] ? (o = 0, n = 0, a = 3) : 7 == this.mapData[t + 1] ? (o = 2, n = 0, a = 4) : 3 == this.mapData[t + 1] && (n = 0));
                                break;
                            case 3:
                                i = this.terrainData[0].direction, e = 0, n = 0, a = 1, s = 1, l = 2;
                                break;
                            case 7:
                                a = 5, i = this.terrainData[0].direction;
                                break;
                            default:
                                console.log("unknow map data", this.mapData[t])
                        }
                        0 == i ? this.currTerrainPos.y += l : 1 == i ? this.currTerrainPos.x -= l : 2 == i ? this.currTerrainPos.x += l : console.log("unknow direction", i), null != this.terrainData[0] && (r = this.terrainData[0], 5 != a && 5 == this.terrainData[0].type && (c = 1));
                        var d = {
                            nodeType: e,
                            index: t + 1,
                            pos: cc.v2(this.currTerrainPos.x * this.MOVEMENT, this.currTerrainPos.y * this.MOVEMENT),
                            treasure: n,
                            arrow: o,
                            type: a,
                            direction: i,
                            flag: s,
                            jumpEnd: c,
                            node: null,
                            next: null,
                            prev: r
                        };
                        null != this.terrainData[0] && (this.terrainData[0].next = d), this.terrainData.unshift(d), this.allTerrainData.push(d), 3 == d.type ? this.opArray.unshift({
                            opType: 0,
                            direction: o,
                            opTerrainData: d
                        }) : 4 == d.type && this.opArray.unshift({opType: 1, direction: o, opTerrainData: d})
                    }
                }, e.prototype.setTerrainData = function (t) {
                    this.mapData = t, this.mapLength = t.length, this.generateTerrainData(), this.stageId = a.default.getInstance().stageId
                }, e.prototype.getNextOp = function () {
                    if (this.opArray.length > 0) {
                        var t = this.opArray.pop();
                        return this.usedOpArray.push(t), t
                    }
                    return -1
                }, e.prototype.getPrevOp = function () {
                    return this.usedOpArray.length > 0 ? this.usedOpArray[this.usedOpArray.length - 1] : -1
                }, e.prototype.getPrevOpLength = function () {
                    return this.usedOpArray.length
                }, e.prototype.getNextOpByPlayer = function () {
                    return this.opArray.length > 0 ? this.opArray[this.opArray.length - 1] : -1
                }, e.prototype.getPositionByBeatNum = function (t) {
                    return t >= this.allTerrainData.length && (console.log("getPositionByBeatNum wrong param", t, this.allTerrainData.length), t = this.allTerrainData.length - 1), console.log("getPositionByBeatNum", t, this.allTerrainData.length), this.allTerrainData[t].pos
                }, e.prototype.getNextJumpEndPostion = function (t) {
                    t > this.allTerrainData.length && (console.log("getNextJumpEndPostion wrong param", t, this.allTerrainData.length), t = this.allTerrainData.length);
                    for (var e = t + 1; e < this.allTerrainData.length; e++) if (1 == this.allTerrainData[e].jumpEnd) return this.allTerrainData[e].pos;
                    return null
                }, e.prototype.createBeginTerrain = function (t, e) {
                    this.beginPos = t;
                    var o = this.checkBoardPool.get();
                    null == this.checkBoard && (o = cc.instantiate(this.checkBoard)), o.setPosition(t);
                    var n = o.getChildByName("Block");
                    n.setAnchorPoint(cc.p(.5, 0)), n.position = cc.v2(0, -74), n.setContentSize(cc.size(this.defaultMOVEMENT, this.MOVEMENT + this.defaultMOVEMENT)), o.getChildByName("Flag").active = !1, this.node.addChild(o, this.getZIndex()), 0 == this.mapType && (this.currTerrainPos.y += 1);
                    var a = {
                        nodeType: 1,
                        index: 0,
                        pos: cc.v2(0, 2 * this.MOVEMENT),
                        treasure: 0,
                        arrow: -1,
                        type: 2,
                        direction: 0,
                        flag: 0,
                        jumpEnd: 0,
                        node: null,
                        next: null,
                        prev: null
                    };
                    this.createTerrain2(a), this.allTerrainData.push(a), 0 == this.mapType && (this.currTerrainPos.y += 1)
                }, e.prototype.preCreateTerrrain = function () {
                    for (var t = 0; t < this.PRECREATE_TERRAINNUM && !this.isFinished; t++) this.createNextTerrain();
                    this.nextArrow()
                }, e.prototype.cleanTerrain = function () {
                    for (var t = [], e = 0, o = this.node.children; e < o.length; e++) {
                        (r = o[e]).stopAllActions(), t.push(r)
                    }
                    for (; t.length > 0;) {
                        "Terrain" == (r = t.pop()).name ? this.terrainPool.put(r) : "CheckBoard" == r.name && this.checkBoardPool.put(r)
                    }
                    for (var n = 0, a = this.arrowNodes.children; n < a.length; n++) {
                        (r = a[n]).stopAllActions(), t.push(r)
                    }
                    for (; t.length > 0;) this.arrowPool.put(t.pop());
                    for (var i = 0, s = this.treasureNodes.children; i < s.length; i++) {
                        var r;
                        (r = s[i]).stopAllActions(), t.push(r)
                    }
                    for (; t.length > 0;) this.treasurePool.put(t.pop())
                }, e.prototype.removeTreasure = function (t) {
                    this.treasurePool.put(t)
                }, e.prototype.clickArrow = function () {
                    if (this.arrowList.length > 0) {
                        var t = this.arrowList.pop();
                        if (null != t) {
                            var e = cc.spawn(cc.scaleTo(.2, .8), cc.fadeOut(.2));
                            t.runAction(e), this.addArrowEffect(t.position), this.usedArrowList.push(t)
                        }
                    }
                    this.nextArrow()
                }, e.prototype.addArrowEffect = function (t) {
                    var e = this.arrowEffectPool.get();
                    null == e && (e = cc.instantiate(this.arrowEffect.node)), e.active = !0;
                    var o = e.getComponent(cc.Animation);
                    o.stop(), o.play("shengguang"), e.position = t, this.effectNodes.addChild(e);
                    var n = cc.sequence(cc.delayTime(.8), cc.callFunc(function () {
                        this.arrowEffectPool.put(e)
                    }.bind(this)));
                    e.runAction(n)
                }, e.prototype.nextArrow = function () {
                    if (this.arrowList.length > 0) {
                        var t = this.arrowList.pop();
                        if (null != t) {
                            var e = cc.spawn(cc.scaleTo(.2, 1), cc.fadeIn(.2));
                            t.runAction(e), this.arrowList.push(t)
                        }
                    }
                }, e.prototype.reviveFixArrow = function (t, e) {
                    var o = 0, n = this.usedArrowList.pop();
                    if (null != n) {
                        for (; n.y > t.y || n.x < t.x;) {
                            var a = this.arrowList.pop();
                            if (null != a && (a.scale = .8, a.opacity = 128, this.arrowList.push(a)), n.scale = 1, n.opacity = 255, this.arrowList.push(n), o -= 1, this.opArray.push(this.usedOpArray.pop()), null == (n = this.usedArrowList.pop())) break
                        }
                        null != n && this.usedArrowList.push(n)
                    }
                    if (null != (n = this.arrowList.pop())) {
                        for (; (n.y < t.y || n.x > t.x) && (n.scale = .8, n.opacity = 0, o += 1, this.usedOpArray.push(this.opArray.pop()), null != (n = this.arrowList.pop()));) ;
                        null != n && (n.scale = 1, n.opacity = 255, this.arrowList.push(n))
                    }
                    var i = [];
                    if (null != (n = this.arrowList.pop())) {
                        for (; e.x <= n.x && e.y >= n.y && (n.getComponent("cc.Sprite").spriteFrame = this.arrowFrame[1], i.push(n), null != (n = this.arrowList.pop()));) ;
                        null != n && this.arrowList.push(n)
                    }
                    for (; i.length > 0;) this.arrowList.push(i.pop());
                    return o
                }, e.prototype.resetZIndex = function () {
                    this.currZIndex = this.MAX_ZORDER
                }, e.prototype.getZIndex = function () {
                    return this.currZIndex - 1
                }, e.prototype.pauseTerrain = function (t) {
                    this.isPause = t
                }, e.prototype.addyinfuParticle = function (t) {
                    if (0 == a.default.getInstance().getFBData().skinId) {
                        var e = this.yinfuNodePool.get();
                        null == e && (e = cc.instantiate(this.yinfu));
                        var o = e.getComponent(cc.ParticleSystem),
                            i = cc.sequence(cc.delayTime(1.2), cc.callFunc(function () {
                                this.yinfuNodePool.put(e)
                            }.bind(this)));
                        e.runAction(i);
                        var s = cc.v2(t.x, t.y), r = n.default.getInstance();
                        0 == r.direction ? s.y += 10 : 1 == r.direction ? s.x -= 10 : 2 == r.direction && (s.y += 10), e.setPosition(s), this.effectNodes.addChild(e), o.resetSystem()
                    }
                }, e.prototype.addZuanshiParticle = function (t) {
                    var e = this.zuanshiNodePool.get();
                    null == e && (e = cc.instantiate(this.zuanshi));
                    var o = e.getComponent(cc.ParticleSystem),
                        n = cc.sequence(cc.delayTime(.7), cc.callFunc(function () {
                            this.zuanshiNodePool.put(e)
                        }.bind(this)));
                    e.runAction(n), e.setPosition(t), this.effectNodes.addChild(e), o.resetSystem()
                }, e.prototype.checkIsInTerrain = function (t) {
                    for (var e = !1, o = 0, n = this.node.children; o < n.length; o++) {
                        var a = n[o];
                        if (a.active && "Terrain" == a.name) if (e = a.getComponent("Terrain").isInTerrain(t)) return e;
                        if (a.active && "CheckBoard" == a.name) if (e = a.getComponent("CheckBoard").isInCheckBoard(t)) return e
                    }
                    return e
                }, e.prototype.checkIsInCheckBoard = function (t) {
                    for (var e = !1, o = 0, n = this.node.children; o < n.length; o++) {
                        var a = n[o];
                        if (a.active && "CheckBoard" == a.name) if (e = a.getComponent("CheckBoard").isInCheckBoard(t)) return e
                    }
                    return e
                }, e.prototype.update = function (t) {
                    if (!this.isPause) {
                        for (var e = n.default.getInstance(), o = 0, a = this.node.children; o < a.length; o++) {
                            if ((r = a[o]).active && 0 == r.getNumberOfRunningActions() && e.node.y - r.y > this.TERRAINHEIGHT_LIMIT / 2 * this.MOVEMENT) {
                                "CheckBoard" == r.name ? this.checkBoardPool.put(r) : this.terrainPool.put(r);
                                break
                            }
                        }
                        for (var i = 0, s = this.arrowNodes.children; i < s.length; i++) {
                            var r;
                            if ((r = s[i]).active && 0 == r.getNumberOfRunningActions() && e.node.y - r.y > this.TERRAINHEIGHT_LIMIT / 2 * this.MOVEMENT) {
                                this.arrowPool.put(r);
                                break
                            }
                        }
                        this.lastCreatePos.y - e.node.y < this.TERRAINHEIGHT_LIMIT / 2 * this.MOVEMENT && !this.isFinished && this.createNextTerrain()
                    }
                }, e.instance = null, __decorate([r(cc.Node)], e.prototype, "terrain", void 0), __decorate([r(cc.Node)], e.prototype, "ui", void 0), __decorate([r(cc.Node)], e.prototype, "root", void 0), __decorate([r(cc.SpriteFrame)], e.prototype, "figureTex", void 0), __decorate([r(cc.Node)], e.prototype, "checkBoard", void 0), __decorate([r(cc.Node)], e.prototype, "arrow", void 0), __decorate([r(cc.Node)], e.prototype, "arrowNodes", void 0), __decorate([r(cc.Node)], e.prototype, "treasure", void 0), __decorate([r(cc.Node)], e.prototype, "treasureNodes", void 0), __decorate([r(cc.Node)], e.prototype, "yinfu", void 0), __decorate([r(cc.Node)], e.prototype, "zuanshi", void 0), __decorate([r(cc.Node)], e.prototype, "effectNodes", void 0), __decorate([r(cc.Animation)], e.prototype, "arrowEffect", void 0), __decorate([r(cc.Node)], e.prototype, "LabelNodes", void 0), __decorate([r(cc.Node)], e.prototype, "tapLabel", void 0), __decorate([r(cc.SpriteFrame)], e.prototype, "arrowFrame", void 0), e = o = __decorate([s], e)
            }(cc.Component);
        o.default = c, cc._RF.pop()
    }, {"./GameControl": "GameControl", "./PlayerControl": "PlayerControl"}],
    TerrainOutlineBehind: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "3ff96EPM7NHs7lCn4bKq0s0", "TerrainOutlineBehind"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = cc._decorator, a = n.ccclass, i = (n.property, function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }

            return __extends(e, t), e.prototype.onLoad = function () {
                var t = this.node.getComponent("cc.Graphics");
                t.moveTo(-1, 321), t.lineTo(-67, 289), t.moveTo(-67, 288), t.lineTo(-67, -218), t.moveTo(-67, -218), t.lineTo(-1, -251), t.moveTo(1, -251), t.lineTo(67, -218), t.moveTo(67, -218), t.lineTo(67, 288), t.moveTo(67, 288), t.lineTo(1, 321), t.close(), t.stroke(), t.fill()
            }, e.prototype.start = function () {
            }, e = __decorate([a], e)
        }(cc.Component));
        o.default = i, cc._RF.pop()
    }, {}],
    TerrainOutlineFront: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "ea409kjKpFO/LUM02+eZ93o", "TerrainOutlineFront"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = cc._decorator, a = n.ccclass, i = (n.property, function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }

            return __extends(e, t), e.prototype.onLoad = function () {
                var t = this.node.getComponent("cc.Graphics");
                t.moveTo(0, -251), t.lineTo(0, 253), t.moveTo(0, 254), t.lineTo(66, 287), t.moveTo(0, 254), t.lineTo(-67, 288), t.close(), t.stroke(), t.fill()
            }, e.prototype.start = function () {
            }, e = __decorate([a], e)
        }(cc.Component));
        o.default = i, cc._RF.pop()
    }, {}],
    Terrain: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "625a49fCPFLPKoz1H9KTAqz", "Terrain"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = cc._decorator, a = n.ccclass, i = (n.property, function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }

            var o;
            return __extends(e, t), o = e, e.prototype.isInTerrain = function (t) {
                var e = this.node.getChildByName("Sprite"), n = (e.getContentSize(), !1);
                return 0 == e.anchorX ? n = t.x >= this.node.x - o.defaultMovement / 2 - 1 && t.x <= this.node.x + e.width - o.defaultMovement / 2 + 1 && t.y >= this.node.y - e.height + o.defaultMovement / 2 - 1 && t.y <= this.node.y + o.defaultMovement / 2 + 1 : 1 == e.anchorX && (n = t.x >= this.node.x - e.width + o.defaultMovement / 2 - 1 && t.x <= this.node.x + o.defaultMovement / 2 + 1 && t.y >= this.node.y - e.height + o.defaultMovement / 2 - 1 && t.y <= this.node.y + o.defaultMovement / 2 + 1), n
            }, e.defaultMovement = 148, e = o = __decorate([a], e)
        }(cc.Component));
        o.default = i, cc._RF.pop()
    }, {}],
    Test: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "bc68cQl/QZIHJtzW4RAdePw", "Test"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = cc._decorator, a = n.ccclass, i = (n.property, function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }

            return __extends(e, t), e.prototype.onLoad = function () {
                console.log("akkakakak")
            }, e = __decorate([a], e)
        }(cc.Component));
        o.default = i, cc._RF.pop()
    }, {}],
    TipsView: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "e826eegOAxKEpxQzwaSk3Nt", "TipsView"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = cc._decorator, a = n.ccclass, i = n.property, s = function (t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.tipsLabel = null, e.tipsNode = null, e
            }

            var o;
            return __extends(e, t), o = e, e.getInstance = function () {
                return o.instance
            }, e.prototype.onLoad = function () {
                null == o.instance ? o.instance = this : o.instance != this && this.destroy()
            }, e.prototype.showTips = function (t) {
                this.tipsNode.active = !0, this.tipsNode.stopAllActions(), this.tipsNode.opacity = 0, this.tipsLabel.string = t;
                var e = cc.sequence(cc.fadeIn(.5), cc.delayTime(1), cc.fadeOut(.5), cc.callFunc(function () {
                    this.tipsNode.active = !1
                }.bind(this)));
                this.tipsNode.runAction(e)
            }, e.instance = null, __decorate([i(cc.Label)], e.prototype, "tipsLabel", void 0), __decorate([i(cc.Node)], e.prototype, "tipsNode", void 0), e = o = __decorate([a], e)
        }(cc.Component);
        o.default = s, cc._RF.pop()
    }, {}],
    TitleView: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "5f905KZlepA85Pl9GyE/UvV", "TitleView"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = t("../Controllers/CameraControl"), a = t("../Controllers/UIControl"),
            i = t("../Controllers/GameControl"), s = t("../Data/Constants"), r = t("./CommonBg"), c = t("./CommonUI"),
            l = cc._decorator, d = l.ccclass, u = l.property, p = function (t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.touchHint = null, e.touchHintShadow = null, e.initLabel = null, e.upNode = null, e.downNode = null, e.touchNode = null, e
                }

                var o;
                return __extends(e, t), o = e, e.getInstance = function () {
                    return o.instance
                }, e.prototype.onLoad = function () {
                    uiManager.seekNodeWithName("RankBtn", this.node).active = false;
                    uiManager.seekNodeWithName("UpNode", this.node).active = false;
                    uiManager.seekNodeWithName("touch", this.node).active = false;
                    null == o.instance ? o.instance = this : o.instance != this && this.destroy(), this.downNode.active = !1, this.initLabel.active = !0, this.touchNode.interactable = !1
                }, e.prototype.initializeFinished = function () {
                    this.downNode.active = !0, this.initLabel.active = !1, this.touchNode.interactable = !0
                }, e.prototype.onEnable = function () {
                    var t = cc.sequence(cc.scaleTo(.5, 1.2), cc.scaleTo(.5, 1)), e = cc.repeatForever(t);
                    this.touchHint.runAction(e), this.touchHintShadow.runAction(e.clone())
                }, e.prototype.onDisable = function () {
                    this.touchHint.stopAllActions(), this.touchHintShadow.stopAllActions()
                }, e.prototype.AnimOut = function () {
                    this.upNode.runAction(cc.moveTo(.3, cc.v2(0, 710)).easing(cc.easeCubicActionIn())), this.downNode.runAction(cc.moveTo(.3, cc.v2(0, -710)).easing(cc.easeCubicActionIn())), a.default.getInstance().showView("BlockView", !0), this.scheduleOnce(function () {
                        a.default.getInstance().showView("BlockView", !1), this.node.active = !1;
                        var t = a.default.getInstance();
                        t.showView("CommonBg", !0), r.default.getInstance().switchToTriangleMode(), t.showView("StageView", !0), t.showView("CommonUI", !0), t.showView("BackBtnBg", !0), c.default.getInstance().AnimIn(!0)
                    }.bind(this), .4)
                }, e.prototype.AnimIn = function () {
                    this.node.active = !0, this.upNode.runAction(cc.moveTo(.3, cc.v2(0, 0)).easing(cc.easeCubicActionOut())), this.downNode.runAction(cc.moveTo(.3, cc.v2(0, 0)).easing(cc.easeCubicActionOut())), a.default.getInstance().showView("BlockView", !0), this.scheduleOnce(function () {
                        a.default.getInstance().showView("BlockView", !1)
                    }.bind(this), .4)
                }, e.prototype.onTouchScreen = function () {
                    if (i.default.getInstance().isFirstPlay) {
                        this.node.active = !1;
                        var t = s.default.getInstance().getPath(1, 1), e = s.default.getInstance().getStage(1, 1);
                        i.default.getInstance().LoadGameStage(t, 1, 1, e), n.default.getInstance().setGameBackground(e.frameId), i.default.getInstance().getStageRankData(1, 1), i.default.getInstance().isFirstPlay = !1, i.default.getInstance().logGamePlay()
                    } else n.default.getInstance().node.active = !1, this.AnimOut()
                }, e.instance = null, __decorate([u(cc.Node)], e.prototype, "touchHint", void 0), __decorate([u(cc.Node)], e.prototype, "touchHintShadow", void 0), __decorate([u(cc.Node)], e.prototype, "initLabel", void 0), __decorate([u(cc.Node)], e.prototype, "upNode", void 0), __decorate([u(cc.Node)], e.prototype, "downNode", void 0), __decorate([u(cc.Button)], e.prototype, "touchNode", void 0), e = o = __decorate([d], e)
            }(cc.Component);
        o.default = p, cc._RF.pop()
    }, {
        "../Controllers/CameraControl": "CameraControl",
        "../Controllers/GameControl": "GameControl",
        "../Controllers/UIControl": "UIControl",
        "../Data/Constants": "Constants",
        "./CommonBg": "CommonBg",
        "./CommonUI": "CommonUI"
    }],
    TouchControl: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "c744dzDqGVCCoLheSOEZ8nG", "TouchControl"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = cc._decorator, a = n.ccclass, i = (n.property, function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }

            return __extends(e, t), e.prototype.onLoad = function () {
            }, e.prototype.start = function () {
            }, e = __decorate([a], e)
        }(cc.Component));
        o.default = i, cc._RF.pop()
    }, {}],
    UIControl: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "398cdD0x7BHeZNNxeEEUbnk", "UIControl"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = t("./GameControl"), a = t("./PlayerControl"), i = t("../Views/GameBackground"), s = cc._decorator,
            r = s.ccclass, c = s.property, l = function (t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.startNode = null, e
                }

                var o;
                return __extends(e, t), o = e, e.getInstance = function () {
                    return o.instance
                }, e.prototype.onLoad = function () {
                    null == o.instance ? o.instance = this : o.instance != this && this.destroy()
                }, e.prototype.isViewVisible = function (t) {
                    var e = this.node.getChildByName(t);
                    if (null != e) return e.active
                }, e.prototype.showView = function (t, e) {
                    var o = this.node.getChildByName(t);
                    null == o || o.active != e && (o.active = e), "StageView" == t && e && this.showView("GameView", !1)
                }, e.prototype.OnTouchGameStart = function () {
                    this.startNode.active = !1, n.default.getInstance().pauseGame(!1), "run" != a.default.getInstance().playerSpine.animation ? a.default.getInstance().setSpineAnimation("run") : a.default.getInstance().playerSpine.paused = !1, a.default.getInstance().isRevive ? (a.default.getInstance().isProtect = !0, a.default.getInstance().resumeSpineAction()) : n.default.getInstance().logGamePlay(), i.default.getInstance().changeGameBgMove(a.default.getInstance().direction)
                }, e.instance = null, __decorate([c(cc.Node)], e.prototype, "startNode", void 0), e = o = __decorate([r], e)
            }(cc.Component);
        o.default = l, cc._RF.pop()
    }, {
        "../Views/GameBackground": "GameBackground",
        "./GameControl": "GameControl",
        "./PlayerControl": "PlayerControl"
    }],
    UnlockSongView: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "52cd4yOZktOqIEs9syb2xeA", "UnlockSongView"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = cc._decorator, a = n.ccclass, i = (n.property, function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }

            return __extends(e, t), e = __decorate([a], e)
        }(cc.Component));
        o.default = i, cc._RF.pop()
    }, {}],
    Utility: [function (t, e, o) {
        "use strict";
        cc._RF.push(e, "fb57ch66zJMk5kQgUJ0i+Sq", "Utility"), Object.defineProperty(o, "__esModule", {value: !0});
        var n = cc._decorator, a = (n.ccclass, n.property, function () {
            function t() {
            }

            return t.GetFileType = function (t) {
                if (-1 != t.lastIndexOf(".")) {
                    var e = t.split(".");
                    return e[e.length - 1]
                }
                return null
            }, t.IntToString = function (t, e) {
                for (var o = t.toString().length; o < e;) t = "0" + t, o++;
                return t
            }, t.JsonObjDeepCopy = function (t) {
                var e = JSON.stringify(t);
                return JSON.parse(e)
            }, t.GetUrlParams = function (t) {
                if (!t || "" == t) return {};
                var e = t.match(/[0-9a-zA-Z]*=[0-9a-zA-Z]*/g), o = {};
                for (var n in e) {
                    var a = e[n].split("=");
                    o[a[0]] = a[1]
                }
                return o
            }, t.GetClassName = function (t) {
                var e = /function (.{1,})\(/.exec(t.constructor.toString());
                return e && e.length > 1 ? e[1] : ""
            }, t.prefixInteger = function (t, e) {
                return (Array(e).join("0") + t).slice(0, e)
            }, t
        }());
        o.default = a, cc._RF.pop()
    }, {}]
}, {}, ["CheckBoard", "GuideNode", "PageViewEx", "RankFrame", "Terrain", "TerrainOutlineBehind", "TerrainOutlineFront", "CameraControl", "GameControl", "MapControl", "PlayerControl", "SoundControl", "TerrainControl", "TouchControl", "UIControl", "Constants", "DontDestroy", "Facebook", "FacebookAd", "FacebookAnalytics", "FacebookPlatform", "FacebookPlayerInfoInRank", "FacebookPlayerPicDic", "FacebookRank", "FacebookStorage", "Logger", "MsgDefine", "MsgSystem", "Form", "Http", "Net", "NetConfig", "Socket", "BigIntUtility", "CSDictionary", "DateUtility", "Random", "ScreenShot", "Utility", "GameManager", "GlobalConfig", "Test", "BuyMusicView", "BuySkinView", "CommonBg", "CommonUI", "DiamondView", "EnergyView", "FailedView", "GMView", "GameBackground", "GameVIew", "GuideView", "LevelUpView", "LevelView", "LoadingView", "PauseView", "RankView", "ScoreView", "SettingView", "ShopView", "StageView", "StageView2", "TipsView", "TitleView", "UnlockSongView"]);