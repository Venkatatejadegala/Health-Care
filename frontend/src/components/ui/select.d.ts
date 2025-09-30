import * as React from "react";
declare function Select({ ...props }: {
    [x: string]: any;
}): import("react/jsx-runtime").JSX.Element;
declare function SelectGroup({ ...props }: {
    [x: string]: any;
}): import("react/jsx-runtime").JSX.Element;
declare function SelectValue({ ...props }: {
    [x: string]: any;
}): import("react/jsx-runtime").JSX.Element;
declare function SelectTrigger({ className, size, children, ...props }: {
    [x: string]: any;
    className: any;
    size?: string | undefined;
    children: any;
}): import("react/jsx-runtime").JSX.Element;
declare function SelectContent({ className, children, position, ...props }: {
    [x: string]: any;
    className: any;
    children: any;
    position?: "popper" | "item-aligned" | undefined;
}): import("react/jsx-runtime").JSX.Element;
declare function SelectLabel({ className, ...props }: {
    [x: string]: any;
    className: any;
}): import("react/jsx-runtime").JSX.Element;
declare function SelectItem({ value, className, children, ...props }: {
    value: string;
    className?: string;
    children: React.ReactNode;
    [key: string]: any;
}): import("react/jsx-runtime").JSX.Element;
declare function SelectSeparator({ className, ...props }: {
    [x: string]: any;
    className: any;
}): import("react/jsx-runtime").JSX.Element;
declare function SelectScrollUpButton({ className, ...props }: {
    [x: string]: any;
    className: any;
}): import("react/jsx-runtime").JSX.Element;
declare function SelectScrollDownButton({ className, ...props }: {
    [x: string]: any;
    className: any;
}): import("react/jsx-runtime").JSX.Element;
export { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue, };
