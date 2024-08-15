"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { outfit } from "@/app/fonts";
import Link from "next/link";
import { Fira_Mono } from "next/font/google";
import { fira_mono } from "@/app/fonts";

// Define Zod schema
const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(5, "Password must be at least 5 characters long")
    .max(40, "Password must be no more than 40 characters long"),
  notifications: z.boolean().optional(), // Checkbox is optional
});

// Type for form data
type FormData = z.infer<typeof schema>;

const fira_mono500 = Fira_Mono({ weight: "500", subsets: ["latin"] });

const SignUpScreen = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label
          className={`${outfit.className} text-base leading-[19.2px] text-[#828282]`}
          htmlFor="firstName"
        >
          First Name
        </label>
        <input
          className="border-b-[0.6px] border-[#828282]"
          type="text"
          id="firstName"
          {...register("firstName")}
          aria-label="First name input field"
        />
        {errors.firstName && (
          <p className="text-red-500">{errors.firstName.message}</p>
        )}

        <label
          className={`${outfit.className} mt-8 text-base leading-[19.2px] text-[#828282]`}
          htmlFor="lastName"
        >
          Last Name
        </label>
        <input
          className="border-b-[0.6px] border-[#828282]"
          type="text"
          id="lastName"
          {...register("lastName")}
          aria-label="Last name input field"
        />
        {errors.lastName && (
          <p className="text-red-500">{errors.lastName.message}</p>
        )}

        <label
          className={`${outfit.className} mt-8 text-base leading-[19.2px] text-[#828282]`}
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="border-b-[0.6px] border-[#828282]"
          type="email"
          id="email"
          {...register("email")}
          aria-label="Email address input field"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <label
          className={`${outfit.className} mt-8 text-base leading-[19.2px] text-[#828282]`}
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="border-b-[0.6px] border-[#828282]"
          type="password"
          id="password"
          {...register("password")}
          aria-label="Password input field"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <div className="mt-8 flex items-center">
          <input
            type="checkbox"
            id="notifications"
            {...register("notifications")}
            className="mr-2"
          />
          <label
            className={`${outfit.className} text-base leading-[19.2px] text-[#828282]`}
            htmlFor="notifications"
          >
            I want to get email notifications
          </label>
        </div>

        <div className="mt-11 flex flex-col items-center justify-center">
          <span className="text-center">
            <p
              className={`${fira_mono.className} text-base font-bold leading-[19.2px]`}
            >
              Already have an account? <Link href="/auth/sign-in">Sign In</Link>
            </p>

            <button
              className="mt-8 w-full border-[1.18px] border-black py-[14px]"
              type="submit"
            >
              <span
                className={`${fira_mono.className} text-[12px] leading-[14.4px]`}
              >
                SIGN UP
              </span>
            </button>
          </span>
        </div>
      </form>
    </>
  );
};

export default SignUpScreen;
