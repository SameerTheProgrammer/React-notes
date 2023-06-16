import React, { useState } from 'react';
import './SingleNotes.css';
import { Rating } from 'react-simple-star-rating'
import Button from 'react-bootstrap/esm/Button';
import { Check, PenTool, Trash, Trash2 } from 'react-feather';

const SingleNotes = ({ item,refresher }) => {
    let savedData = JSON.parse(localStorage.getItem('myNotes') || [])
    const [rating, setRating] = useState(item.priority === 'high' ? 100 : 0);
    const [edit, setEdit] = useState(false);
    const [content, setContent] = useState(item.content);


    const deleteNoteHandler = () => {
        const pass = window.confirm('Are sure you want to delete this notes');
        if (!pass) {
            return
        }
        if (savedData.length) {
            let newData = savedData.filter((ele) => ele.id !== item.id);
            localStorage.setItem('myNotes', JSON.stringify(newData));
        }
        refresher()
    }
    const editNoteHandler = () => {
        let index = savedData.findIndex((ind) => ind.id === item.id)
        savedData[index].content = content;
        localStorage.setItem('myNotes', JSON.stringify(savedData))
        setEdit(false)
        refresher();
    }


    return (
        <div className='px-2 col-lg-3 col-md-4 col-sm-6 h-100 mb-5'>
            <div className='card shadow px-2' style={{ backgroundColor: `${item.backgroundColor}` }}>
                <div className='title-div w-100 text-center'>
                    <div className="priority text-center text-light shadow">
                        <p className="text-light fw-normal fw-light mb-0">Priority</p>
                        {rating === 100 ?
                            <p className="fw-bold text-warning">High</p>
                            :
                            <p className="fw-bold text-warning">Normal</p>
                        }
                    </div>
                    <h2 className="fw-light">{item.title}</h2>
                </div>
                <div className="content">
                    <textarea className='form-control'
                        disabled={!edit}
                        spellCheck='false'
                        value={content}
                        onChange={(e) => {
                            setContent(e.target.value)
                        }}
                        style={{
                            backgroundColor: `${item.foregroundColor}`
                        }}>
                        {item.content}
                    </textarea>
                    <section className='d-flex justify-content-between my-2'>
                        {!edit ?
                            <button className='btn btn-outline-warning btn-sm shadow' onClick={() => setEdit(true)}><PenTool /></button>
                            :
                            <button className='btn btn-outline-primary btn-sm shadow' onClick={editNoteHandler}><Check /></button>
                        }

                        <button onClick={deleteNoteHandler} className='btn btn-outline-danger btn-sm shadow'><Trash /></button>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default SingleNotes