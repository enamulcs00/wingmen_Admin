(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["login-login-module"], {
  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/login/forgot-password-modal/forgot-password-modal.component.html":
  /*!************************************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/login/forgot-password-modal/forgot-password-modal.component.html ***!
    \************************************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppLoginForgotPasswordModalForgotPasswordModalComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"modal\" id=\"forgotPasswordModal\" data-backdrop=\"static\" tabindex=\"-1\" role=\"dialog\">\n    <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h5 class=\"modal-title\">Forgot Password</h5>\n            </div>\n            <div class=\"modal-body\">\n                <form #forgotForm=\"ngForm\">\n                    <div class=\"form-group\">\n                        <label>Email</label>\n                        <input type=\"text\" name=\"email\" ngModel class=\"form-control\" maxlength=\"50\"\n                            pattern=\"[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$\" required />\n                    </div>\n                </form>\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-primary\" [disabled]=\"!forgotForm.valid\" (click)=\"forgotPassword(forgotForm)\"> Submit</button>\n                <button type=\"button\" class=\"btn btn-secondary\" (click)=\"forgotForm.reset()\" id=\"closeForgotModal\"\n                    data-dismiss=\"modal\">Cancel</button>\n            </div>\n        </div>\n    </div>\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/login/login.component.html":
  /*!**********************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/login/login.component.html ***!
    \**********************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppLoginLoginComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"container login_pagee\">\n    <!-- Outer Row -->\n    <div class=\"row justify-content-center login_outer_div\">\n        <div class=\"col-lg-6\">\n            <div class=\"card o-hidden border-0 shadow-lg\">\n                <div class=\"card-body p-0\">\n                    <!-- Nested Row within Card Body -->\n                    <div class=\"row\">\n                        <!-- <div class=\"col-lg-6 d-none d-lg-block bg-login-image\">\n                            <div class=\"p-5\">\n                                <img src=\"assets/img/login-img.png\" width=\"100%\">\n                            </div>\n                        </div> -->\n                        <div class=\"col-lg-12\">\n                            <div class=\"p-5\">\n                                <div class=\"text-center\">\n                                    <h1 class=\"h4 text-gray-900 mb-4\">Welcome Wingmen-Admin</h1>\n                                </div>\n                                <!-- <div class=\"form-group\">\n                                    <select name=\"type\" class=\"form-control\" [(ngModel)]=\"loginBody.type\" required>\n                                        <option value=\"\">--Select Login Type--</option>\n                                        <option value='b2c'>b2c</option>\n                                        <option value='b2b'>b2b</option>\n                                    </select>\n                                </div> -->\n                                <form class=\"user\" #loginForm=\"ngForm\" name=\"form\" (ngSubmit)=\"loginForm.form.valid && login()\">\n                                    <div class=\"form-group\">\n                                        <input type=\"email\" class=\"form-control form-control-user\" name=\"email\" id=\"exampleInputEmail\" [(ngModel)]=\"loginBody.email\" aria-describedby=\"emailHelp\" pattern=\"[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$\" placeholder=\"Enter Email Address...\" required />\n                                    </div>\n                                    <div class=\"form-group\">\n                                        <input type=\"password\" class=\"form-control form-control-user\" name=\"password\" [(ngModel)]=\"loginBody.password\" id=\"exampleInputPassword\" placeholder=\"Password\" required />\n                                    </div>\n\n                                    <!-- <button type=\"submit\" class=\"btn btn-primary btn-user btn-block\">Login</button> -->\n                                    <button class=\"btn btn-primary btn-user btn-block\" type=\"submit\" [disabled]=\"\n                      !loginForm.valid || flags.isError || flags.isLogin\n                    \">\n                    {{ flags.isLogin ? \"Hold on...\" : \"Login\" }}\n                  </button>\n                                    <a class=\"mt-2\" href=\"javascript:void(0)\" data-toggle=\"modal\" data-target=\"#forgotPasswordModal\">Forgot password</a\n                  >\n                </form>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<app-forgot-password-modal></app-forgot-password-modal>";
    /***/
  },

  /***/
  "./src/app/login/forgot-password-modal/forgot-password-modal.component.scss":
  /*!**********************************************************************************!*\
    !*** ./src/app/login/forgot-password-modal/forgot-password-modal.component.scss ***!
    \**********************************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppLoginForgotPasswordModalForgotPasswordModalComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "@media (min-width: 576px) {\n  .modal-dialog {\n    max-width: 553px;\n    margin: 12.75rem auto; } }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FwcHR1bml4L0Rlc2t0b3AvRW5hbXVsL3dpbmdtZW5hZG1pbi9zcmMvYXBwL2xvZ2luL2ZvcmdvdC1wYXNzd29yZC1tb2RhbC9mb3Jnb3QtcGFzc3dvcmQtbW9kYWwuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSTtJQUNJLGdCQUFnQjtJQUNoQixxQkFBcUIsRUFBQSxFQUN4QiIsImZpbGUiOiJzcmMvYXBwL2xvZ2luL2ZvcmdvdC1wYXNzd29yZC1tb2RhbC9mb3Jnb3QtcGFzc3dvcmQtbW9kYWwuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAbWVkaWEgKG1pbi13aWR0aDogNTc2cHgpe1xuICAgIC5tb2RhbC1kaWFsb2cge1xuICAgICAgICBtYXgtd2lkdGg6IDU1M3B4O1xuICAgICAgICBtYXJnaW46IDEyLjc1cmVtIGF1dG87XG4gICAgfVxuICAgIH0iXX0= */";
    /***/
  },

  /***/
  "./src/app/login/forgot-password-modal/forgot-password-modal.component.ts":
  /*!********************************************************************************!*\
    !*** ./src/app/login/forgot-password-modal/forgot-password-modal.component.ts ***!
    \********************************************************************************/

  /*! exports provided: ForgotPasswordModalComponent */

  /***/
  function srcAppLoginForgotPasswordModalForgotPasswordModalComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ForgotPasswordModalComponent", function () {
      return ForgotPasswordModalComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var ng6_toastr_notifications__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ng6-toastr-notifications */
    "./node_modules/ng6-toastr-notifications/fesm2015/ng6-toastr-notifications.js");
    /* harmony import */


    var src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! src/app/services/auth.service */
    "./src/app/services/auth.service.ts");

    let ForgotPasswordModalComponent = class ForgotPasswordModalComponent {
      constructor(api, toaster) {
        this.api = api;
        this.toaster = toaster;
      }

      ngOnInit() {}

      forgotPassword(f) {
        this.api.forgotPassword(f.value).subscribe(response => {
          if (!response.success) this.errorToast(response.message);else {
            this.successToast(response.message);
            document.getElementById('closeForgotModal').click();
            f.reset();
          }
        });
      }

      successToast(message) {
        this.toaster.successToastr(message, '', {
          maxShown: 1
        });
      }

      errorToast(message) {
        this.toaster.errorToastr(message);
      }

    };

    ForgotPasswordModalComponent.ctorParameters = () => [{
      type: src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"]
    }, {
      type: ng6_toastr_notifications__WEBPACK_IMPORTED_MODULE_2__["ToastrManager"]
    }];

    ForgotPasswordModalComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-forgot-password-modal',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./forgot-password-modal.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/login/forgot-password-modal/forgot-password-modal.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./forgot-password-modal.component.scss */
      "./src/app/login/forgot-password-modal/forgot-password-modal.component.scss")).default]
    })], ForgotPasswordModalComponent);
    /***/
  },

  /***/
  "./src/app/login/login-routing.module.ts":
  /*!***********************************************!*\
    !*** ./src/app/login/login-routing.module.ts ***!
    \***********************************************/

  /*! exports provided: LoginRoutingModule */

  /***/
  function srcAppLoginLoginRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "LoginRoutingModule", function () {
      return LoginRoutingModule;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _login_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./login.component */
    "./src/app/login/login.component.ts");

    const routes = [{
      path: '',
      component: _login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"]
    }];
    let LoginRoutingModule = class LoginRoutingModule {};
    LoginRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
      exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })], LoginRoutingModule);
    /***/
  },

  /***/
  "./src/app/login/login.component.scss":
  /*!********************************************!*\
    !*** ./src/app/login/login.component.scss ***!
    \********************************************/

  /*! exports provided: default */

  /***/
  function srcAppLoginLoginComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "form.user .btn-user {\n  padding: 0.75rem 4rem !important;\n  margin: auto !important; }\n\n.btn-block {\n  width: auto !important; }\n\n.panel {\n  position: relative;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-57%, 39%);\n          transform: translate(-57%, 39%); }\n\n.user {\n  line-height: 2.5rem; }\n\n.login_pagee {\n  height: 100vh;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  width: 100%; }\n\n.login_outer_div {\n  width: 100%;\n  margin: 0px; }\n\n.p-5 {\n  padding: 1rem !important; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FwcHR1bml4L0Rlc2t0b3AvRW5hbXVsL3dpbmdtZW5hZG1pbi9zcmMvYXBwL2xvZ2luL2xvZ2luLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZ0NBQWdDO0VBQ2hDLHVCQUF1QixFQUFBOztBQUczQjtFQUNJLHNCQUFzQixFQUFBOztBQUcxQjtFQUNJLGtCQUFrQjtFQUNsQixRQUFRO0VBQ1IsU0FBUztFQUNULHVDQUErQjtVQUEvQiwrQkFBK0IsRUFBQTs7QUFHbkM7RUFDSSxtQkFBbUIsRUFBQTs7QUFHdkI7RUFDSSxhQUFhO0VBQ2Isb0JBQWE7RUFBYixhQUFhO0VBQ2IseUJBQW1CO1VBQW5CLG1CQUFtQjtFQUNuQixXQUFXLEVBQUE7O0FBR2Y7RUFDSSxXQUFXO0VBQ1gsV0FBVyxFQUFBOztBQUdmO0VBQ0ksd0JBQXdCLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9sb2dpbi9sb2dpbi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImZvcm0udXNlciAuYnRuLXVzZXIge1xuICAgIHBhZGRpbmc6IDAuNzVyZW0gNHJlbSAhaW1wb3J0YW50O1xuICAgIG1hcmdpbjogYXV0byAhaW1wb3J0YW50O1xufVxuXG4uYnRuLWJsb2NrIHtcbiAgICB3aWR0aDogYXV0byAhaW1wb3J0YW50O1xufVxuXG4ucGFuZWwge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB0b3A6IDUwJTtcbiAgICBsZWZ0OiA1MCU7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTU3JSwgMzklKTtcbn1cblxuLnVzZXIge1xuICAgIGxpbmUtaGVpZ2h0OiAyLjVyZW07XG59XG5cbi5sb2dpbl9wYWdlZSB7XG4gICAgaGVpZ2h0OiAxMDB2aDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgd2lkdGg6IDEwMCU7XG59XG5cbi5sb2dpbl9vdXRlcl9kaXYge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1hcmdpbjogMHB4O1xufVxuXG4ucC01IHtcbiAgICBwYWRkaW5nOiAxcmVtICFpbXBvcnRhbnQ7XG59Il19 */";
    /***/
  },

  /***/
  "./src/app/login/login.component.ts":
  /*!******************************************!*\
    !*** ./src/app/login/login.component.ts ***!
    \******************************************/

  /*! exports provided: LoginComponent */

  /***/
  function srcAppLoginLoginComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "LoginComponent", function () {
      return LoginComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _requests_login_body__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../requests/login-body */
    "./src/app/requests/login-body.ts");
    /* harmony import */


    var _services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../services/auth.service */
    "./src/app/services/auth.service.ts");
    /* harmony import */


    var ng6_toastr_notifications__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ng6-toastr-notifications */
    "./node_modules/ng6-toastr-notifications/fesm2015/ng6-toastr-notifications.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");

    let LoginComponent = class LoginComponent {
      constructor(authservice, toaster, router) {
        this.authservice = authservice;
        this.toaster = toaster;
        this.router = router;
        this.loginBody = new _requests_login_body__WEBPACK_IMPORTED_MODULE_2__["LoginBody"]();
        this.flags = {
          isLogin: false,
          isError: false
        };
      }

      ngOnInit() {
        this.flags.isLogin = false;
      }

      login() {
        this.flags.isLogin = true;
        this.authservice.signIn(this.loginBody).subscribe(response => {
          if (!response.success) {
            this.flags.isLogin = false;
            this.errorMessage = response.message;
            return this.errorToast(this.errorMessage);
          }

          this.authservice.sendToken(response.data.token);
          this.router.navigate(['/wingmen/dashboard']);
        }, error => {
          this.flags.isLogin = false;
        });
      }

      successToast(message) {
        this.toaster.successToastr(message, '', {
          maxShown: 1
        });
      }

      errorToast(message) {
        this.toaster.errorToastr(message);
      }

    };

    LoginComponent.ctorParameters = () => [{
      type: _services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"]
    }, {
      type: ng6_toastr_notifications__WEBPACK_IMPORTED_MODULE_4__["ToastrManager"]
    }, {
      type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]
    }];

    LoginComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-login',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./login.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/login/login.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./login.component.scss */
      "./src/app/login/login.component.scss")).default]
    })], LoginComponent);
    /***/
  },

  /***/
  "./src/app/login/login.module.ts":
  /*!***************************************!*\
    !*** ./src/app/login/login.module.ts ***!
    \***************************************/

  /*! exports provided: LoginModule */

  /***/
  function srcAppLoginLoginModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "LoginModule", function () {
      return LoginModule;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _login_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./login-routing.module */
    "./src/app/login/login-routing.module.ts");
    /* harmony import */


    var _login_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./login.component */
    "./src/app/login/login.component.ts");
    /* harmony import */


    var _forgot_password_modal_forgot_password_modal_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ./forgot-password-modal/forgot-password-modal.component */
    "./src/app/login/forgot-password-modal/forgot-password-modal.component.ts");

    let LoginModule = class LoginModule {};
    LoginModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      declarations: [_login_component__WEBPACK_IMPORTED_MODULE_5__["LoginComponent"], _forgot_password_modal_forgot_password_modal_component__WEBPACK_IMPORTED_MODULE_6__["ForgotPasswordModalComponent"]],
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _login_routing_module__WEBPACK_IMPORTED_MODULE_4__["LoginRoutingModule"]]
    })], LoginModule);
    /***/
  },

  /***/
  "./src/app/requests/login-body.ts":
  /*!****************************************!*\
    !*** ./src/app/requests/login-body.ts ***!
    \****************************************/

  /*! exports provided: LoginBody */

  /***/
  function srcAppRequestsLoginBodyTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "LoginBody", function () {
      return LoginBody;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");

    class LoginBody {}
    /***/

  }
}]);
//# sourceMappingURL=login-login-module-es5.js.map