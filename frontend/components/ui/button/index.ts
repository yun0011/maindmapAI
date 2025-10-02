import { cva, type VariantProps } from "class-variance-authority";

export { default as Button } from "./Button.vue";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        squareBlue: "bg-blue-700 text-white hover:bg-blue-600/90 rounded-none", // 파란네모
        squareWhite: "bg-white text-gray-900 hover:border-gray-900 border border-gray-200 rounded-none", // 흰색 네모
        roundedBlue: "bg-blue-700 text-white hover:bg-blue-600/90 rounded-full", // 파란라운드
        roundedWhite: "bg-white text-gray-900 hover:border-gray-900 border border-gray-200 rounded-full", // 흰색 라운드
        roundedBlack: "bg-gray-900 text-white hover:bg-gray-900/80 rounded-full", // 검은색 라운드
        roundedGray: "bg-gray-500 text-white hover:bg-gray-900 rounded-full", // 회색 라운드
        circleWhite: "bg-white text-gray-900 hover:border-gray-900 border border-gray-200 rounded-full p-2", // 흰색 동그라미
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-16 px-8 py-4",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
