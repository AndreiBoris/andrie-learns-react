import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import logo from './logo.svg';
import tmdb from './tmdb.svg';
import './App.css';
import MoviesList from './MoviesList';
import MovieDetail from './MovieDetail';
import ErrorBoundary from './handlers/ErrorBoundary';

const App = () => (
  <Router>
    <div className="App">
      <header className="App-header">
        <Link to="/">
          <img src={logo} className="App-logo" alt="logo" />
        </Link>
      </header>
      <ErrorBoundary>
        <Switch>
          <Route exact path="/" component={MoviesList} />
          <Route path="/:id" component={MovieDetail} />
        </Switch>
      </ErrorBoundary>
      <footer>
        <img src={tmdb} alt="The Movie Database Logo" className="Footer-logo" />
        This product uses the TMDb API but is not endorsed or certified by
        <a rel="noopener" href="https://www.themoviedb.org/">
          TMDb
        </a>.
      </footer>
    </div>
  </Router>
);

export default App;
