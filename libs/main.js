const checkJsonCode = require("./node_b28");
const checkJsonExcel = require("./jsonAndExcel/excelCheck");

const defaultOptions = {
    jsonAndCode: null, //检查翻译函数中是否有没有在json文件中的字段
    jsonAndExcel: null, //检查在json文件与excel文件是否对应
    hasChinese: null
};

const fs = require("fs");

const path = require("path");

class TranslateCheckTool {
    constructor(options) {
        this.options = extend(defaultOptions, options);
    }
}

TranslateCheckTool.prototype.apply = function (compiler) {

    if (!!this.options.jsonAndCode) {
        checkOptionsValid("jac", this.options.jsonAndCode);
        console.info("检查代码中翻译是否在json文件中......");
        checkJsonCode(this.options.jsonAndCode.codePath, this.options.jsonAndCode.jsonPath, this.options.jsonAndCode.logPath, "json与代码中未对应项错误日志.txt");
    }

    if (!!this.options.jsonAndExcel) {
        checkOptionsValid("jae", this.options.jsonAndExcel);
        console.info("检查json文件是否与excel文件对应中......");
        checkJsonExcel(this.options.jsonAndExcel);
    }

};

/**
 * 检查webpack配置参数是否正确
 * @param {*需要做校验的类型} type 
 * @param {*webpack配置参数} options 
 */
function checkOptionsValid(type, options) {

    switch (type) {
        //jsonAndCode
        case "jac": {
            if (!options.codePath || !options.jsonPath) {
                throw new Error("jsonAndCode的codePath属性和jsonPath属性必须配置");
            } else {

                if (!fs.existsSync(options.codePath) || !fs.existsSync(options.jsonPath)) {
                    throw new Error("jsonAndCode路径配置有错误");
                }

                if (!options.logPath) {
                    console.info("jsonAndCode没有配置错误日志路径，使用默认路径");
                    options.logPath = "./errorLog"
                }
            }
            //判断错误日志文件夹是否存在，不存在则创建
            if (!fs.existsSync(options.logPath)) {
                console.info("错误日志文件夹不存在，创建......");
                fs.mkdirSync(options.logPath);
            }
        } break;
        case "jae": {

            if (!options.jsonPath || !options.excelPath || !options.defaultLang || !options.langToCheck) {
                throw new Error("jsonAndExcel中的jsonPath、excelPath、defaultLang、langToCheck属性必须配置");
            } else {

                if (!fs.existsSync(options.jsonPath) || !fs.existsSync(options.excelPath)) {
                    throw new Error("jsonAndExcel路径配置有错误");
                }

                if (!fs.existsSync(options.excelPath)) {
                    throw new Error("excel文件不存在");
                }

                if(typeof options.defaultLang != "string"){
                    throw new Error("defaultLang配置错误");
                }

                if(!Array.isArray(options.langToCheck)){
                    throw new Error("langToCheck属性应该为数组");
                }

                if (!options.logPath) {
                    console.info("jsonAndExcel没有配置错误日志路径，使用默认路径");
                    options.logPath = "./errorLog";
                }
            }
            //判断错误日志文件夹是否存在，不存在则创建
            if (!fs.existsSync(options.logPath)) {
                console.info("错误日志文件夹不存在，创建......");
                fs.mkdirSync(options.logPath);
            }
        } break;
    }

}


/**
 * 浅复制
 * @param {*} obj 
 * @param {*} ext 
 */
function extend(obj, ext) {
    for (var prop in ext) {
        if (ext.hasOwnProperty(prop)) {
            obj[prop] = ext[prop];
        }
    }
    return obj;
}

module.exports = TranslateCheckTool;