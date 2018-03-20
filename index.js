//For publish
// module.exports = require("./libs/main");


//  /*For Debug
const Main = require("./libs/main")

let main = new Main({
    jsonAndCode: {
        jsonPath:  "./app/common/lang",//src表示json文件所在的上级目录，因为可能有多个json文件的情况
        codePath:  "./app"
    },jsonAndExcel:{
        jsonPath: "./app/common/lang",
        excelPath: "./docs/O3.xlsx",
        logPath: "./errCode",
        errFile: "hahha.txt",
        defaultLang: "en",
        langToCheck: ["cn"]
    }
});

main.apply();
// */
