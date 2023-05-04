import { createRoot } from 'react-dom/client';
import { MainView } from '../components/main-view/main-view';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

//creates our <App /> component that we render in below//
const App = () => {
  return (
    //populates the div with our main component, which includes by proxy the child components//
    <div>
      <MainView />
    </div>
  );
};

// Finds the root of your app
const container = document.querySelector('#root');
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<App />);
