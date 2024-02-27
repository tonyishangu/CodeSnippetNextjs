"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { redirect } from "next/navigation";

// edit a snippet
export async function snippetEdit(id: number, code: string) {
  await db.snippet.update({
    where: { id },
    data: {
      code,
    },
  });
  revalidatePath(`/snippets/${id}`)
  redirect(`/snippets/${id}`);
}

// delete snippet
export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: { id },
  });
  revalidatePath('/')
  redirect(`/`);
}

export async function create(
  formState: { message: string },
  formData: FormData
) {
  try {
    //  check if the input is valid
    const title = formData.get("title") as string;
    const code = formData.get("code") as string;

    if (typeof title !== "string" || title.length < 3)
      return {
        message: "Title must be longer",
      };
    if (typeof code !== "string" || code.length < 5)
      return {
        message: "Code must be longer",
      };

    // create a new record in the database
    await db.snippet.create({
      data: {
        title,
        code,
      },
    });

    // throw new Error('Oopsy Daisy I hurt you again')

  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        message: err.message,
      };
    } else {
      return {
        message: "Something went wrong...",
      };
    }
  }
  
  revalidatePath('/')
  // redirect to home page
  redirect("/");
}
