// 下载导出的 csv 文件

const { execSync } = require("child_process");
const { parse } = require("csv-parse/sync");
const fs = require("fs");

const sheetUrl =
  "https://docs.google.com/spreadsheets/d/1uNl_h9qZMxj8DLshh7w30_m_MFgYVVj6tnGl896Qnsc";

// 用 curl 命令来下载，-L 意思是自动跳转
execSync(`curl -L ${sheetUrl}/export?format=csv -o ./message2.csv`, {
  stdio: "ignore",
});

const input = fs.readFileSync("./message2.csv");

const records = parse(input, { columns: true });

// console.log(records);

const zhCNBundle = {};
const enUSBundle = {};

records.forEach(item => {
    const keys = Object.keys(item);
    const key = item[keys[0]];
    const valueZhCN = item[keys[3]];
    const valueEnUS = item[keys[4]];

    zhCNBundle[key] = valueZhCN;
    enUSBundle[key] = valueEnUS;
})

console.log(zhCNBundle);
console.log(enUSBundle);

fs.writeFileSync('zh-CN.json', JSON.stringify(zhCNBundle, null, 2));
fs.writeFileSync('en-US.json', JSON.stringify(enUSBundle, null, 2));
