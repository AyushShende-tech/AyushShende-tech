import React,{useEffect, useState} from 'react';
import './ToDoPage.css'
import { MdDeleteOutline } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";

function TODOPage() {
    const [isCompleteScreen , setIsCompleteScreen] = useState(false);
    const [allToDo,setAllToDo] = useState([]);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [completedToDo, setCompletedToDo] = useState([]);
    const [currentEdit,setCurrentEdit] = useState("");
    const [currentEditedItem,setCurrentEditedItem] = useState("");
    

    const handleAddToDo = () =>{
        let newTodoItem = {
            title: newTitle,
            description: newDescription,
          };
      
          let updatedTodoArr = [...allToDo];
          updatedTodoArr.push (newTodoItem);
          setAllToDo(updatedTodoArr);
          localStorage.setItem('todolist', JSON.stringify (updatedTodoArr));

          setNewTitle("");
          setNewDescription("");
        };

    const handleDeleteToDo = index => {
        let reducedTodo = [...allToDo];
        reducedTodo.splice (index,1);
    
        localStorage.setItem ('todolist', JSON.stringify (reducedTodo));
        setAllToDo (reducedTodo);
      };

    const handleCompleteToDo = index => {
        let now = new Date ();
        let dd = now.getDate ();
        let mm = now.getMonth () + 1;
        let yyyy = now.getFullYear ();
        let h = now.getHours ();
        let m = now.getMinutes ();
        let s = now.getSeconds ();
        let completedOn =
          dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + s;
    
        let filteredItem = { ...allToDo[index],completedOn: completedOn,};
    
        let updatedCompletedArr = [...completedToDo];
        updatedCompletedArr.push (filteredItem);
        setCompletedToDo(updatedCompletedArr);
        handleDeleteToDo(index)
        localStorage.setItem('completedtodolist',JSON.stringify(updatedCompletedArr));

      }

    const handleDeleteCompletedToDo = index => {
        let reducedCompletedTodo = [...completedToDo];
        reducedCompletedTodo.splice (index,1);

        localStorage.setItem('completedtodolist',JSON.stringify(reducedCompletedTodo));
        setCompletedToDo(reducedCompletedTodo);
      }

    useEffect(() => {
        let saved = JSON.parse(localStorage.getItem('todolist'));
        let savedCompleted = JSON.parse(localStorage.getItem('completedtodolist'));
        if(saved){
            setAllToDo(saved);
        }
        if(savedCompleted){
            setCompletedToDo(savedCompleted);
        }
    },[]);

    const handleEdit = (ind,item)=>{
        console.log(ind);
        setCurrentEdit(ind);
        setCurrentEditedItem(item);
      }
    
    const handleUpdateTitle = (value)=>{
        setCurrentEditedItem((prev)=>{
          return {...prev,title:value}
        })
      }
    
    const handleUpdateDescription = (value)=>{
        setCurrentEditedItem((prev)=>{
          return {...prev,description:value}
        })
      }
    
    const handleUpdateToDo = ()=>{
          let newToDo = [...allToDo];
          newToDo[currentEdit] = currentEditedItem;
          setAllToDo(newToDo);
          setCurrentEdit("");
      }

    return (
        <div className="TODOPage">
            <h1> My TODO List</h1>
            <div className="todo-wrapper">
                <div className="todo-input">
                    <div className="todo-input-item">
                        <label>Title</label>
                        <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Enter your task" />
                     </div> 
                     <div className="todo-input-item">
                        <label>Description</label>
                        <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="Write descriptions" />
                     </div> 
                     <div className="todo-input-item">
                        <button type="button" onClick={handleAddToDo} className="primary-btn">Add</button>
                     </div> 
                </div>
                <div className="btn-area">
                    <button type="button" className={`secondary-btn ${isCompleteScreen === false && 'active'}`}
            onClick={() => setIsCompleteScreen (false)}>ToDo</button>
                    <button type="button" className={`secondary-btn ${isCompleteScreen === true && 'active'}`}
            onClick={() => setIsCompleteScreen (true)}>Completed</button>
                </div>
                <div className="todo-list">
                    {isCompleteScreen=== false && allToDo.map((item,index) => {
                        if(currentEdit===index){
                            return (
                                <div className='edit__wrapper' key={index}>
                                <input placeholder='Updated Title' onChange={(e)=>handleUpdateTitle(e.target.value)} value={currentEditedItem.title}  />
                                <textarea placeholder='Updated Title' rows={4} onChange={(e)=>handleUpdateDescription(e.target.value)} value={currentEditedItem.description}  />
                                <button type="button" onClick={handleUpdateToDo} className="primary-btn">Update</button></div> 
                            )
                        }
                        else{
                            return(
                                <div className="todo-list-item" key={index}>
                                <div>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                                </div>
                                <div>
                                <MdDeleteOutline className='icon' onClick={() => handleDeleteToDo(index)} title='delete?'/>
                                <FaCheck className='check-icon' onClick={() => handleCompleteToDo(index)} title='complete?'/>
                                <CiEdit className='check-icon' onClick={() => handleEdit(index,item)} title='edit?'/>
                                </div>  
                            </div>
                            )
                        }
                        
                    })}
                    {isCompleteScreen=== true && completedToDo.map((item,index) => {
                        return(
                            <div className="todo-list-item" key={index}>
                            <div>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                            <p><small>Completed On: {item.completedOn}</small></p>
                            </div>
                            <div>
                            <MdDeleteOutline className='icon' onClick={() => handleDeleteCompletedToDo(index)} title='delete?'/>
                            </div>  
                        </div>
                        )
                    })}
                    
                </div>
            </div>
        </div>

    );
}

export default TODOPage;