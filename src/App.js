import logo from './logo.svg';
import './App.css';
import Form from './component/form/Form';
import GameHandler from './component/GameHandler';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                Angol nyelvtanuló
            </header>
            <GameHandler />
        </div>
    );
}

export default App;
