import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import jwt from "jwt-simple";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
};

export function encodeData(data: any) {
  try {
    const encodedData = jwt.encode(data, process.env.AUTH_SECRET!);
    return encodedData;
  } catch (error) {
    return null;
  }
};

export function decodeData(token: string) {
  try {
    const decodedData = jwt.decode(token, process.env.AUTH_SECRET!);
    return decodedData;
  } catch (error) {
    return null;
  }
};
