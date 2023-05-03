import {useEffect, useState} from 'react'

const App = () => {
    const [value, setValue] = useState('')
    const [message, setMessage] = useState(null)
    const [previousChats, setPreviousChats] = useState([])
    const [curTitle, setCurTitle] = useState(null)

    const createNewChat = () =>{
        setMessage(null)
        setValue('')
        setCurTitle(null)
    }

    const historyClick = (title) => {
        setCurTitle(title)
        setMessage(null)
        setValue('')
    }
    
    const getMessages = async () => {
        const options = {
            method: "POST",
            body: JSON.stringify({
                message: value
            }),
            headers: {
                'Content-Type': "application/json"
            }
        }
        try{
            const response = await fetch('http://localhost:8000/completions', options)
            const data = await response.json()
            setMessage(data.choices[0].message)
        }catch (err){
            console.error(err)
        }
    }

    useEffect(() => {
        console.log(curTitle, value, message)
        if(!curTitle && value && message){
            setCurTitle(value)
        }
        if(curTitle && value && message){
            setPreviousChats(prevChats => (
                [...prevChats,
                    {
                        title: curTitle,
                        role: 'user',
                        content: value
                    },
                    {
                        title: curTitle,
                        role: message.role,
                        content: message.content
                    }

                ]
            ))
        }

    }, [message, curTitle])

    console.log(previousChats)

    const curChat = previousChats.filter(previousChats => previousChats.title === curTitle)
    const titles = Array.from(new Set(previousChats.map(chat => chat.title)))

    return (
        <div className="App">
        <section className="side-bar">
            <button onClick={createNewChat}>+ New chat</button>
            <ul className="history">
                {titles ? titles.map((title, index) => <li key={index} onClick={() => historyClick(title)}>{title}</li>) : null}
            </ul>
            <nav>
                <p>Made by Payton</p>
            </nav>
        </section>

        <section className="main">
            {curTitle ? <h1>{curTitle}</h1> : <h1>PaytonGPT</h1>}
            <ul className="feed">
                {curChat ? curChat.map((mes, index) => <li key={index}>
                    <p className='role'>{mes.role}</p>
                    <p>{mes.content}</p>
                </li>) : null}
            </ul>
            <div className="bottom-section">
                <div className="input-container">
                    <input value={value} onChange={(e) => setValue(e.target.value)}/>
                    <div id="submit" onClick={getMessages}>➢</div>
                </div>
                <p className="info">ChatGPT March 23 Version</p>
            </div>
        </section>
        </div>
    );
}

export default App;
