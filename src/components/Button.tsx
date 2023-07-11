import Image from "next/image"

type typeProps = {
    title: string
    type: 'button' | 'submit'
    leftIcon?: any | null
    rightIcon?: string | null
    handleClick?: React.MouseEventHandler
    isSubmit?: boolean
    bgColor?: string
    textColor?: string
}

const Button = ({ title, type, leftIcon, rightIcon, handleClick, isSubmit, bgColor, textColor }: typeProps) => {
    return (
        <button
            className={`
            ${isSubmit
                    ? " bg-orange-500"
                    : bgColor ? bgColor : ""}
                    ${textColor ? textColor : ""}
            flex items-center gap-2 text-white bg-black py-3 px-5 rounded-md hover:bg-teal-500 transition-all ease-linear duration-150`}
            type={type || 'button'}
            disabled={isSubmit}
            onClick={handleClick}
        >
            {leftIcon
                &&
                <Image
                    src={leftIcon}
                    alt="left icon"
                    width={14}
                    height={14}
                >
                </Image>
            }

            {title}

            {rightIcon
                &&
                <Image
                    src={rightIcon}
                    alt="right icon"
                    width={14}
                    height={14}
                >
                </Image>
            }
        </button>
    )
}

export default Button