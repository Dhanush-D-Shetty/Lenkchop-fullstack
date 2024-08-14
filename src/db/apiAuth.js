import supabase, { supabaseUrl } from "./supabase";

// ...........   apis for authorization = signup ,login   ......................

//  ........... getting data from the databse based on registerd email and password ...........
export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return data;
}

// .......... getting current user from local-storage using supabase    ...........
export async function getCurrentUser() {
  const { data: currentSession, error } = await supabase.auth.getSession();
  if (!currentSession.session) return null;  // return null if no session(user)
  if (error) throw new Error(error.message);
  return currentSession.session?.user;
}

//   .......... creating the new  user in database   ..................
export async function signUp({ name, email, password, profile_pic }) {

  // ...... storing profile pic in db
  const fileName = `dp-${name.split(" ").join("-")}-${Math.random()}`; // dhaush-d-shetty-0.24
  const { error: storageError } = await supabase.storage
    .from("profile_pic")
    .upload(fileName, profile_pic);
  if (storageError) throw new Error(storageError.message);

  // .... creating new user
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        profile_pic: `${supabaseUrl}/storage/v1/object/public/profile_pic/${fileName}`,
      },
    },
  });
  if (error) throw new Error(error.message);
  return data;
}

// ............   Log Out ...........
export async function logOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
