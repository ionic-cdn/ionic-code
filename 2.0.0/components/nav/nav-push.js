var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('angular2/core');
var nav_controller_1 = require('./nav-controller');
var nav_registry_1 = require('./nav-registry');
/**
 * @name NavPush
 * @description
 * Directive for declaratively linking to a new page instead of using
 * {@link ../NavController/#push NavController.push}. Similar to ui-router's `ui-sref`.
 *
 * @usage
 * ```html
 * <button [navPush]="pushPage"></button>
 * ```
 * To specify parameters you can use array syntax or the `nav-params` property:
 * ```html
 * <button [navPush]="pushPage" [navParams]="params"></button>
 * ```
 * Where `pushPage` and `params` are specified in your component, and `pushPage`
 * contains a reference to a [@Page component](../../../config/Page/):
 *
 * ```ts
 * import {LoginPage} from 'login';
 * @Page({
 *   template: `<button [navPush]="pushPage" [navParams]="params"></button>`
 * })
 * class MyPage {
 *   constructor(){
 *     this.pushPage = LoginPage;
 *     this.params = { id: 42 };
 *   }
 * }
 * ```
 *
 * ### Alternate syntax
 * You can also use syntax similar to Angular2's router, passing an array to
 * NavPush:
 * ```html
 * <button [navPush]="[pushPage, params]"></button>
 * ```
 * @demo /docs/v2/demos/nav-push-pop/
 * @see {@link /docs/v2/components#navigation Navigation Component Docs}
 * @see {@link ../NavPop NavPop API Docs}
 */
var NavPush = (function () {
    function NavPush(_nav, registry) {
        this._nav = _nav;
        this.registry = registry;
        if (!_nav) {
            void 0;
        }
    }
    /**
     * @private
     */
    NavPush.prototype.onClick = function () {
        var destination, params;
        if (this.navPush instanceof Array) {
            if (this.navPush.length > 2) {
                throw 'Too many [navPush] arguments, expects [View, { params }]';
            }
            destination = this.navPush[0];
            params = this.navPush[1] || this.navParams;
        }
        else {
            destination = this.navPush;
            params = this.navParams;
        }
        if (typeof destination === "string") {
            destination = this.registry.get(destination);
        }
        this._nav && this._nav.push(destination, params);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], NavPush.prototype, "navPush", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], NavPush.prototype, "navParams", void 0);
    NavPush = __decorate([
        core_1.Directive({
            selector: '[navPush]',
            host: {
                '(click)': 'onClick()',
                'role': 'link'
            }
        }),
        __param(0, core_1.Optional()), 
        __metadata('design:paramtypes', [nav_controller_1.NavController, nav_registry_1.NavRegistry])
    ], NavPush);
    return NavPush;
})();
exports.NavPush = NavPush;
/**
 * @name NavPop
 * @description
 * Directive for declaratively pop the current page off from the navigation stack.
 *
 * @usage
 * ```html
 * <ion-content>
 *  <div block button nav-pop>go back</div>
 * </ion-content>
 * ```
 * This will go back one page in the navigation stack
 *
 * Similar to {@link /docs/v2/api/components/nav/NavPush/ `NavPush` }
 * @demo /docs/v2/demos/nav-push-pop/
 * @see {@link /docs/v2/components#navigation Navigation Component Docs}
 * @see {@link ../NavPush NavPush API Docs}
 */
var NavPop = (function () {
    /**
     * TODO
     * @param {NavController} nav  TODO
     */
    function NavPop(_nav) {
        this._nav = _nav;
        if (!_nav) {
            void 0;
        }
    }
    /**
     * @private
     */
    NavPop.prototype.onClick = function () {
        this._nav && this._nav.pop();
    };
    NavPop = __decorate([
        core_1.Directive({
            selector: '[nav-pop]',
            host: {
                '(click)': 'onClick()',
                'role': 'link'
            }
        }),
        __param(0, core_1.Optional()), 
        __metadata('design:paramtypes', [nav_controller_1.NavController])
    ], NavPop);
    return NavPop;
})();
exports.NavPop = NavPop;
