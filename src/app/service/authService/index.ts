"use server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

// register user

export const registerUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    // accessToken info
    const result = await res.json();
    console.log("result is: ", result);
    if (result?.success) {
      (await cookies()).set("accessToken", result?.data.accessToken);
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// login user
export const loginUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    // user accessToken info

    const result = await res.json();
    console.log("result is: ", result);
    if (result?.success) {
      (await cookies()).set("accessToken", result?.data.accessToken);
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// current user

export const CurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  let decodedData = null;
  if (accessToken) {
    decodedData = await jwtDecode(accessToken);
    return decodedData;
  } else {
    return null;
  }
};



// logout 

export const logout = async()=>{
  (await cookies()).delete("accessToken")

}


// reCaptcha verification  


//  const reCaptchaTokenVerification = async ( token: string) =>{
// try{
//         const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
//         method: "POST",
//         headers: {
//             "Content-Type" : "application/x-www-urlencoded", 
//         },
//         body: new URLSearchParams({
//             secret: process.env.NEXT_PUBLIC_RECAPTCHA_SERVER_KEY!,
//             response: token
//         }),

//     })

//     return res.json()

// }
// catch(error: any){
//     return Error(error)
// }


// }
 