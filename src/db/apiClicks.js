import { UAParser } from "ua-parser-js";
import supabase from "./supabase";

//       -------------  apis related to clicks table -------------------

//  ........... getting clicks related to urls based on urls id ...........
//  ...urlIds wll be array of ids [ids]
//  ...from()=table , select("*") = all , in =inside urls_d
export async function getClicksofUrls(urlIds) {
 
  const { data, error } = await supabase.from("clicks").select("*").in("url_id", urlIds);

  if (error) {
    console.log(error.message);
    throw new Error("Unable to load clicks");
  }
  
  return data;
}


//  ..... loading clicks and data relaetd to clicks such as devics ,country etc..
let parser = new UAParser();
// console.log(parser);
export const storeClicks = async ({id, originalUrl}) => {
  try {
    let res = parser.getResult();
    const device = res.type || "desktop";

    const response = await fetch("https://ipapi.co/json");
    const {city, country_name: country} = await response.json();

    const {data, error} = await supabase.from("clicks").insert({
      url_id: id,
      city: city,
      country: country,
      device: device,
    });

    window.location.href = originalUrl;
  } catch (e) {
    console.log("Error  recording clicks = ", e);
  }
};

export async function getClicksforUrl(url_id) {
  const {data, error} = await supabase
    .from("clicks")
    .select("*")
    .eq("url_id", url_id)


  if (error) {
    console.error(error.message);
    throw new Error("Unable to load stats");
  }
  return data;
}

