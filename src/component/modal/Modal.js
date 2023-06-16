import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/esm/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import "./Modal.css";
import { Plus } from 'react-feather'

function ModalDiv({ setShowModal, showModal, refresher  }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('#f9f5eb');
    const [foregroundColor, setForegroundColor] = useState('#fff');
    const [priority, setPriority] = useState('normal');
    const defaultNormal = "(Default)"

    const addHandler=()=>{
        const saveData = JSON.parse(localStorage.getItem('myNotes')) || [];
        if(!title || !content){
            return alert('Title and Content is Required')
        }
        let newData={
            id:new Date().getTime(),
            title: title,
            content:content,
            priority:priority,
            backgroundColor:backgroundColor,
            foregroundColor:foregroundColor,
            date: new Date().toLocaleDateString()
        }
        saveData.push(newData);
        localStorage.setItem('myNotes',JSON.stringify(saveData));
        setTitle("");
        setContent('');
        setBackgroundColor("");
        setForegroundColor("");
        setPriority("");
        setShowModal(false);
        refresher();
    }

    const cancelHandler=()=>{
        setTitle("");
        setContent('');
        setPriority("");
        setShowModal(false);
    }
    const colorHandler=(bg,fg)=>{
        setBackgroundColor(bg);
        setForegroundColor(fg);
    }

    return (
        <>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input value={title} spellCheck="false" className='form-control mb-3' placeholder='Enter Title'  onChange={(e)=> setTitle(e.target.value)} />
                    <label>Priority</label>
                    <select className='form-control mb-3'value={priority} onChange={(e)=> setPriority(e.target.value)}>
                        <option value="normal" selected>Normal {defaultNormal}</option>
                        <option value="high">High</option>
                    </select>
                    <textarea value={content} onChange={(e)=> setContent(e.target.value)} spellCheck="false" className='form-control' style={{ height: "180px" }} placeholder='Enter Notes....'></textarea>
                    <DropdownButton id="dropdown-basic-button" title="Select Theme">
                        <Dropdown.Item href="#/action-1">
                            <div className='d-flex' onClick={()=>colorHandler("#54bab9","#9ed2c6")}  >
                                <div className='circle' style={{ backgroundColor: '#54bab9' }}></div>
                                <div className="circle mx-3" style={{ backgroundColor: '#9ed2c6' }}></div>
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                            <div className='d-flex' onClick={()=>colorHandler('#ffe898','#fff8bc')} >
                                <div className='circle' style={{ backgroundColor: '#ffe898' }}></div>
                                <div className="circle mx-3" style={{ backgroundColor: '#fff8bc' }}></div>
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-3 ">
                            <div className='d-flex' onClick={()=>colorHandler('#afb4ff','#b1b1ff')} >
                                <div className='circle' style={{ backgroundColor: '#afb4ff' }}></div>
                                <div className="circle mx-3" style={{ backgroundColor: '#b1b1ff' }}></div>
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-4">
                            <div className='d-flex' onClick={()=>colorHandler('#f9f5eb','#fff')} >
                                <div className='circle shadow' style={{ backgroundColor: '#f9f5eb' }}></div>
                                <div className="circle mx-3 shadow" style={{ backgroundColor: '#fff' }}></div>Default
                            </div>
                        </Dropdown.Item>
                    </DropdownButton>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelHandler}>
                        Cancel
                    </Button>
                    <Button variant="primary"onClick={addHandler}>
                        <Plus /> Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDiv