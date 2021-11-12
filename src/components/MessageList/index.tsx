import {api} from '../../service/api'


import styles from './styles.module.scss'

import logoImg from  '../../assets/logo.svg'
import { useEffect, useReducer, useState } from 'react'


import io from 'socket.io-client'


type Message = {
  id: string,
  text: string,
  user:{
    name:string,
    avatar_url:  string
  }
}

let messagesQueue: Message[] = []

const socket = io('http://localhost:4000/')

socket.on('new_message', (newMessage: Message) =>{
  messagesQueue.push(newMessage)
})

export function MessageList(){
  const [messages , setMessages] = useState<Message[]>([])

   useEffect(()=>{
      setInterval(()=> {
      if(messagesQueue.length > 0){
        setMessages(prevState => [
          messagesQueue[0],
          prevState[0],
        ].filter(Boolean))

        messagesQueue.shift()
      }
    } , 3000)
  } , [])


  useEffect(()=> {
    // chamada api
    api.get<Message[]>('/messages/last3').then(response => {
      
      response.data.map(key => {
        console.log("id====="+key.id)
      })

      setMessages(response.data)
    }) 

  } , [])

  messages.map(data =>{
    console.log(data.text)
  })

  return(
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="Dowhile2021" />




      <ul className={styles.messageList}>

        {messages.map(message => {
          return (
              <li key={message.id}  className={styles.message}>
                <p className={styles.messageContent}>{message.text}</p>
                <div className={styles.messageUser}>

                    <div className={styles.userImage}>
                      <img src={message.user.avatar_url} alt={message.user.name} />
                    </div>
                  <span>{message.user.name}</span>
                </div>
              </li>
          )
        })}

        
      </ul>
    </div>
  )
}