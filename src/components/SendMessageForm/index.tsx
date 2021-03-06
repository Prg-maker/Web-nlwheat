import { FormEvent, useContext, useState } from 'react'
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc'
import { AuthContext } from '../../context/auth'
import { api } from '../../service/api'
import styles from './styles.module.scss'

export function SendMessageForm(){
  

  const {user, singOut} = useContext(AuthContext) 
  
  const [message , setMessage] = useState('')

  async function handleSendMessage(event: FormEvent){
    event.preventDefault()

    if(!message.trim()){
      return ;
    }

    await api.post('message', {message})

    setMessage('')
  }

 return(
  <div className={styles.sendMessageFormWrapper}>
    <button onClick={singOut} className={styles.signOutButton}>
      <VscSignOut size="32"/>
    </button>


      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>
        <strong className={styles.userName}>{user?.name }</strong>

        <span className={styles.userGithub}>
          <VscGithubInverted size="16"/>
          {user?.login}
        </span>
      </header>

      <form onSubmit={handleSendMessage} className={styles.sendMessageForm} action="">
        <label htmlFor="message">Messagem</label>
        <textarea 
          name="message" 
          id="message" 
          placeholder="Qual vai ser expectativa para o doWhile"
          onChange={event => setMessage(event.target.value)}
          value = {message}
        ></textarea>

        <button type="submit">Enviar mensagem</button>
      </form>
  </div>
 ) 
}