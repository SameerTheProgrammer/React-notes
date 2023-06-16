import React, { useEffect, useLayoutEffect, useState } from 'react'
import Navbar from '../component/Navbar';
import ModalDiv from '../component/modal/Modal';
import SingleNotes from '../component/singleNote/SingleNotes.js';
import { Frown } from 'react-feather';


const Home = () => {

  const [data, setData] = useState([]);
  useLayoutEffect(() => {
    setData(JSON.parse(localStorage.getItem('myNotes')) || []);
  }, [])
  const [showModal, setShowModal] = useState(false);
  const refresher = ()=>{
    setData(JSON.parse(localStorage.getItem('myNotes')) || []);
  }

  return (
    <>
      <Navbar setShowModal={setShowModal} showModal={showModal} setData={setData}  data={data} refresher={refresher} />
      {showModal &&
        <ModalDiv refresher={refresher} setShowModal={setShowModal} showModal={showModal} />
      }


      <div className='row justify-content-between mx-0 p-5'>
        {!data.length?
          <h2 className='text-center display-1 fw-light text-seconday my-5'>
            <Frown size={100}/> No Notes. Create New Note
          </h2>
          :
          data.map((item,index)=>{
            return <SingleNotes refresher={refresher} key={item.id} item={item} />
          })
        }
      </div>
    </>
  )
}

export default Home