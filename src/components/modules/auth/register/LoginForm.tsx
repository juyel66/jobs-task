"use client";

import ReCAPTCHA from "react-google-recaptcha";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { CurrentUser, loginUser } from "@/app/service/authService";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginForm = () => {
  const {setUser} = useUser()
  
  const [recaptchaStatus, setReCaptchaStatus] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("Form Values:", data);
    try {
      const res = await loginUser(data);

      if (res?.success) {
        const user = await CurrentUser()
        
        setUser(user);
       
        toast.success(res?.message);
        router.push("/");
      } else {
        toast.error(res?.message || "login failed");
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  // const handleRecaptcha = async(value: string | null) =>{
  //    console.log(value);
  //    try{
  //     const res  = await reCaptchaTokenVerification(value!);
  //     if (res?.success){
  //       setReCaptchaStatus(true)
  //     }

  //    }
  //    catch (error: any){
  //     console.error(error);

  //    }
  // }

  return (
    <div className="w-md mx-auto mt-10 p-6 border rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter a secure password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}

          {/* <div className=" flex my-3  w-full " >
            <ReCAPTCHA className="mx-auto"  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY as string}
    onChange={handleRecaptcha}> </ReCAPTCHA>
          </div>   */}
          <div className=" flex my-3  w-full ">
            <ReCAPTCHA
              className="mx-auto"
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY as string}
            >
              {" "}
            </ReCAPTCHA>
          </div>
          <Button type="submit" className="w-full">
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>

          <p>
            Do not have any account please
            <Link href="/register" className="link text-blue-600">
              {" "}
              Register
            </Link>{" "}
          </p>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
