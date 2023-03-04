"use strict";
exports.id = 380;
exports.ids = [380];
exports.modules = {

/***/ 9380:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);



const FastOrder = ()=>{
    const showModal = ()=>{
        setOpen(true);
    };
    const handleCancel = ()=>{
        setOpen(false);
    };
    const onFinish = (values)=>{
        console.log("Success:", values);
    };
    const onFinishFailed = (errorInfo)=>{
        console.log("Failed:", errorInfo);
    };
    const [open, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [confirmLoading, setConfirmLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [messageApi, contextHolder] = antd__WEBPACK_IMPORTED_MODULE_2__.message.useMessage();
    const success = ()=>{
        messageApi.open({
            type: "loading",
            content: "Оформляем",
            duration: 1
        }).then(()=>antd__WEBPACK_IMPORTED_MODULE_2__.message.success("Заказ выполнен успешно", 3));
    };
    const handleOk = ()=>{
        setLoading(true);
        setTimeout(()=>{
            setOpen(false);
            setLoading(false);
        }, 2000);
        success();
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            contextHolder,
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Button, {
                type: "primary",
                onClick: showModal,
                children: "Быстрый заказ"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "modal_wrap",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Modal, {
                    width: 360,
                    title: "Заказ",
                    open: open,
                    confirmLoading: confirmLoading,
                    onOk: handleOk,
                    onCancel: handleCancel,
                    cancelText: "Отмена",
                    footer: [],
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_2__.Form, {
                        name: "basic",
                        labelCol: {
                            span: 12
                        },
                        wrapperCol: {
                            span: 25
                        },
                        initialValues: {
                            remember: true
                        },
                        onFinish: onFinish,
                        onFinishFailed: onFinishFailed,
                        autoComplete: "off",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
                                label: "ФИО",
                                name: "name",
                                rules: [
                                    {
                                        required: true,
                                        message: "Пожалуйста введите ФИО"
                                    }
                                ],
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Input, {})
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
                                label: "Номер телефона",
                                name: "number",
                                rules: [
                                    {
                                        required: true,
                                        message: "Пожалуйста введите номер телефона"
                                    }
                                ],
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Input, {})
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
                                noStyle: true,
                                shouldUpdate: true,
                                children: ({ getFieldsValue  })=>{
                                    const { name , number  } = getFieldsValue();
                                    const formIsComplete = !!name && !!number;
                                    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "submitButton",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Button, {
                                            onClick: handleOk,
                                            loading: loading,
                                            type: "primary",
                                            htmlType: "submit",
                                            className: "loginFormButton",
                                            disabled: !formIsComplete,
                                            children: "Заказать"
                                        })
                                    });
                                }
                            })
                        ]
                    })
                })
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FastOrder);


/***/ })

};
;