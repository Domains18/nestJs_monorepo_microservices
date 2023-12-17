// Importing necessary modules
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Function `cn` is a utility function that combines the functionality of `clsx` and `twMerge`.
// `clsx` is used to concatenate and deduplicate class names.
// `twMerge` is used to merge Tailwind CSS classes.
// The function takes an array of class values as input.
export function cn(...inputs: ClassValue[]) {
  // `clsx` is called with the input array, and the result is passed to `twMerge`.
  // The result is a string of merged and deduplicated class names.
  return twMerge(clsx(inputs))
}

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "KSh",
})
