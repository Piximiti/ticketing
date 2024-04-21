import { IButton } from "@/app/types/interfaces";

export default function Button({ value, type, onClick }: IButton) {
  return (
    <button
      className="px-2 py-3 bg-blue-400 text-white rounded-lg w-32 hover:bg-blue-500 transition-all duration-300"
      type={type}
      onClick={onClick}
    >
      {value}
    </button>
  );
}
