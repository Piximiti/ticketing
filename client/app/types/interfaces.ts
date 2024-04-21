import {
  ButtonHTMLAttributes,
  Dispatch,
  FormEvent,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  MouseEventHandler,
  SetStateAction,
} from "react";

interface IError {
  message: string;
  field?: string;
}

interface IErrorResponse {
  errors: IError[];
}

interface IRequest {
  url: string;
  method: "get" | "post" | "delete" | "put" | "patch";
  body: Object;
  onSuccess?: Function;
}

interface ICurrentUser {
  id: string;
  email: string;
  iat: number;
}

interface ICurrentUserResponse {
  currentUser: ICurrentUser | null;
}

interface ITicket {
  id: string;
  title: string;
  price: number;
  userId: string;
  version: number;
}

interface ITicketResponse {
  tickets: ITicket[] | null;
}

interface IOrder {
  id: string;
  userId: string;
  status: string;
  expiresAt: string;
  ticket: ITicket;
}

interface IOrderResponse {
  orders: IOrder[] | null;
}

interface IPayment {
  id: string;
}

interface IField<T> {
  value: InputHTMLAttributes<HTMLInputElement>["value"];
  setValue: Dispatch<SetStateAction<T>>;
  type: HTMLInputTypeAttribute;
  onBlur?: (event?: FormEvent) => void;
}

interface IButton {
  value: string;
  type: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

interface ILink {
  label: string;
  href: string;
}

type INavigation = Array<ILink | false>;

export type {
  IError,
  IErrorResponse,
  IRequest,
  ICurrentUser,
  ICurrentUserResponse,
  IField,
  IButton,
  ILink,
  INavigation,
  ITicket,
  ITicketResponse,
  IOrder,
  IOrderResponse,
  IPayment,
};
