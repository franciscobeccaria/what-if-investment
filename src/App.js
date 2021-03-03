import './tailwind.output.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { HiBriefcase, HiHome } from 'react-icons/hi';

import HomePage from './Components/HomePage';
import PortfolioPage from './Components/PortfolioPage';
import ModalLoading from './Components/ModalLoading';

function App() {
  return (
    // Header (que va a ser un Menu Mobile como el de Portfolio, fixed arriba a la izquierda)
    //    HomePage
    //    AdvancedPage
    // Footer
    <Provider store={store}>
      <Router>
        <div className="absolute sm:fixed top-0 left-1/2 sm:left-0 w-32 h-12 flex items-center justify-around sm:pl-4 pt-3 transform -translate-x-1/2 sm:translate-x-0">
          <Link to={'/'}>
            <div className="text-white text-2xl transition ease-in-out duration-500 transform hover:-translate-y-1 hover:scale-105">
              <HiHome />
            </div>
          </Link>
          <Link to={'/portfolio'}>
            <div className="text-white text-2xl transition ease-in-out duration-500 transform hover:-translate-y-1 hover:scale-105">
              <HiBriefcase />
            </div>
          </Link>
        </div>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/portfolio">
            <PortfolioPage />
          </Route>
        </Switch>
        <div className="w-full h-28 bg-gray-300"></div>
        <ModalLoading />
      </Router>
    </Provider>
  );
}

export default App;
