import { IField } from "@/app/types/interfaces";

export default function Input<T>({ value, setValue, type, onBlur }: IField<T>) {
  return (
    <input
      className="py-1 px-2 w-96 border border-gray-300 bg-white rounded-lg text-gray-600 focus:outline-none focus:ring-1 focus:ring-slate-300"
      type={type}
      value={value}
      onBlur={onBlur}
      onChange={(e) => setValue(e.target.value as T)}
    />
  );
}
