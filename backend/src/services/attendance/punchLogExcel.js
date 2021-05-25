import XlsxPopulate from "xlsx-populate";
import appRoot from "app-root-path";

function fillPunchDaily(items) {
  XlsxPopulate.fromBlankAsync().then((workbook) => {
    // Modify the workbook.
    let row = 3;

    workbook
      .sheet("Sheet1")
      .cell(`A2`)
      .value("Date")
      .style({ leftBorder: true, topBorder: true });

    workbook.sheet("Sheet1").cell(`B2`).value("User").style("border", true);
    workbook.sheet("Sheet1").cell(`C2`).value("Shift").style("border", true);
    workbook.sheet("Sheet1").cell(`D2`).value("Check-in").style("border", true);

    workbook
      .sheet("Sheet1")
      .cell(`E2`)
      .value("Shift Check-in")
      .style("border", true);
    workbook
      .sheet("Sheet1")
      .cell(`F2`)
      .value("Check-out")
      .style("border", true);
    workbook
      .sheet("Sheet1")
      .cell(`G2`)
      .value("Shift Check-out")
      .style("border", true);
    workbook
      .sheet("Sheet1")
      .cell(`H2`)
      .value("Delay Entrance")
      .style("border", true);
    workbook
      .sheet("Sheet1")
      .cell(`I2`)
      .value("Delay Out")
      .style("border", true);
      workbook
      .sheet("Sheet1")
      .cell(`J2`)
      .value("Total delay")
      .style("border", true);

    // workbook
    //   .sheet("Sheet1")
    //   .cell(`H2`)
    //   .value("Hora Planeada de Saida 1")
    //   .style("border", true);
    // workbook
    //   .sheet("Sheet1")
    //   .cell(`I2`)
    //   .value("Hora de Saida")
    //   .style("border", true);

    // workbook
    //   .sheet("Sheet1")
    //   .cell(`J1`)
    //   .value("First Out Time")
    //   .style("border", true);
    // workbook
    //   .sheet("Sheet1")
    //   .cell(`J2`)
    //   .value("Hora de Chegada Planeada")
    //   .style("border", true);
    // workbook.sheet("Sheet1").cell(`K2`).value("Hora de Chegada").style({
    //   leftBorder: true,
    //   topBorder: true,
    //   rightBorder: true,
    //   bottomBorder: true,
    // });
    // workbook
    //   .sheet("Sheet1")
    //   .cell(`L2`)
    //   .value("Tempo de Atraso")
    //   .style("border", true);

    // workbook
    //   .sheet("Sheet1")
    //   .cell(`M1`)
    //   .value("Second In Time")
    //   .style("border", true);
    // workbook
    //   .sheet("Sheet1")
    //   .cell(`M2`)
    //   .value("Hora de Chegada Planeada")
    //   .style({
    //     leftBorder: true,
    //     topBorder: true,
    //     rightBorder: true,
    //     bottomBorder: true,
    //   });
    // workbook
    //   .sheet("Sheet1")
    //   .cell(`N2`)
    //   .value("Hora de Chegada")
    //   .style("border", true);
    // workbook
    //   .sheet("Sheet1")
    //   .cell(`O2`)
    //   .value("Tempo de Atraso")
    //   .style("border", true);

    items.forEach((item) => {
      workbook.sheet("Sheet1").cell(`A${row}`).value(item.date).style({
        leftBorder: true,
        topBorder: true,
        rightBorder: true,
        bottomBorder: true,
        numberFormat: "yyyy-mm-dd hh:mm:ss",
      });
      workbook
        .sheet("Sheet1")
        .cell(`B${row}`)
        .value(item.userName)
        .style("border", true);
      // workbook.sheet("Sheet1").cell(`C${row}`).value(item.userId).style({
      //   leftBorder: true,
      //   topBorder: true,
      //   rightBorder: true,
      //   bottomBorder: true,
      // });
      workbook.sheet("Sheet1").cell(`C${row}`).value(item.description).style({
        leftBorder: true,
        topBorder: true,
        rightBorder: true,
        bottomBorder: true,
      });
      //let atraso = item.saida - item.saidashift + item.shiftSupposedGracePerior <0? 0: item.saida+ item.shiftSupposedGracePerior - item.saidashift;
      workbook
        .sheet("Sheet1")
        .cell(`D${row}`)
        .value(item.entrada)
        .style({ border: true, numberFormat: "hh:mm:ss" });
      workbook
        .sheet("Sheet1")
        .cell(`E${row}`)
        .value(item.entradashift)
        .style({ border: true, numberFormat: "hh:mm:ss" });
      // .style("border", true);

      workbook
        .sheet("Sheet1")
        .cell(`F${row}`)
        .value(item.saida)
        .style({ border: true, numberFormat: "hh:mm:ss" });
      workbook
        .sheet("Sheet1")
        .cell(`G${row}`)
        .value(item.saidashift)
        .style({ border: true, numberFormat: "hh:mm:ss" });

      workbook
        .sheet("Sheet1")
        .cell(`H${row}`)
        .value(item.delayEntrance)
        .style({ border: true, numberFormat: "hh:mm:ss" });

      workbook
        .sheet("Sheet1")
        .cell(`I${row}`)
        .value(item.delayOut)
        .style({ border: true, numberFormat: "hh:mm:ss" });

        workbook
        .sheet("Sheet1")
        .cell(`I${row}`)
        .value(item.totalDelay)
        .style({ border: true, numberFormat: "hh:mm:ss" });

      row++;
    });

    // Write to file.
    return workbook
      .toFileAsync(appRoot + "/public/uploads/attendance/punchlog.xlsx")
      .then(() => {
        return "uploads/attendance/punchlog.xlsx";
      });
  });
}

function fillPunchCard(items) {
  XlsxPopulate.fromBlankAsync().then((workbook) => {
    // Modify the workbook.
    let row = 3;

    // workbook.sheet("Sheet1").range("E1:I1").merged(true).style("border", true);

    workbook.sheet("Sheet1").cell(`A2`).value("Date").style("border", true);
    workbook.sheet("Sheet1").cell(`B2`).value("Username").style("border", true);
    workbook
      .sheet("Sheet1")
      .cell(`C2`)
      .value("Usergroup")
      .style("border", true);
    workbook.sheet("Sheet1").cell(`D2`).value("Device").style("border", true);
    workbook.sheet("Sheet1").cell(`E2`).value("Schedule").style("border", true);
    workbook
      .sheet("Sheet1")
      .cell(`F2`)
      .value("Punch Type")
      .style("border", true);
    workbook
      .sheet("Sheet1")
      .cell(`G2`)
      .value("Shift Time in")
      .style("border", true);
    workbook
      .sheet("Sheet1")
      .cell(`H2`)
      .value("Shift Time out")
      .style("border", true);

    items.forEach((item) => {
      workbook.sheet("Sheet1").cell(`A${row}`).value(item.userName).style({
        leftBorder: true,
        topBorder: true,
        rightBorder: true,
        bottomBorder: true,
      });

      workbook
        .sheet("Sheet1")
        .cell(`A${row}`)
        .value(item.date)
        .style("border", true);
      workbook
        .sheet("Sheet1")
        .cell(`B${row}`)
        .value(item.userName)
        .style("border", true);
      workbook
        .sheet("Sheet1")
        .cell(`C${row}`)
        .value(item.userGroup)
        .style("border", true);
      workbook
        .sheet("Sheet1")
        .cell(`D${row}`)
        .value(item.deviceId)
        .style("border", true);
      workbook
        .sheet("Sheet1")
        .cell(`E${row}`)
        .value(item.userDefinedSchedulerName)
        .style("border", true);
      workbook
        .sheet("Sheet1")
        .cell(`F${row}`)
        .value(item.punchType)
        .style("border", true);
      workbook
        .sheet("Sheet1")
        .cell(`G${row}`)
        .value(item.timeIn)
        .style("border", true);
      workbook
        .sheet("Sheet1")
        .cell(`H${row}`)
        .value(item.timeOut)
        .style("border", true);

      row++;
    });

    // Write to file.
    return workbook
      .toFileAsync(appRoot + "/public/uploads/attendance/punchdaily.xlsx")
      .then(() => {
        return "uploads/attendance/punchdaily.xlsx";
      });
  });
}

export default {
  fillPunchDaily,
  fillPunchCard,
};
