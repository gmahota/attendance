var attandance = {
  TimeCardRepor: {
    date: row.date,
    name: row.name,
    userId: row.user_id,
    department: "",
    shift: row.shift_name,
    firstTime: {
      clockInDefault: "7:00:00",
      clockIn: "7:00:00",
      clockOut: "7:00:00",
      timeLate: "00:00:00",
      clockOutDefault: "7:00:00",
    },
  },
};
