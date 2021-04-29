const XlsxPopulate = require("xlsx-populate");

function excell() {
  function fillData(items) {
    XlsxPopulate.fromBlankAsync().then((workbook) => {
      // Modify the workbook.
      let row = 3;

      workbook.sheet("Sheet1").cell(`A2`).value("Date");
      workbook.sheet("Sheet1").cell(`B2`).value("Name");
      workbook.sheet("Sheet1").cell(`C2`).value("User ID");
      workbook.sheet("Sheet1").cell(`D2`).value("Shift");

      workbook.sheet("Sheet1").cell(`E1`).value("First Time");
      workbook.sheet("Sheet1").cell(`E2`).value("Hora de Chegada Planeada");
      workbook.sheet("Sheet1").cell(`F2`).value("Hora de Chegada");
      workbook.sheet("Sheet1").cell(`G2`).value("Tempo de Atraso");

      workbook.sheet("Sheet1").cell(`H2`).value("Hora Planeada de Saida 1");
      workbook.sheet("Sheet1").cell(`I2`).value("Hora de Saida");

      workbook.sheet("Sheet1").cell(`J1`).value("First Out Time");
      workbook.sheet("Sheet1").cell(`J2`).value("Hora de Chegada Planeada");
      workbook.sheet("Sheet1").cell(`K2`).value("Hora de Chegada");
      workbook.sheet("Sheet1").cell(`L2`).value("Tempo de Atraso");

      workbook.sheet("Sheet1").cell(`M1`).value("Second In Time");
      workbook.sheet("Sheet1").cell(`M2`).value("Hora de Chegada Planeada");
      workbook.sheet("Sheet1").cell(`N2`).value("Hora de Chegada");
      workbook.sheet("Sheet1").cell(`O2`).value("Tempo de Atraso");

      items.forEach((item) => {
        workbook.sheet("Sheet1").cell(`A${row}`).value(item.Date);
        workbook.sheet("Sheet1").cell(`B${row}`).value(item.Name);
        workbook.sheet("Sheet1").cell(`C${row}`).value(item.UserId);
        workbook.sheet("Sheet1").cell(`D${row}`).value(item.Shift);
        workbook
          .sheet("Sheet1")
          .cell(`E${row}`)
          .value(item.firstTime?.clockInDefault);
        workbook.sheet("Sheet1").cell(`F${row}`).value(item.firstTime?.clockIn);
        workbook
          .sheet("Sheet1")
          .cell(`F${row}`)
          .value(item.firstTime?.clockOut);
        workbook
          .sheet("Sheet1")
          .cell(`G${row}`)
          .value(item.firstTime?.clockOutDefault);

        workbook
          .sheet("Sheet1")
          .cell(`H${row}`)
          .value(item.secondTime?.clockInDefault);
        workbook
          .sheet("Sheet1")
          .cell(`I${row}`)
          .value(item.secondTime?.clockIn);
        workbook
          .sheet("Sheet1")
          .cell(`J${row}`)
          .value(item.secondTime?.clockOut);
        workbook
          .sheet("Sheet1")
          .cell(`K${row}`)
          .value(item.secondTime?.clockOutDefault);

        workbook
          .sheet("Sheet1")
          .cell(`L${row}`)
          .value(item.secondTimeOut?.clockInDefault);
        workbook.sheet("Sheet1").cell(`M${row}`).value(item.secondOut?.clockIn);
        workbook
          .sheet("Sheet1")
          .cell(`N${row}`)
          .value(item.secondTimeOut?.clockOut);
        workbook
          .sheet("Sheet1")
          .cell(`O${row}`)
          .value(item.secondTimeOut?.clockOutDefault);
        row++;
      });

      // Write to file.
      return workbook.toFileAsync("./content/template1.xlsx");
    });
  }
  return {
    fillData: fillData,
  };
}

module.exports = excell;
