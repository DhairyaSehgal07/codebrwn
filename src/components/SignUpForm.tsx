"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { schema } from "@/app/actions/auth/sign-up/formSchema";
import { onSubmitAction } from "@/app/actions/auth/sign-up";
import Link from "next/link";
import Loader from "./common/Loader";
import { outfit, roboto, fira_mono } from "@/app/fonts";
import { Fira_Mono } from "next/font/google";
const fira_mono500 = Fira_Mono({ weight: "500", subsets: ["latin"] });
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const [state, setState] = useState<{
    message: string;
    issues?: string[];
  }>({ message: "" });
  const form = useForm<z.output<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      notifications: false,
    },
  });

  const router = useRouter();
  const { handleSubmit, formState } = form;
  const { isSubmitting } = formState;

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (data: any) => {
    const result = await onSubmitAction(data);
    if (!result.issues) {
      form.reset();
      toast.success("Sign up successful ");
      router.push("/");
    }
    setState(result);
  };

  return (
    <>
      {isSubmitting ? (
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <Form {...form}>
          {state?.issues && (
            <div className="text-red-500">
              <ul>
                {state.issues.map((issue) => (
                  <li key={issue} className="flex gap-1">
                    <X fill="red" />
                    {issue}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <form
            onSubmit={handleSubmit(onSubmit)}
            ref={formRef}
            className="space-y-8"
          >
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className={`${outfit.className} text-base leading-[19.2px] text-[#828282]`}
                    >
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={`${roboto.className} focus:outline-hidden border-b-[0.6px] border-[#828282] px-1 py-[6px] text-base`}
                        aria-label="First name input field"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="mt-8">
                    <FormLabel
                      className={`${outfit.className} text-base leading-[19.2px] text-[#828282]`}
                    >
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={`${roboto.className} focus:outline-hidden border-b-[0.6px] border-[#828282] px-1 py-[6px] text-base`}
                        aria-label="Last name input field"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mt-8">
                    <FormLabel
                      className={`${outfit.className} text-base leading-[19.2px] text-[#828282]`}
                    >
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={`${roboto.className} focus:outline-hidden border-b-[0.6px] border-[#828282] px-1 py-[6px] text-base`}
                        aria-label="email input field"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mt-8">
                    <FormLabel
                      className={`${outfit.className} text-base leading-[19.2px] text-[#828282]`}
                    >
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={`${roboto.className} focus:outline-hidden border-b-[0.6px] border-[#828282] px-1 py-[6px] text-base text-gray-700`}
                        aria-label="password input field"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notifications"
                render={({ field }) => (
                  <FormItem className="mt-8 w-full">
                    <div className="flex items-start gap-2">
                      <FormControl>
                        <input
                          className="mt-[2px]"
                          type="checkbox"
                          checked={field.value}
                          onChange={field.onChange}
                          ref={field.ref}
                        />
                      </FormControl>
                      <FormLabel
                        className={`${fira_mono500.className} text-xs leading-[19.2px] text-[#828282]`}
                      >
                        I want to receive email notifications
                      </FormLabel>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-11 flex flex-col items-center justify-center">
              <span className="text-center">
                <p
                  className={`${fira_mono.className} text-base font-bold leading-[19.2px]`}
                >
                  Already have an account?{" "}
                  <Link className="underline" href="/auth/sign-in">
                    Sign In
                  </Link>
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
        </Form>
      )}
    </>
  );
};

export default SignUpForm;
