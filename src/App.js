const App = () => {
  return (
    <div className="App">
       <section className="side-bar">
        <button>+ New chat</button>
        <ul className="history"></ul>
        <nav>
            <p>Made by Payton</p>
        </nav>
    </section>

    <section className="main">
        <h1>PaytonGPT</h1>
        <ul className="feed">

        </ul>
        <div className="bottom-section">
            <div className="input-container">
                <input/>
                <div id="submit">➢</div>
            </div>
            <p className="info">ChatGPT March 23 Version</p>
        </div>
    </section>
    </div>
  );
}

export default App;
