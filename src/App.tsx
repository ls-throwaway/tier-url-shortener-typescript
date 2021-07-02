import { ShortenUrlForm } from './components';
import logo from './img/tier-logo.svg';
import './css/App.css';

const App: React.FC = () => (
    <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Change mobility for good</p>
        <ShortenUrlForm />
    </div>
);

export default App;
