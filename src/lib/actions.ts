// "use server";

// import { auth } from "@/lib/auth";
// import { APIError } from "better-auth/api";
// import { redirect } from "next/navigation";

// export async function signUpAction(formData: FormData) {
//     const rawFormData = {
//         email: formData.get("email") as string,
//         password: formData.get("pwd") as string,
//         firstName: formData.get("firstName") as string,
//         lastName: formData.get("lastName") as string,
//         phone: formData.get("phone") as string,
//     };
//     const {email, password, firstName, lastName} = rawFormData;

//     try {
//         await auth.api.signUpEmail({
//             body: {
//                 name: `${firstName} ${lastName}`,
//                 email,
//                 password,
//             },
//         });
//     } catch (error) {
//     //     if (error instanceof APIError) {
//     //         switch(error.status) {
//     //             case "UNPROCESSABLE_ENTITY":
//     //                 return {error: "Email already in use"};
//     //             case "BAD_REQUEST":
//     //                 return {error: "Invalid email"};
//     //             default:
//     //                 return {error: "Something went wrong"};

//     //         }
//     //     }

//     // }}
// console.error('Sign up with email and password has not worked', error);

// redirect("/");
//     }
// }