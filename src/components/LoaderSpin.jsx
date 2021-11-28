import React from 'react'
import Loader from "react-js-loader";

const LoaderSpin = () => {
    return (
        <div style={{position:"fixed", top:'40%', left:"45%", zIndex:'2', opacity:"1 !important"}}>
             <Loader type="box-rectangular" bgColor={"black"} title={"Downloading..."} color={'#FFFFFF'} size={100} />
        </div>
    )
}

export default LoaderSpin;
