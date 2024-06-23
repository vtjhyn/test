import { FieldErrors, FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    validationSchema?: RegisterOptions;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
    id,
    label,
    type = 'text',
    disabled = false,
    validationSchema,
    register,
    errors,
}) => {
    const errorMessages = {
        required: errors[id]?.message as string,
        pattern: errors[id]?.message as string,
        validate: errors[id]?.message as string,
    };

    return (
        <div className="w-full">
            <label
                htmlFor={id}
                className={`block text-sm font-medium mb-1 ${errors[id] ? 'text-rose-500' : 'text-zinc-700'}`}
            >
                {label}
            </label>
            <div className="w-full relative">
                <input
                    id={id}
                    disabled={disabled}
                    {...register(id, validationSchema)}
                    type={type}
                    className={`peer w-full p-2 font-light bg-white border rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
                        ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
                        ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
                    `}
                />
            </div>
            {errors[id] && (
                <div className="text-xs text-rose-500 text-right mt-1">
                    {errorMessages[errors[id]?.type as keyof typeof errorMessages]}
                </div>
            )}
        </div>
    );
};

export default Input;
