import {useEffect, useState} from 'react'

const App = () => {
    const [value, setValue] = useState('')
    const [message, setMessage] = useState(null)
    const [previousChats, setPreviousChats] = useState([])
    const [curTitle, setCurTitle] = useState(null)
    const [light, setLight] = useState(false)

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

    const xClick = (e) => {
        e.stopPropagation();
        let del_title = e.target.getAttribute('title')
        setPreviousChats(previousChats.filter((previousChats => previousChats.title !== del_title)))
        createNewChat()
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
        if(!curTitle && value && message){
            setCurTitle(value)
        }
        if(curTitle && value && message){
            setPreviousChats(prevChats => (
                [...prevChats,
                    {
                        title: curTitle, //.len < 13 ? curTitle : curTitle.slice(0, 12) + '...',
                        role: 'user',
                        content: value
                    },
                    {
                        title: curTitle, //.len < 13 ? curTitle : curTitle.slice(0, 12) + '...',
                        role: message.role,
                        content: message.content
                    }

                ]
            ))
            setMessage('')
            setValue('')
        }
    }, [message, curTitle, value])

    const curChat = previousChats.filter(previousChats => previousChats.title === curTitle)
    const titles = Array.from(new Set(previousChats.map(chat => chat.title)))

    return (
        <div className={light ? "App light" : "App"}>
        <section className="side-bar">
            <button onClick={createNewChat}>+ New chat</button>
            <ul className="history">
                {titles ? titles.map((title, index) => <li key={index} onClick={() => historyClick(title)}>
                    <p>{title.length < 13 ? title : title.slice(0, 12) + '...'}</p>&nbsp;
                    <button title={title} onClick={(e) => xClick(e)}>X</button>
                </li>) : null}
            </ul>
            <nav>
                <label className="switch">
                    <input type="checkbox"/>
                    <span onClick={() => setLight(!light)} className="slider round">
                        <span className={light ? 'sun' : 'sun off'}>🌞</span>
                        <span className={light ? 'moon off' : 'moon'}>🌜</span>
                    </span>
                </label>
                <a href='https://github.com/paytonshafer'>Made by Payton</a>
            </nav>
        </section>

        <section className="main">
            {curTitle ? <h1>{curTitle}</h1> : <h1 className='title'>PaytonGPT</h1>}
            <ul className="feed">
                {curChat ? curChat.map((mes, index) => <li key={index}>
                    <p className='role'>{mes.role}</p>
                    <p>{mes.content}</p>
                </li>) : null}
            </ul>
            <div className="bottom-section">
                <div className="input-container">
                    <input value={value} onChange={(e) => setValue(e.target.value)}/>
                    <div id="submit" onClick={getMessages}>➠</div> {/*arrows: ➵ ➢ ➪ ➠ */}
                </div>
                <p className="info">Meet OpenAI's model GPT-3.5-turbo which can understand as well as generate natural language or code</p>
            </div>
        </section>
        </div>
    );
}

export default App;
