import React from 'react'

const Dropdown = ({ label, options }) => {
    return (
        <div className='dropdown'>
            <p>{label}: </p>
            <select>
                {options?.map((item, index) => (
                    <option key={index} value={item?.value}>{item?.name}</option>
                ))}
            </select>
        </div>
    )
}

export default Dropdown
