declare const buttonVariants: (props?: ({
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare function Button({ className, variant, size, asChild, ...props }: {
    [x: string]: any;
    className: any;
    variant: any;
    size: any;
    asChild?: boolean | undefined;
}): import("react/jsx-runtime").JSX.Element;
export { Button, buttonVariants };
