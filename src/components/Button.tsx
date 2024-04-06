interface Props {
    children: JSX.Element | string
    type?: "button" | "submit" | "reset";
    className?: string
    onClick?: (e: any) => void
}

export default function Button (props: Props) {
    const { children, ...rest } = props;

    return (
        <button 
            className="flex w-full justify-center rounded-md bg-black px-3 py-3 text-sm font-medium leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            {...rest}
        >
            {children}
        </button>
    )
}