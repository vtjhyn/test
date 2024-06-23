import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "./components/Input";
import Button from "./components/Button";
import { useState } from "react";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);

      const response = await fetch('http://localhost:3000/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        if (response.status === 409) {
          const errorData = await response.json();
          setErrorMessage(errorData.error || 'Conflict occurred');
        } else {
          throw new Error('Failed to submit form');
        }
      } else {
        setSuccessMessage("Form submitted successfully");
        setErrorMessage("");
        reset();
      }

      setIsLoading(false);
    } catch (error) {
      setErrorMessage("Failed to submit form");
      setSuccessMessage("");
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-slate-100 flex items-center justify-center px-4">
      <div className="min-w-[320px] max-w-[420px] w-full border px-8 py-6 bg-white rounded-xl shadow-md">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {successMessage && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
              {errorMessage}
            </div>
          )}
          <Input
            id="name"
            label="Name"
            register={register}
            errors={errors}
            validationSchema={{
              required: "Name is required",
            }} />
          <Input
            id="identity_number"
            label="Identity"
            register={register}
            errors={errors}
            validationSchema={{
              required: "Identity Number is required",
              pattern: {
                value: /^\d{10}$/,
                message: "Identity must be exactly 10 digits number",
              }
            }}
          />
          <Input
            id="email"
            label="Email"
            type="email"
            register={register}
            errors={errors}
            validationSchema={{
              required: "Email is required",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "email tidak sesuai format",
              },
            }} />
          <Input
            id="date_of_birth"
            label="Date of Birth"
            type="date"
            register={register}
            errors={errors} validationSchema={{
              required: "Date of Birth is required",
              validate: (value) => {
                const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Jakarta' });
                return value <= today || "Date of Birth can't be in the future";
              },
            }} />
          <Button
            label='Submit'
            onClick={() => { }}
            disabled={isLoading}
          />
        </form>
      </div>
    </main>
  )
}

export default App;
