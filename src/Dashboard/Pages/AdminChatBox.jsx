
import { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth'

import io from 'socket.io-client';
const socket = io('http://localhost:5000/'); // Connect to the Socket.io server


const AdminChatBox = () => {

    const { currentUser } = useAuth()
    const [ userMessages, setUserMessages ] = useState({});
    const [ messages, setMessages ] = useState([]);

  useEffect(()=>{

    socket.on('sendToAdmin', (receiveUserMessages) => { setUserMessages(receiveUserMessages)})
    console.log(userMessages)

    socket.on('message', (msg) => console.log(msg))
  },[ userMessages, ])
    
  useEffect(()=> {
    socket.emit('adminMessage', {
      senderInfo: {name: currentUser.displayName, photo: currentUser?.photoURL},
      messages 
    })
  }, [messages, currentUser])


    const handleSendMessage = (e) => {
        e.preventDefault();
        setMessages([...messages, e.target.message.value])
        e.target.reset();
    }

    return (
        <section className='max-w-5xl mx-auto px-7 py-5 md:py-10'>
            <h2 className=' text-2xl md:text-4xl font-racing text-center text-[#014BA0]'> Live Service </h2>


<div className="container mx-auto shadow-lg rounded-lg">
     
    <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
      <div className="font-semibold text-2xl text-gray-500">GoingChat</div>
      
      
      {userMessages?.senderInfo?.photo? <div className='flex items-center gap-3'><h2 className=' font-bold text-gray-500 uppercase'> {userMessages?.senderInfo?.name} </h2> <img src={userMessages.senderInfo.photo} className='h-12 w-12 rounded-full' /> </div> : <div
        className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center"
      >
        {userMessages.senderInfo?.name.split(0,1)}
      </div>}
    </div>
  
    <div className="flex flex-row justify-between bg-white">
 
      <div className="hidden xl:flex xl:flex-col w-2/5 border-r-2 overflow-y-auto">
  
        <div className="border-b-2 py-4 px-2">
          <input
            type="text"
            placeholder="Search user"
            className="py-2 px-2 border border-gray-200  w-full outline-none"
          />
        </div>
 
        <div
          className="flex flex-row py-4 px-2 justify-center items-center border-b-2"
        >
          <div className="w-1/4">
            <img
              src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
              className="object-cover h-12 w-12 rounded-full"
              alt=""
            />
          </div>
          <div className="w-full">
            <div className="text-lg font-semibold">Luis1994</div>
            <span className="text-gray-500">Pick me at 9:00 Am</span>
          </div>
        </div>
        <div className="flex flex-row py-4 px-2 items-center border-b-2">
          <div className="w-1/4">
            <img
              src="https://source.unsplash.com/otT2199XwI8/600x600"
              className="object-cover h-12 w-12 rounded-full"
              alt=""
            />
          </div>
          <div className="w-full">
            <div className="text-lg font-semibold">Everest Trip 2021</div>
            <span className="text-gray-500">Hi Sam, Welcome</span>
          </div>
        </div>
   
      </div>


      <div className="w-full max-h-[600px] overflow-y-auto  px-5 flex flex-col justify-between">
        <div className="flex flex-col mt-5">
          <div className="flex flex-col justify-end mb-4">

          {userMessages?.messages?.map((userMessage, index) =>  <div key={userMessage +index} className="flex flex-row-reverse gap-3 mt-2">  <img className='w-10 h-10 rounded-full object-cover' src={userMessages.senderInfo.photo}/>  <p className='ml-2 py-3 px-4 bg-gray-400 rounded text-white'>{userMessage} </p></div> )}

          </div>
         
          
          <div className="flex justify-start mb-4">
            <div>

          {messages?.map((userMessage, index) =>  <div key={userMessage +index} className="flex mt-2">  <img className='w-10 h-10 rounded-full object-cover' src={currentUser.photoURL}/>  <p className='ml-2 py-3 px-4 bg-gray-400 rounded text-white'>{userMessage} </p></div> )}
           
            </div>
          </div>
        </div>
       <form onSubmit={handleSendMessage}>
       <div className="py-5">
          <input
            className="w-full outline-none bg-gray-100 py-5 px-3 rounded"
            type="text" name='message'
            placeholder="type your message here..."
          />
        </div>
       </form>
      </div>
    
     
    </div>
   
</div>

        </section>
    );
};

export default AdminChatBox;