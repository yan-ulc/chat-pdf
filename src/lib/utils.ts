 import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function convertToAscii(inputString: string) {

  const asciiString = inputString.replace(/[^\ -~]+/g, '');

  return asciiString;

}4