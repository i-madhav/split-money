import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({children , onClick}){
  return  <button className="button" onClick={onClick}>{children}</button>
}

export default function App(){
  const[showAddFriend , setShowAddFriend] = useState(false);

  function handleShowAddFriend(){
    
  }
  return(
    <div className="app">
      <div className="sidebar">
      <FriendsList/>
      {showAddFriend && <FormAddFriend/>}
      <Button onClick={handleShowAddFriend}>Add Friend</Button>
      </div>
      <FormSplitBill/>
    </div>
  )
}

function FriendsList(){
  const friend = initialFriends
  return <ul>
    {friend.map(friends=> <Friend friends={friends} key={friends.id}/>)}
  </ul>
}

function Friend({friends}){
  return <li>
    <img src={friends.image} alt={friends.name} />
    <h3>{friends.name}</h3>

   {friends.balance <0 && <p className="red">You owe {friends.name} {Math.abs(friends.balance)}$</p>} 
   {friends.balance > 0 && <p className="green">{friends.name} owe you {Math.abs(friends.balance)}$</p>}
   {friends.balance === 0 && <p>You and {friends.name} are even </p>}

   <Button>Select</Button>
  </li>
}

function FormAddFriend(){
  return(
    <form className="form-add-friend">
<label>😎Friend</label>
<input type="text"/>

<label>👀Image Url</label>
<input type="text"/>

<Button>Add</Button>
    </form>
  )
}

function FormSplitBill(){
  return(
    <form className="form-split-bill">
      <h2>Split Bill With x</h2>

      <label>💥 Bill Value</label>
      <input type="text"/>

      
      <label>💥 Your Expense</label>
      <input type="text"/>

      
      <label>💥 Friend Expense</label>
      <input type="text" disabled/>

    <label>😍Who is paying the bill</label>
    <select>
      <option value="user">You</option>
      <option value="friend">X</option>
    </select>
      <Button>Split Bill</Button>
    </form>
  )
}