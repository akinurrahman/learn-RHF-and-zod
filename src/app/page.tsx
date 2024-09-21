"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";



const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

type FormInputs = z.infer<typeof schema>

const MyForm = () => {
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<FormInputs>({

    resolver: zodResolver(schema)
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 5000))
      console.log(data)
    } catch (error) {
      // Handle any errors
    }
    setError("root", {
      message: "The email already exists"
    })
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-lg font-bold mb-4">Login</h2>

        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Enter your email"
          />
          {errors?.email && <div className="text-red-500">{errors?.email?.message}</div>}
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            id="password"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Enter your password"
          />
          {errors?.password && <div className="text-red-500">{errors?.password?.message}</div>}
        </div>

        {/* Submit Button */}
        <button
          disabled={isSubmitting}
          type="submit"
          className={`${isSubmitting ? "bg-blue-300" : "bg-blue-600"} w-full text-white py-2 rounded hover:bg-blue-700 transition`}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>

        {/* Display root error */}
        <div className="text-red-500">{errors?.root?.message}</div>
      </form>
    </div>
  );
};

export default MyForm;
