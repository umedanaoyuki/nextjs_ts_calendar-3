type InputProps = {
  id: string;
  name: string;
  type: string;
  required: boolean;
  placeholder: string;
};

export const Input = ({
  id,
  name,
  type,
  required,
  placeholder,
}: InputProps) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      required={required}
      placeholder={placeholder}
      className="appearance-none rounded-[5px] relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
    />
  );
};
