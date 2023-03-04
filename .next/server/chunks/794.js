"use strict";
exports.id = 794;
exports.ids = [794];
exports.modules = {

/***/ 7794:
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



const getRandomInt = (max, min = 0)=>Math.floor(Math.random() * (max - min + 1)) + min;
const searchResult = (query)=>new Array(getRandomInt(5)).join(".").split(".").map((_, idx)=>{
        const category = `${query}${idx}`;
        return {
            value: category,
            label: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                style: {
                    display: "flex",
                    justifyContent: "space-between"
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                        children: [
                            query,
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                href: `https://s.taobao.com/search?q=${query}`,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                children: "\xa0"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                        children: [
                            getRandomInt(200, 100),
                            " "
                        ]
                    })
                ]
            })
        };
    });
const MySearch = ()=>{
    const [options, setOptions] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const handleSearch = (value)=>{
        setOptions(value ? searchResult(value) : []);
    };
    const onSelect = (value)=>{
        console.log("onSelect", value);
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.AutoComplete, {
        dropdownMatchSelectWidth: 252,
        style: {
            width: 250
        },
        options: options,
        onSelect: onSelect,
        onSearch: handleSearch,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Input.Search, {
            size: "large",
            placeholder: "Поиск",
            enterButton: true
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MySearch);


/***/ })

};
;