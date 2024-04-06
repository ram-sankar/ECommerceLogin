interface Props {
    value: any
    label?: string
    key: string
    type?: string
    onChange?: (e: any) => void
}

export default function Input (props: Props) {

    return (
        <div>
            <label htmlFor={props.key} className="font-normal text-base leading-6 text-left">{props.label}</label>
            <div className="mt-2">
                <input 
                    id={props.key} name={props.key} autoComplete={props.key} type={props.type} required placeholder="Enter"
                    className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-500  ring-1 ring-gray-300 placeholder:text-gray-400"
                    value={props.value}
                    onChange={props.onChange}
                />
            </div>
        </div>
    )
}