import supabase, { supabaseUrl } from "./supabase";

export async function getCabins({ filter, sortBy }) {
  let query = supabase.from("cabins").select("*");
  let method;

  if (filter) {
    if (filter.value === "no-discount") method = "eq";
    if (filter.value === "with-discount") method = "gt";
    query = query[method](filter.field, 0);
  }

  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded.");
  }

  return data;
}

export async function createEditCabin(newCabin, id = null) {
  const hasImagePath = newCabin?.image?.startsWith?.(supabaseUrl);
  //Construct Image path
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //Create/Edit cabin
  let query = supabase.from("cabins");

  //A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //B) EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  //C) Run query
  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Could not add new cabin.");
  }

  if (!hasImagePath) {
    //Upload image
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    //Delete the cabin if there was an error uploading the image
    if (storageError) {
      await supabase.from("cabins").delete().eq("id", data.id);
      throw new Error(
        "Cabin image could not be uploaded. Cabin creation canceled."
      );
    }
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted.");
  }
}
