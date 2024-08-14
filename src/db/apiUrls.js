import {UAParser} from "ua-parser-js";
import supabase, {supabaseUrl} from "./supabase";

//        .........   apis related to urls table   ...............

//  ........... getting all the urls from the url based on user_id ...........
//  ...from("urls")=table urls, select("*") = all, eq =equal to user_id
export async function getUrls(userId) {
  const {data, error} = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error(error.message);
    throw new Error("Unable to load URLs");
  }
  return data;
}

//  .....   deleteng the urlData from the table
export async function deleteUrl(id) {
  const {data, error} = await supabase.from("urls").delete().eq("id", id);

  if (error) {
    console.error(error.message);
    throw new Error("Unable to delete URLs");
  }
  return data;
}

//  ...... creating the url data in the table
export async function createUrl({title, longUrl, CustomUrl, user_id}, qrCode) {
  // ...... storing qrdata in db
  const shortUrl = Math.random().toString(36).substring(2, 6);
  const fileName = `qr-${shortUrl}`;

  const {error: storageError} = await supabase.storage
    .from("Qr")
    .upload(fileName, qrCode);
  if (storageError) throw new Error(storageError.message);

  const qr = `${supabaseUrl}/storage/v1/object/public/Qr/${fileName}`;
  // https://zskoiuiqvcduspoqnrmp.supabase.co/storage/v1/object/public/Qr/qr-lnts
  // ........ inserting url to the tables
  const {data, error} = await supabase
    .from("urls")
    .insert([
      {
        title,
        original_url: longUrl,
        custom_url: CustomUrl,
        user_id,
        short_url: shortUrl,
        qr,
      },
    ])
    .select();

  if (error) {
    Console.log(error.message);
    throw new Error("error creating url");
  }
  return data;
}

// . .........  redirceting page data
export async function getLongUrl(id) {
  const {data, error} = await supabase
    .from("urls")
    .select("id,original_url") // selct id and original-url from table
    .or(`short_url.eq.${id},custom_url.eq.${id}`) // compare id with short url or custom_url
    .single(); // return single row

  if (error) {
    console.error(error.message);
    throw new Error("eroor fetchng short link");
  }
  return data;
}

// getting single url data
export async function getUrl({id, user_id}) {
  const {data, error} = await supabase
    .from("urls")
    .select("*")
    .eq("id", id)
    .eq("user_id", user_id)
    .single(); // return single row

  if (error) {
    console.error(error.message);
    throw new Error("short url not found");
  }
  return data;
}
