import getConfig from "next/config";

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const get_Workschedules = async (filter) => {
  try {
    const url = publicRuntimeConfig.SERVER_URI + "api/attendance/workschedules";

    let res = [];

    await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filter),
    })
      .then((response) => response.json())
      .then((data) => (res = data));

    return res;
  } catch (e) {
    console.error(e);
  }
};

const get_Workschedule = async (id) => {
  try {
    const url =
      publicRuntimeConfig.SERVER_URI + `api/attendance/workschedule/${id}`;

    let res = {};

    await fetch(url)
      .then((response) => response.json())
      .then((data) => (res = data));
      console.log(res)
    return res;
  } catch (e) {
    console.error(e);
  }
};

export default { get_Workschedules, get_Workschedule };
