// 将产品经理编辑后的 excel 生成国际化资源包

const { Workbook } = require("exceljs");
const fs = require("fs");

async function main() {
  const workbook = new Workbook();

  const workbook2 = await workbook.xlsx.readFile("./bundle.xlsx");

  const zhCNBundle = {};
  const enUSBundle = {};

  workbook2.eachSheet((sheet, index) => {
    // console.log('工作表'+ index);

    sheet.eachRow((row, rowNumber) => {
      /* const rowData = [];
            row.eachCell((cell, colNumber) => {
                rowData.push(cell.value);
            })
            console.log('行'+rowNumber, rowData); */

      if (rowNumber === 1) {
        return;
      }

      const key = row.getCell(1).value;
      const zhCNValue = row.getCell(4).value;
      const enUSValue = row.getCell(5).value;

      zhCNBundle[key] = zhCNValue;
      enUSBundle[key] = enUSValue;
    });
  });

  console.log(zhCNBundle);
  console.log(enUSBundle);
  fs.writeFileSync("./zh-CN.json", JSON.stringify(zhCNBundle, null, 2));
  fs.writeFileSync("./en-US.json", JSON.stringify(enUSBundle, null, 2));
}

main();
