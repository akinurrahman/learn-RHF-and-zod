"use client";
import { loginSchema, LoginSchemaType } from "@/validations/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import InputField from "@/components/InputField";

const Page = () => {
  const methods = useForm<LoginSchemaType>({
    mode: "onTouched",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: ""
    },
    
  });

  const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Wrapping form with FormProvider */}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

          {/* Reusable InputField for Username/Email */}
          <InputField
            label="Username or Email"
            type="text"
            placeholder="username/email"
            name="identifier"
          />

          {/* Reusable InputField for Password */}
          <InputField
            label="Password"
            type="password"
            placeholder="********"
            name="password"
          />

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white w-full">
              Sign In
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Page;
