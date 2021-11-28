import React from 'react'

const Image = (props) => {
    return (
        <>
           <img src={props.imgSrc} alt={props.alt} /> 
        </>
    )
}

export default Image
