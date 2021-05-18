import XlsxPopulate from "xlsx-populate";
import path from "path";
import appRoot from "app-root-path"

function fillPunchDailyDetails(items) {
  XlsxPopulate.fromBlankAsync().then((workbook) => {
    // Modify the workbook.
    let row = 3;

    // workbook.sheet("Sheet1").range("E1:I1").merged(true).style("border", true);
    // workbook.sheet("Sheet1").range("J1:L1").merged(true).style("border", true);
    // workbook.sheet("Sheet1").range("M1:O1").merged(true).style("border", true);

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
      .cell(`E1`)
      .value("Shift Check-in")
      .style("border", true);
    workbook
      .sheet("Sheet1")
      .cell(`E2`)
      .value("Check-out")
      .style("border", true);
    workbook
      .sheet("Sheet1")
      .cell(`F2`)
      .value("Shift Check-out")
      .style("border", true);
    workbook
      .sheet("Sheet1")
      .cell(`G2`)
      .value("Delay")
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
      });
      workbook
        .sheet("Sheet1")
        .cell(`B${row}`)
        .value(item.userName)
        .style("border", true);
      workbook.sheet("Sheet1").cell(`C${row}`).value(item.userId).style({
        leftBorder: true,
        topBorder: true,
        rightBorder: true,
        bottomBorder: true,
      });
      workbook.sheet("Sheet1").cell(`D${row}`).value(item.description).style({
        leftBorder: true,
        topBorder: true,
        rightBorder: true,
        bottomBorder: true,
      });
      let atraso = item.saida - item.saidashift + item.shiftSupposedGracePerior <0? 0: item.saida+ item.shiftSupposedGracePerior - item.saidashift;
      workbook
        .sheet("Sheet1")
        .cell(`E${row}`)
        .value(item.entrada)
        .style("border", true);
      workbook
        .sheet("Sheet1")
        .cell(`F${row}`)
        .value(item.entradashift)
        .style("border", true);

        workbook
        .sheet("Sheet1")
        .cell(`E${row}`)
        .value(item.saida)
        .style("border", true);
      workbook
        .sheet("Sheet1")
        .cell(`F${row}`)
        .value(item.saidashift)
        .style("border", true);



workbook
        .sheet("Sheet1")
        .cell(`F${row}`)
        .value(atraso)
        .style("border", true);
        
      // workbook
      //   .sheet("Sheet1")
      //   .cell(`F${row}`)
      //   .value(item.firstTime?.clockOut)
      //   .style("border", true);
      // workbook
      //   .sheet("Sheet1")
      //   .cell(`G${row}`)
      //   .value(item.firstTime?.clockOutDefault)
      //   .style("border", true);

      // workbook
      //   .sheet("Sheet1")
      //   .cell(`H${row}`)
      //   .value(item.secondTime?.clockInDefault)
      //   .style("border", true);
      // workbook
      //   .sheet("Sheet1")
      //   .cell(`I${row}`)
      //   .value(item.secondTime?.clockIn)
      //   .style("border", true);
      // workbook
      //   .sheet("Sheet1")
      //   .cell(`J${row}`)
      //   .value(item.secondTime?.clockOut)
      //   .style("border", true);
      // workbook
      //   .sheet("Sheet1")
      //   .cell(`K${row}`)
      //   .value(item.secondTime?.clockOutDefault)
      //   .style("border", true);

      // workbook
      //   .sheet("Sheet1")
      //   .cell(`L${row}`)
      //   .value(item.secondTimeOut?.clockInDefault)
      //   .style("border", true);
      // workbook
      //   .sheet("Sheet1")
      //   .cell(`M${row}`)
      //   .value(item.secondOut?.clockIn)
      //   .style("border", true);
      // workbook
      //   .sheet("Sheet1")
      //   .cell(`N${row}`)
      //   .value(item.secondTimeOut?.clockOut)
      //   .style("border", true);
      // workbook
      //   .sheet("Sheet1")
      //   .cell(`O${row}`)
      //   .value(item.secondTimeOut?.clockOutDefault)
      //   .style("border", true);
      // row++;
    });

    // Write to file.
    return workbook.toFileAsync(appRoot + '/content/punchlog.xlsx');
  });
}

function fillPunchCard(items)
{
  XlsxPopulate.fromBlankAsync().then((workbook) => {
    // Modify the workbook.
    let row = 3;

    // workbook.sheet("Sheet1").range("E1:I1").merged(true).style("border", true);

    workbook.sheet("Sheet1").cell(`A2`).value("Date").style("border", true);
    workbook.sheet("Sheet1").cell(`B2`).value("Username").style("border", true);
    workbook.sheet("Sheet1").cell(`C2`).value("Usergroup").style("border", true);
    workbook.sheet("Sheet1").cell(`D2`).value("Device").style("border", true);
    workbook.sheet("Sheet1").cell(`B2`).value("Username").style("border", true);
    workbook.sheet("Sheet1").cell(`B2`).value("Username").style("border", true);

    items.forEach((item) => {
      workbook.sheet("Sheet1").cell(`A${row}`).value(item.userName).style({
        leftBorder: true,
        topBorder: true,
        rightBorder: true,
        bottomBorder: true,
      });

      row++;
    });

    // Write to file.
    return workbook.toFileAsync(appRoot + '/content/punchlog.xlsx'); //(path.  join("../../../../api-biostar/content/punchlog.xlsx"));
  });
}

export default {
  fillPunchDailyDetails,
  fillDataForSimpleSchedule,
  fillPunchLog
};
