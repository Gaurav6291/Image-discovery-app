import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Image from './Image';
import styles from './DisplayImage.module.css';
import { FiDownload } from 'react-icons/fi';
import { AiOutlineHeart } from 'react-icons/ai'
import { saveAs } from "file-saver";
import LoaderSpin from './LoaderSpin';
import Modal from 'react-modal';


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: "5px solid black",
      padding: "none",
      overflow: "none",
    },
  };

const Api = ({dark}) => {
    const [showImg, setShowImg] = useState([]);
    const [change, setChange] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [modalImg, setModalImg] = useState(null);
  

    // console.log(isDarkMode);
    useEffect(()=>{     
        getData();
    }, []);

    function getData(){
        setIsLoading(true);
    axios.get('https://api.unsplash.com/photos?client_id=1TYM-NWXQ8aYaBfhR2c8tQKvpdLCrLMGAbcCgo_eqEA')
    .then((data)=>{
        console.log(data.data);
        setShowImg(data.data);
        setIsLoading(false)
    })
    .catch((err)=>console.log(err));
}

const handleSearchResult = (query) => {
    setIsLoading(true);
    setChange('');
    if(query==='' || query=== undefined){
        getData();
        return;
    }
    axios.get(`https://api.unsplash.com/search/photos?query=${query}&client_id=1TYM-NWXQ8aYaBfhR2c8tQKvpdLCrLMGAbcCgo_eqEA`)
    .then((data)=>{
        if(data.data.results.length===0){
            alert('No Images available there for this query');
        }else{
        console.log(data);
        setShowImg(data.data.results);
        }
        setIsLoading(false);
    })
    .catch((err)=>console.log(err));
    
}

const saveFile = (link, i) => {
    console.log(isLoading);
    setIsLoading(true);
    console.log(isLoading);
    setTimeout(()=>{       
        saveAs(
            link,
            `img${i}.jpg`
            )
            setIsLoading(false);
            console.log(isLoading);
        },8000)  
   
  };


    return (
        <>
        {isLoading? <LoaderSpin /> : null}
    
        <Modal
        contentLabel="Image preview"
        isOpen={!!modalImg}
        style={customStyles} 
        onRequestClose={()=>{setModalImg(null)}}
        >
            <img style={{width:'500px', height:'400px'}} src={modalImg} alt="preview" />
        </Modal>
        <div style={{opacity:isLoading?"0.5":1}}>
            <h1 onClick={getData}>Finmo - Image Discovery App</h1>
            <div className={styles.topBox}>
                <input type="text" value={change} onChange={(e)=>setChange(e.target.value)} />
                <button onClick={()=>handleSearchResult(change)}>Search</button>
            </div>
            
            <div className={styles.mainContainer}>
            {showImg.map((img, index)=>(
                
               
                    <div onClick={()=>setModalImg(img.urls.thumb)} className={styles.imgDiv} key={index}>
                        <Image imgSrc={img.urls.thumb} alt={img.alt_description} />
                        <div className={styles.downloadBtn}>
                        <FiDownload style={{display:"block", margin:'auto',  color:dark?'black':'black'}} onClick={()=>saveFile(img.links.download, index)} />
                        
                        </div>
                        <div className={styles.likeBtn} style={{color:dark?'black':'black'}}>
                        <AiOutlineHeart fill="red" />{img.likes}
                        </div>
                    </div>
                
            ))}
            </div>
        </div>
        </>
    )
}

export default Api
