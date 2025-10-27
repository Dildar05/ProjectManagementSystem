import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App min-h-screen flex items-center justify-center bg-slate-50">
      <header className="App-header text-center p-8 bg-white/80 rounded-xl shadow-sm">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link text-indigo-600 "
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p className="mt-4 text-sm text-slate-600">Tailwind is active if this text is slate and the link is indigo.</p>
      </header>
    </div>
  );
}

export default App;
