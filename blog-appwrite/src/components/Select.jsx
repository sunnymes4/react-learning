import React, { useId } from 'react'

function Select({
    options,
    label,
    className = '',
    ...props
}, ref) {
    const id = useId();
    return (
        <div className='w-full'>
            {label && <label htmlFor={id}></label>}
            <select
                id={id}
                ref={ref}
                {...props}
                className={`px-3 py-2 rounded-sm bg-white text-black outline-none
                focus:bg-gray-50 duration-200 w-full border-gray-100 ${className}`}>
                    {
                        options?.map((option) => {
                            <option key={option} value={option}>
                                {option}
                            </option>
                        })
                    }
            </select>
        </div>
    )
}

export default React.forwardRef(Select)
