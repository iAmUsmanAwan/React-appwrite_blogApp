import React, {useId} from 'react'

const Input = React.forwardRef( function Input({      //? hook forwardRef allows us to pass everything to parent component. Passing to child is props.
    //* here we have used React.forwardRef during the decleration of the function but we can also used this while exporting the function like we have done in Select.jsx
    label, 
    type = 'text',
    className= "",
    ...props}, 
    ref){
        const id = useId()
        return (
            <div className='w-full'>
                {label && (
                    <label htmlFor={id}
                    className='inline-block mb-1 pl-1'>
                        {label}
                    </label>
                )}
                <input
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                type={type}
                ref={ref}
                {...props}
                id={id}
                />
            </div>
        )
    })


export default Input