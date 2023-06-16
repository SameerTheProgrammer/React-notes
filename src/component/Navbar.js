
import { useState } from 'react'
import {Search,Plus,Trash2, RefreshCcw} from 'react-feather'

const Navbar = ({setShowModal, setData, data, refresher}) => {
    const [searchValue, setSearchValue] = useState('')

    const deleteAll=()=>{
        const pass = window.confirm('Are sure you want to delete all your notes');
        if (!pass) {
            return
        }
        localStorage.removeItem('myNotes')
        refresher();
    }
    const sorter=(value)=>{
        if(value === 'latest') {
            data.sort((a,b)=> b.id - a.id)
        }
        if(value === 'oldest') {
            data.sort((a,b)=> a.id - b.id)
        }
        if(value === 'high') {
            data.sort((a,b)=>a.priority.localeCompare(b.priority))
        }
        if(value === 'normal') {
            data.sort((a,b)=>b.priority.localeCompare(a.priority))
        }
        setData([...data])
    }

    const searchHandler=(e)=>{
        e.preventDefault()
        let newData;
        if(searchValue){
            newData = data.filter((ele)=>ele.title.toLowerCase().includes(searchValue.toLowerCase()))
            setData([...newData])
        }else(
            refresher()
        )
    }
    
    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" >My Notes</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item dropdown my-3">
                            <a className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Sort By:
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" onClick={()=>sorter('latest')} >Latest first</a></li>
                                <li><a className="dropdown-item" onClick={()=>sorter('oldest')} >Oldest first</a></li>
                                <li><a className="dropdown-item" onClick={()=>sorter('high')} >Priority high</a></li>
                                <li><a className="dropdown-item" onClick={()=>sorter('normal')} >Priority normal</a></li>
                            </ul>
                        </li>
                        <li className="nav-item mx-2">
                            <button onClick={()=>setShowModal(true)} className="nav-link btn btn-sm btn-info text-light px-2 my-3 "><Plus/>Add new</button>
                        </li>
                        <li className="nav-item mx-2">
                            <button onClick={deleteAll} className="nav-link btn btn-sm btn-danger text-light px-2 my-3"><Trash2/>Delete All</button>
                        </li>
                    </ul>
                    <form className="d-flex" role="search" onSubmit={searchHandler}>
                        <input className="form-control me-2" type="search" placeholder="Search the title of note" aria-label="Search" onChange={(e)=>setSearchValue(e.target.value)} />
                        <button className="btn btn-outline-success" type="submit">{searchValue?<Search/>:<RefreshCcw/>}</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Navbar