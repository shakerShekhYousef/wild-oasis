"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth"
import { supabase } from "./supabase";

export async function signInAction() {
    await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
    await signOut({ redirectTo: "/" });
}

export async function updateGuest(formdata) {
    const session = await auth();
    if (!session)
        throw new Error("You must have to be logged in!");

    const nationalID = formdata.get("nationalID");
    const [nationality, countryFlag] = formdata.get("nationality").split("%");

    const updateData = {nationality, countryFlag, nationalID};
    const {data, error} = await supabase.from("guests").update(updateData).eq("email",session.user.email);
    console.log(data);

    if (error) {
        console.error(error);
        throw new Error('Guest could not be updated');
    }

    revalidatePath("/account");

    

}