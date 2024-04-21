import { IErrorResponse } from "@/app/types/interfaces";

export default function Alert({ errors }: IErrorResponse) {
  const renderedErrors = errors.map((error, i) => (
    <li key={i}>{error.message}</li>
  ));

  return (
    <div className="bg-red-100 text-red-800 rounded-md p-3 max-w-2xl">
      <h4 className="text-lg font-bold">Oops...</h4>
      <ul className="flex flex-col gap-0.5 list-disc list-inside">
        {renderedErrors}
      </ul>
    </div>
  );
}
