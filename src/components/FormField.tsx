type typeProps = {
    type?: string;
    title: string;
    state: string;
    placeholder: string;
    isTextArea?: boolean;
    setState: (value: string) => void;
}

const FormField = ({ type, title, state, placeholder, isTextArea, setState }: typeProps) => {
    return (
        <div className="flex items-center justify-start flex-col w-full gap-4">
            <label className="w-full text-black">{title}</label>

            {isTextArea ? (
                <textarea
                    placeholder={placeholder}
                    value={state}
                    className="form_field-input"
                    onChange={(e) => setState(e.target.value)}
                />
            ) : (
                <input
                    type={type || "text"}
                    placeholder={placeholder}
                    required
                    value={state}
                    className="w-full outline-0 bg-slate-100 rounded-xl p-4 "
                    onChange={(e) => setState(e.target.value)}
                />
            )}
        </div>
    )
}

export default FormField;
