
import './App.scss'
import About from './components/About/About';
import Button from './components/Buttons/Button';
import Card from './components/Card/Card';
import Counter from './components/Counter/Counter';
import Header from './components/Header/Header';
import Input from './components/Inputs/Input';
import Spinner from './components/Spinners/Spinner';
import FlexCol from './components/flex/FlexCol';
import FlexRow from './components/flex/FlexRow';

function App() {
  return (
    <div>
      <Input placeholder='name' />
      <FlexRow>
        <p>
        </p>
      </FlexRow>
      <FlexCol>
        <p>
        </p>
      </FlexCol>
      <Card>
        <p>sdjafijsdaf</p>
      </Card>
      <Button
        variant="primary"
        onClick={() => {
          alert("hi");
        }}
        text="Hi"
      />

      <Spinner />
      <About />
      <Header />
      <Counter />
      <h1>Hello World</h1>
    </div>
  );
}

export default App;




function MSApps() {
  return (
    <div>afsiujhasi</div>
  )
}