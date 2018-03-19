const checkTranslate = require("./node_b28");
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
        checkOptionsValid("jac", this.options);
        checkTranslate(this.options.jsonAndCode.src, this.options.jsonAndCode.transFile, "./errorLog", "json与代码中未对应项错误日志.txt")
    }

    if (!!this.options.jsonAndExcel) {

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
            if (!options.jsonAndCode.src || !options.jsonAndCode.transFile) {
                throw new Error("jsonAndCode的src属性和transFile属性必须配置");
            }else{
                if(!options.jsonAndCode.logPath){
                    console.info("没有配置错误日志路径，使用默认路径");
                    options.logPath = "./errorLog"
                }
            }
            //判断错误日志文件夹是否存在，不存在则创建
            if(!fs.existsSync(options.jsonAndCode.logPath)){
                console.info("错误日志文件夹不存在，创建......");
                fs.mkdirSync(options.jsonAndCode.logPath);
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