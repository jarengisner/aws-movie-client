import { createRoot } from 'react-dom/client';
//Always double check path to file, error here was one . //
import { MainView } from './components/main-view/main-view';
//imports bootstrap into our project//
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
// Import statement to indicate that you need to bundle `./index.scss` //
import './index.scss';

//creates our <App /> component that we render in below//
const App = () => {
  return (
    //populates the div with our main component, which includes by proxy the child components//
    <Container>
      <MainView />
    </Container>
  );
};

// Finds the root of your app
const container = document.querySelector('#root');
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<App />);
