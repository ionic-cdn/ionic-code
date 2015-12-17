var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var app_1 = require('../app/app');
var config_1 = require('../../config/config');
var dom_1 = require('../../util/dom');
var activator_1 = require('./activator');
var ripple_1 = require('./ripple');
/**
 * @private
 */
var TapClick = (function () {
    function TapClick(app, config, zone) {
        var self = this;
        self.app = app;
        self.zone = zone;
        self.lastTouch = 0;
        self.disableClick = 0;
        self.lastActivated = 0;
        if (config.get('activator') == 'ripple') {
            self.activator = new ripple_1.RippleActivator(app, config, zone);
        }
        else if (config.get('activator') == 'highlight') {
            self.activator = new activator_1.Activator(app, config, zone);
        }
        self.usePolyfill = (config.get('tapPolyfill') === true);
        zone.runOutsideAngular(function () {
            addListener('click', self.click.bind(self), true);
            addListener('touchstart', self.touchStart.bind(self));
            addListener('touchend', self.touchEnd.bind(self));
            addListener('touchcancel', self.pointerCancel.bind(self));
            addListener('mousedown', self.mouseDown.bind(self), true);
            addListener('mouseup', self.mouseUp.bind(self), true);
        });
        self.pointerMove = function (ev) {
            if (dom_1.hasPointerMoved(POINTER_MOVE_UNTIL_CANCEL, self.startCoord, dom_1.pointerCoord(ev))) {
                self.pointerCancel(ev);
            }
        };
    }
    TapClick.prototype.touchStart = function (ev) {
        this.lastTouch = Date.now();
        this.pointerStart(ev);
    };
    TapClick.prototype.touchEnd = function (ev) {
        this.lastTouch = Date.now();
        if (this.usePolyfill && this.startCoord && this.app.isEnabled()) {
            var endCoord = dom_1.pointerCoord(ev);
            if (!dom_1.hasPointerMoved(POINTER_TOLERANCE, this.startCoord, endCoord)) {
                console.debug('create click from touch ' + Date.now());
                // prevent native mouse click events for XX amount of time
                this.disableClick = this.lastTouch + DISABLE_NATIVE_CLICK_AMOUNT;
                // manually dispatch the mouse click event
                var clickEvent = document.createEvent('MouseEvents');
                clickEvent.initMouseEvent('click', true, true, window, 1, 0, 0, endCoord.x, endCoord.y, false, false, false, false, 0, null);
                clickEvent.isIonicTap = true;
                ev.target.dispatchEvent(clickEvent);
            }
        }
        this.pointerEnd(ev);
    };
    TapClick.prototype.mouseDown = function (ev) {
        if (this.isDisabledNativeClick()) {
            console.debug('mouseDown prevent ' + ev.target.tagName + ' ' + Date.now());
            // does not prevent default on purpose
            // so native blur events from inputs can happen
            ev.stopPropagation();
        }
        else if (this.lastTouch + DISABLE_NATIVE_CLICK_AMOUNT < Date.now()) {
            this.pointerStart(ev);
        }
    };
    TapClick.prototype.mouseUp = function (ev) {
        if (this.isDisabledNativeClick()) {
            console.debug('mouseUp prevent ' + ev.target.tagName + ' ' + Date.now());
            ev.preventDefault();
            ev.stopPropagation();
        }
        if (this.lastTouch + DISABLE_NATIVE_CLICK_AMOUNT < Date.now()) {
            this.pointerEnd(ev);
        }
    };
    TapClick.prototype.pointerStart = function (ev) {
        var activatableEle = getActivatableTarget(ev.target);
        if (activatableEle) {
            this.startCoord = dom_1.pointerCoord(ev);
            var now = Date.now();
            if (this.lastActivated + 150 < now) {
                this.activator && this.activator.downAction(ev, activatableEle, this.startCoord.x, this.startCoord.y);
                this.lastActivated = now;
            }
            this.moveListeners(true);
        }
        else {
            this.startCoord = null;
        }
    };
    TapClick.prototype.pointerEnd = function (ev) {
        this.moveListeners(false);
        this.activator && this.activator.upAction();
    };
    TapClick.prototype.pointerCancel = function (ev) {
        console.debug('pointerCancel from ' + ev.type + ' ' + Date.now());
        this.activator && this.activator.clearState();
        this.moveListeners(false);
    };
    TapClick.prototype.moveListeners = function (shouldAdd) {
        removeListener(this.usePolyfill ? 'touchmove' : 'mousemove', this.pointerMove);
        //this.zone.runOutsideAngular(() => {
        if (shouldAdd) {
            addListener(this.usePolyfill ? 'touchmove' : 'mousemove', this.pointerMove);
        }
        else {
        }
        //});
    };
    TapClick.prototype.click = function (ev) {
        var preventReason = null;
        if (!this.app.isEnabled()) {
            preventReason = 'appDisabled';
        }
        else if (!ev.isIonicTap && this.isDisabledNativeClick()) {
            preventReason = 'nativeClick';
        }
        if (preventReason !== null) {
            console.debug('click prevent ' + preventReason + ' ' + Date.now());
            ev.preventDefault();
            ev.stopPropagation();
        }
    };
    TapClick.prototype.isDisabledNativeClick = function () {
        return this.disableClick > Date.now();
    };
    TapClick = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof app_1.IonicApp !== 'undefined' && app_1.IonicApp) === 'function' && _a) || Object, (typeof (_b = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _b) || Object, (typeof (_c = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _c) || Object])
    ], TapClick);
    return TapClick;
    var _a, _b, _c;
})();
exports.TapClick = TapClick;
function getActivatableTarget(ele) {
    var targetEle = ele;
    for (var x = 0; x < 4; x++) {
        if (!targetEle)
            break;
        if (isActivatable(targetEle))
            return targetEle;
        targetEle = targetEle.parentElement;
    }
    return null;
}
/**
 * @private
 */
function isActivatable(ele) {
    if (ACTIVATABLE_ELEMENTS.test(ele.tagName)) {
        return true;
    }
    var attributes = ele.attributes;
    for (var i = 0, l = attributes.length; i < l; i++) {
        if (ACTIVATABLE_ATTRIBUTES.test(attributes[i].name)) {
            return true;
        }
    }
    return false;
}
exports.isActivatable = isActivatable;
function addListener(type, listener, useCapture) {
    document.addEventListener(type, listener, useCapture);
}
function removeListener(type, listener) {
    document.removeEventListener(type, listener);
}
var ACTIVATABLE_ELEMENTS = /^(A|BUTTON)$/;
var ACTIVATABLE_ATTRIBUTES = /tappable|button/i;
var POINTER_TOLERANCE = 4;
var POINTER_MOVE_UNTIL_CANCEL = 10;
var DISABLE_NATIVE_CLICK_AMOUNT = 2500;