import { keyboard } from "@testing-library/user-event/dist/keyboard";
import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Madhav",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sharma",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Akbar",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App(){
  const[items , setItems] = useState(initialFriends);
  const[showAddFriend , setShowAddFriend]= useState(false)
  const[selectedFriend, setSelectedFriend] = useState(null);

  function handleSelectedFriend(selectedFriend){
    //setSelectedFriend(selectedFriend)
    setSelectedFriend(curr=>curr?.id === selectedFriend.id ? null : selectedFriend)
    setShowAddFriend(false)
  }
  function handleShowFriend(){
    setShowAddFriend(showAddFriend=>!showAddFriend)
  }

  function handleAddFriend(item){
    setItems(items=>[...items , item])
    setShowAddFriend(false)
  }

  function handleSplitbill(value){
   setItems(items => items.map(item=> item.id === selectedFriend.id ? {...item , balance:item.balance+value} : item ))
   setSelectedFriend(null)
  }
  return(
    <div className="app">
      <div className="sidebar">
    <FriendList FriendData={items} onSelected={handleSelectedFriend} onSelectedFriend={selectedFriend}/>
    { showAddFriend && <FormAddFriend onAddFriend={handleAddFriend}/>}
    <Button onClick={handleShowFriend} >{showAddFriend ? "Close" : "Add Friend"} </Button>
      </div>
  { selectedFriend && <FormSplitBill 
  onSelectedFriend={selectedFriend} 
  onSplitBill={handleSplitbill} />}
    </div>
  )
}

function Button({children , onClick}){
  return <button className="button" onClick={onClick}>{children}</button>
}

function FriendList({FriendData ,onSelected , onSelectedFriend}){
  return(
    <div>
      <ul>
        {FriendData.map(friend=> <Friend Fdata={friend} key={friend.id} onSelected={onSelected} onSelectedFriend={onSelectedFriend} />)}
      </ul>
    </div>
  )
}

function Friend({Fdata , onSelected , onSelectedFriend}){
  const isSelected = onSelectedFriend?.id === Fdata.id; // OPtional chaining
  return(
    <li className={isSelected ? "selected":""}>
      <img src={Fdata.image} alt={Fdata.name}/>
      <h3>{Fdata.name}</h3>
      {Fdata.balance < 0 && <p className="red">You Owe {Fdata.name} ${Math.abs(Fdata.balance)}</p>}
      {Fdata.balance > 0 && <p className="green">{Fdata.name} owe you ${Math.abs(Fdata.balance)}</p>}
      {Fdata.balance === 0 && <p>you and {Fdata.name} are even</p>}

      <Button onClick={()=>onSelected(Fdata)}>{isSelected ? "close" : "select"}</Button>
    </li>
  )
}

function FormAddFriend({onAddFriend}){
  const[name , setName] = useState('')
  const[image , setImage] = useState('https://i.pravatar.cc/48')

  function handleSubmit(e){
    e.preventDefault();
    const id = crypto.randomUUID();
    if(!name || !image) return null;
    const newItem = {id , name , balance:0 , image:`${image}?=${id}`}
    console.log(newItem);

    onAddFriend(newItem);
    setName('')
    setImage('https://i.pravatar.cc/48')
  }
  return(
    <form className="form-add-friend " onSubmit={handleSubmit}>
      <label>👀Friend</label>
      <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>

      <label>😶‍🌫️Image URL</label>
      <input type="text" value={image} onChange={(e)=>setImage(e.target.value)}/>

      <Button>Add</Button>
    </form>
    
  )
}

function FormSplitBill({onSelectedFriend , onSplitBill}){
  
  const[bill , setBill] = useState('');
  const[expense , setExpense] = useState('')
  const FriendExpense = bill ? bill-expense : "";
  const[whoPay , setWhoPay] = useState('user')

  function handleOnSubmit(e){
    e.preventDefault();
    if(!bill || !expense) return null;
    onSplitBill(whoPay === 'user' ? FriendExpense : -expense);
  }

  return(
    <form className="form-split-bill" onSubmit={handleOnSubmit}>
      <h2>SPLIT A BILL WITH {onSelectedFriend.name}</h2>
       <label>👀 Bill value</label>
      <input type="text"  value={bill} onChange={(e)=>setBill(Number(e.target.value))}/>

      <label>😶‍🌫️ Your Expense</label>
      <input type="text" value={expense} onChange={(e)=>setExpense(Number(e.target.value) > bill ? expense : Number(e.target.value))}/>

      <label> 👀 {onSelectedFriend.name} Expense </label>
      <input type="text" disabled value={FriendExpense}/>

      <label>😶‍🌫️ Who is Paying Bill?</label>
      <select value={whoPay} onChange={(e)=>setWhoPay(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{onSelectedFriend.name} </option>
      </select>

      <Button>Split Bill</Button>
    </form>
  )
}