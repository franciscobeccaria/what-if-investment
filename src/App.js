import './tailwind.output.css';

import Title from './Title';
import Info from './Info';
import Growth from './Growth';

function App() {
  return (
    <div className="min-h-screen bg-dark flex items-center justify-center flex-col">
      <Title />
      <Info />
      <Growth />
    </div>
  );
}

export default App;
