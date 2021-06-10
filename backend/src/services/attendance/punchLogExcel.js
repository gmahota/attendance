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
    workbook.sheet("Sheet1").cell(`D2`).value("Shift Check-in").style("border", true);

    workbook
      .sheet("Sheet1")
      .cell(`E2`)
      .value("Check-in")
      .style("border", true);
    workbook
      .sheet("Sheet1")
      .cell(`F2`)
      .value("Shift Check-out")
      .style("border", true);
    workbook
      .sheet("Sheet1")
      .cell(`G2`)
      .value("Check-out")
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

    workbook
      .sheet("Sheet1")
      .cell(`K2`)
      .value("User Group")
      .style("border", true);

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

      workbook.sheet("Sheet1").cell(`C${row}`).value(item.description).style({
        leftBorder: true,
        topBorder: true,
        rightBorder: true,
        bottomBorder: true,
      });

      workbook
        .sheet("Sheet1")
        .cell(`D${row}`)
        .value(item.entradashift)
        .style({ border: true, numberFormat: "hh:mm:ss" });
      workbook
        .sheet("Sheet1")
        .cell(`E${row}`)
        .value(item.entrada)
        .style({ border: true, numberFormat: "hh:mm:ss" });

      workbook
        .sheet("Sheet1")
        .cell(`F${row}`)
        .value(item.saidashift)
        .style({ border: true, numberFormat: "hh:mm:ss" });
      workbook
        .sheet("Sheet1")
        .cell(`G${row}`)
        .value(item.saida)
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
        .cell(`J${row}`)
        .value(item.totalDelay)
        .style({ border: true, numberFormat: "hh:mm:ss" });

      workbook
        .sheet("Sheet1")
        .cell(`K${row}`)

        .value(item.userGroupName)
        .style({ border: true });

      row++;
    });

    // Write to file.
    return workbook.toFileAsync(
      appRoot + "/public/uploads/attendance/punchdaily.xlsx"
    );
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
        .style({ border: true, numberFormat: "yyyy-mm-dd hh:mm:ss" });
      workbook
        .sheet("Sheet1")
        .cell(`B${row}`)
        .value(item.userName)
        .style("border", true);
      workbook
        .sheet("Sheet1")
        .cell(`C${row}`)
        .value(item.userGroupName)
        .style("border", true);
      workbook
        .sheet("Sheet1")
        .cell(`D${row}`)
        .value(item.device)//deviceId)
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
        .style({ border: true, numberFormat: "hh:mm:ss" });
      workbook
        .sheet("Sheet1")
        .cell(`H${row}`)
        .value(item.timeOut)
        .style({ border: true, numberFormat: "hh:mm:ss" });

      row++;
    });

    // Write to file.
    return workbook.toFileAsync(
      appRoot + "/public/uploads/attendance/punchlog.xlsx"
    );
  });
}

function fillTotalHours(items) {
  XlsxPopulate.fromBlankAsync().then((workbook) => {
    // Modify the workbook.
    let row = 3;

    workbook
      // .sheet("Sheet1")
      // .cell(`A2`)
      // .value("Date")
      // .style({ leftBorder: true, topBorder: true });

    workbook.sheet("Sheet1").cell(`A2`).value("User").style("border", true);
    workbook.sheet("Sheet1").cell(`B2`).value("User Group").style("border", true);
    workbook.sheet("Sheet1").cell(`C2`).value("Working Days").style("border", true);
    workbook.sheet("Sheet1").cell(`D2`).value("Total Working hours").style("border", true);
    workbook.sheet("Sheet1").cell(`E2`).value("Total Delay hours").style("border", true);


    items.forEach((item) => {

      workbook.sheet("Sheet1").cell(`A${row}`).value(item.userName).style("border", true);
      workbook.sheet("Sheet1").cell(`B${row}`).value(item.userGroup).style("border", true);
      workbook.sheet("Sheet1").cell(`C${row}`).value(item.workingDays).style("border", true);
      workbook.sheet("Sheet1").cell(`D${row}`).value(item.totalWorkingHours).style({"border": true, numberFormat: "hh:mm:ss"}) ;
      workbook.sheet("Sheet1").cell(`E${row}`).value(item.totalDelay).style({"border": true, numberFormat: "hh:mm:ss" });


      row++;


    });

    // Write to file.
    return workbook.toFileAsync(
      appRoot + "/public/uploads/attendance/punchtotal.xlsx"
    );
  });
}

function fillAbsenteeism(items) {
  XlsxPopulate.fromBlankAsync().then((workbook) => {
    // Modify the workbook.
    let row = 3;

    workbook
      // .sheet("Sheet1")
      // .cell(`A2`)
      // .value("Date")
      // .style({ leftBorder: true, topBorder: true });

    workbook.sheet("Sheet1").cell(`A2`).value("User").style("border", true);
    workbook.sheet("Sheet1").cell(`B2`).value("Shift").style("border", true);
    workbook.sheet("Sheet1").cell(`C2`).value("Shift time in").style("border", true);
    workbook.sheet("Sheet1").cell(`D2`).value("Shift time out").style("border", true);
    workbook.sheet("Sheet1").cell(`E2`).value("Day Absent").style("border", true);


    items.forEach((item) => {

      console.log(item)
      workbook.sheet("Sheet1").cell(`A${row}`).value(item.userName).style("border", true);
      workbook.sheet("Sheet1").cell(`B${row}`).value(item.description).style("border", true);
      workbook.sheet("Sheet1").cell(`C${row}`).value(item.entradashift).style({"border":true, numberFormat: "hh:mm:ss"});
      workbook.sheet("Sheet1").cell(`D${row}`).value(item.saidashift).style({"border": true, numberFormat: "hh:mm:ss"}) ;
      workbook.sheet("Sheet1").cell(`E${row}`).value(item.selected_date).style({"border": true, numberFormat: "yyyy-mm-dd" });


      row++;


    });

    // Write to file.
    return workbook.toFileAsync(
      appRoot + "/public/uploads/attendance/punchabsent.xlsx"
    );
  });
}



export default {
  fillPunchDaily,
  fillPunchCard,
  fillTotalHours,
  fillAbsenteeism
};
