//import mariadb from "./../database/mariadb.js";
import mariadb from "mariadb";
import Excell from "./../services/excel.js";

var timeCardRecord = function (time) {};

var getTimeCardReport = async () => {
  const pool = mariadb.createPool({
    host: process.env.MariaBd_HOST,
    database: process.env.MariaDb_DATABASE,
    user: process.env.MariaDb_USERNAME,
    password: process.env.MariaDb_PASSWORD,
    connectionLimit: 5,
    port: process.env.MariaDb_PORT,
  });

  let conn;
  try {
    conn = await pool.getConnection();
    let rows = await conn.query(`SELECT t.* from T_USR t`);
    rows = rows.map((row) => {
      return {
        Date: row.date,
        Name: row.name,
        UserId: row.user_id,
        Department: "",
        Shift: row.shift_name,
        firstTime: {
          clockInDefault: "7:00:00",
          clockIn: "7:00:00",
          clockOut: "7:00:00",
          timeLate: "00:00:00",
        },
        firstTime: {
          clockInDefault: "7:00:00",
          clockIn: "7:00:00",
          clockOut: "7:00:00",
          timeLate: "00:00:00",
        },
        secondTime: {
          clockInDefault: "7:00:00",
          clockIn: "7:00:00",
          clockOut: "7:00:00",
          timeLate: "00:00:00",
        },
        secondTimeOut: {
          clockInDefault: "7:00:00",
          clockIn: "7:00:00",
          clockOut: "7:00:00",
          timeLate: "00:00:00",
        },
        ...row,
      };
    });

    return rows;
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release(); //release to pool
  }
};

var fillExcell = (rows) => {
  const excell = new Excell();
  excell.fillData(rows);
};

// function MariaDBAdapter() {
//   async function getTimeCardReport() {
//     let conn;
//     try {
//       conn = await pool.getConnection();
//       let rows = await conn.query(`SELECT t.* from T_USR t

//       `);

//       return rows;
//       // rows: [ {val: 1}, meta: ... ]

//       // const res = await conn.query("INSERT INTO myTable value (?, ?)", [
//       //   1,
//       //   "mariadb",
//       // ]);
//       // res: { affectedRows: 1, insertId: 1, warningStatus: 0 }
//     } catch (err) {
//       throw err;
//     } finally {
//       if (conn) conn.release(); //release to pool
//     }
//   }

//   async function search(table, fields, filters) {}

//   return {
//     getTimeCardReport: getTimeCardReport,
//   };

//   const a = pool
//     .getConnection()
//     .then((conn) => {
//       conn
//         .query("SELECT * from viewtimecardreportdetail")
//         .then((rows) => {
//           console.log(rows);
//           // rows: [ {val: 1}, meta: ... ]
//           return rows;
//         })
//         .then((res) => {
//           // res: { affectedRows: 1, insertId: 1, warningStatus: 0 }
//           conn.release(); // release to pool
//           return res;
//         })
//         .catch((err) => {
//           conn.release(); // release to pool
//         });
//     })
//     .catch((err) => {
//       //not connected
//     });

//   return a;
// }

export default { getTimeCardReport, fillExcell };
