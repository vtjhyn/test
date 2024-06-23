import React from 'react';

interface ButtonProps {
  label?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label = "Submit",
  onClick,
  disabled = false,
}) => {
  const baseClasses = "mt-6 relative rounded-lg transition w-full font-semibold border-2 py-2 px-4 text-md";
  const stateClasses = "disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-80";
  const colorClasses = "bg-rose-500 border-rose-500 text-white";

  return (
    <button
      className={`${baseClasses} ${stateClasses} ${colorClasses}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
