import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from 'components/Header';
import Footer from 'components/Footer';
import PhasmoScreen from 'screens/PhasmoScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <div className="container-fluid">
          <Route exact path='/phasmo' component={PhasmoScreen} />
        </div>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
