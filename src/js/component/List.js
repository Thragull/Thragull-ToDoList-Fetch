import React, {useState, useEffect} from 'react'

const List = () => {

    // Logic
    const [list, updateList] = useState([]);
    const [toDo, setToDo] = useState("")

    const addTask = (event, toDo)=>{
      if ((event.key === "Enter") && (toDo !== "")) {
      let newItemToAdd = {
        done: false,
        label: toDo
      }
      setToDo("");
      let auxList = list
      auxList.push(newItemToAdd)
      return auxList;
    }}

    // API

    // Variables

    const urlApiToDo = "https://playground.4geeks.com/apis/fake/todos/user/Thragull"

    // POST

    useEffect(() => {
      fetch(urlApiToDo, {
        method: "POST",
        body: JSON.stringify([]),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((response)=>{
      return response.json()
      })
      .then((data)=>{console.log(data)})
      .catch((err)=>{return err})
    }, [])

    // GET

    useEffect(() => {
      fetch(urlApiToDo)
	    .then((response)=>{
		  return response.json()
	    })
	    .then((data)=>{updateList(data)})
	    .catch((err)=>{return err})
    }, [list])


    const update = (taskList) => {
      fetch(urlApiToDo, {
        method: "PUT",
        body: JSON.stringify(taskList),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response)=>{return response.json()})
      .then((data)=>{console.log(data) 
                     updateList(taskList)})
      .catch((err)=>{err})
    }

    const deleteByIndex = (indexToDelete) => {
      return list.filter((element, index) => index !== indexToDelete);
    }

    const deleteAll = () => {
      return [];
    }
    // PUT
    // Update
    /*const update = (item) => {
      fetch(urlApiToDo, {
        method: "PUT",
        body: JSON.stringify([...list, item]),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response)=>{return response.json()})
      .then((data)=>{updateList([...list, item])})
      .catch((err)=>{err})
    }
    // Delete
    const deleteTask = (indexToDelete) =>{
      fetch(urlApiToDo, {
        method: "PUT",
        body: JSON.stringify(list.filter((element, index) => index !== indexToDelete)),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response)=>{return response.json()})
      .then((data)=>{updateList(list.filter((element, index) => index !== indexToDelete))})
      .catch((err)=>{err})
    }
    // Delete All
    const deleteAll = () =>{
      fetch(urlApiToDo, {
        method: "PUT",
        body: JSON.stringify([]),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response)=>{return response.json()})
      .then((data)=>{updateList([])})
      .catch((err)=>{err})
    }*/
  

  return (
    <div className='container justify-content-center mt-5 w-50'>
      <div className='input-group mb-5'>
          <span className='input-group-text '>What do you have to do.</span>
          <input className='form-control' id="toDo" placeholder='What needs to be done?' value={toDo}
                  onChange={(element) => {
                      setToDo(element.target.value);
                    }
                  }
                  onKeyDown={(event) =>{
                      update(addTask(event, toDo));
                    }
                  }
          /> 
      </div>
      <ul className='list-group rounded-4'>
        {list.map((element, index)=> <li key={index} className='list-group-item d-flex p-0 ps-2 bg-secondary'>
                                                <div className='text my-auto py-2'>{element.label}</div>
                                                <i className="fa fa-trash trash bg-danger px-3 py-3 ms-auto text-white"
                                                onClick={(event) => update(deleteByIndex(index))}></i>
                                      </li> )}
      </ul>
      <p className='text-start ms-2 text-secondary'>{list.length} items remaining.</p>
      <button className='btn btn-danger'  >Delete All Items</button>
    </div>
  )
}

export default List