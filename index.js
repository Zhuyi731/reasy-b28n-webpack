//For publish
module.exports = require("./libs/main");


 /*For Debug
const Main = require("./libs/main")

let main = new Main({
    jsonAndCode: {
        transFile:  "./app/common/lang",//src表示json文件所在的上级目录，因为可能有多个json文件的情况
        src:  "./app"
    }
});

main.apply();
// */
