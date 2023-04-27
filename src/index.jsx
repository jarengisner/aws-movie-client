import { createRoot } from 'react-dom/client';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

// Main component (will eventually use all the others)
const MyFlixApplication = () => {
  return (
    <div className='my-flix'>
      <h1>Good morning</h1>
    </div>
  );
};

// Finds the root of your app
const container = document.getElementById('#root');
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<MyFlixApplication />);