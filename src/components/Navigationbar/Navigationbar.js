import React, { useEffect, useState } from 'react';
import './Navigationbar.css';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Switch, Route, Redirect } from 'react-router-dom';
import Homepage from '../Homepage/Homepage';
import MovieDetails from '../MovieDetails/MovieDetails';
import SignUp from '../SignUp/SignUp';
import Login from '../Login/Login';
import AdminLogin from '../AdminLogin/AdminLogin';
import AdminSignUp from '../AdminSignUp/AdminSignUp';
import AuthService from '../../services/auth.service';
import SavedMovies from '../SavedMovies/SavedMovies';
import AllMovies from '../AllMovies/AllMovies';
import { Modal } from 'react-bootstrap';
import AllShows from '../AllShows/AllShows';
import AddMovie from '../AddMovie/AddMovie';

function Navigationbar(props) {
  const [username, setUsername] = useState('');
  const [showSignout, setShowSignout] = useState(false);
  const [admin, setAdmin] = useState('');

  const handleShow = () => setShowSignout(true);
  const handleClose = () => setShowSignout(false);

  useEffect(() => {
    // This will run when the page first loads and whenever the title changes
    if (AuthService.getCurrentUser() != null) {
      setUsername(AuthService.getCurrentUser().username);
    }
    if (AuthService.getCurrentAdmin() != null) {
      setAdmin(AuthService.getCurrentAdmin().username);
    }
  }, [username]);

  const updateUsername = (username) => {
    if (AuthService.getCurrentUser() != null) {
      setUsername(username);
    }
    if (AuthService.getCurrentAdmin() != null) {
      setAdmin(username);
    }
  };

  const logout = () => {
    setTimeout(() => {
      handleShow();
    }, 2000);
    setTimeout(() => {
      setUsername('');
      AuthService.logout();
      window.location.reload();
    }, 4000);
    handleClose();
  };

  return (
    <div>
      <Navbar className="nav-bar" variant="dark" style={{ height: '60px' }}>
        <Container>
          {/* =================================================== MAIN LOGO =================================================== */}
          <LinkContainer to="/">
            <Navbar.Brand style={{ fontWeight: 'bold' }}>
              Movie Night
            </Navbar.Brand>
          </LinkContainer>

          <Nav className="me-auto">
            {/* =================================================== LINK TO HOME =================================================== */}
            <LinkContainer to="/home">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>

            {/* =================================================== LINK TO ALL MOVIES =================================================== */}
            <LinkContainer to="/allmovies">
              <Nav.Link>Movies</Nav.Link>
            </LinkContainer>

            {/* =================================================== LINK TO ALL SHOWS =================================================== */}
            <LinkContainer to="/allshows">
              <Nav.Link>Shows</Nav.Link>
            </LinkContainer>
          </Nav>
          {admin !== '' ? (
            /* =================================================== DROPDOWN MENU (ONLY IF LOGGED IN) =================================================== */
            <div>
              <NavDropdown title={'ADMIN:   ' + admin} id="basic-nav-dropdown">
                {/* =================================================== VIEW PROFILE =================================================== */}
                <NavDropdown.Item>View Profile</NavDropdown.Item>
                {/* =================================================== SAVED MOVIES =================================================== */}
                <LinkContainer to="/viewusers">
                  <NavDropdown.Item>View Users</NavDropdown.Item>
                </LinkContainer>
                {/* =================================================== ADD MOVIE =================================================== */}
                <LinkContainer to="/addmovie">
                  <NavDropdown.Item>Add Movie</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                {/* =================================================== SIGN OUT =================================================== */}
                <NavDropdown.Item onClick={logout}>Sign out</NavDropdown.Item>
              </NavDropdown>
            </div>
          ) : username !== '' ? (
            /* =================================================== DROPDOWN MENU (ONLY IF LOGGED IN) =================================================== */
            <NavDropdown title={username} id="basic-nav-dropdown">
              {/* =================================================== VIEW PROFILE =================================================== */}
              <NavDropdown.Item>View Profile</NavDropdown.Item>
              {/* =================================================== SAVED MOVIES =================================================== */}
              <LinkContainer to="/savedmovies">
                <NavDropdown.Item>Saved Movies</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              {/* =================================================== SIGN OUT =================================================== */}
              <NavDropdown.Item onClick={logout}>Sign out</NavDropdown.Item>
            </NavDropdown>
          ) : (
            /* =================================================== SIGN UP =================================================== */
            <LinkContainer to="/signup" style={{ color: 'white' }}>
              <Nav.Link>Sign Up</Nav.Link>
            </LinkContainer>
          )}
        </Container>
      </Navbar>

      {/* =================================================== LOGGING OUT MODAL =================================================== */}
      <Modal show={showSignout} onHide={handleClose} centered>
        <Modal.Body>
          <div style={{ padding: '3%' }}>
            <h4 className="logout-heading">Logging out...</h4>
            <div className="modal-loading-div">
              <div className="loader"></div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Switch>
        <Route exact path="/">
          <Homepage updateUsername={updateUsername} />
        </Route>
        <Route exact path="/home">
          <Redirect to="/" />
        </Route>
        <Route exact path="/movie/:id" component={MovieDetails} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/adminlogin" component={AdminLogin} />
        <Route exact path="/adminsignup" component={AdminSignUp} />
        <Route exact path="/savedmovies" component={SavedMovies} />
        <Route exact path="/allmovies" component={AllMovies} />
        <Route exact path="/allshows" component={AllShows} />
        <Route exact path="/addmovie" component={AddMovie} />
        <Route
          render={function () {
            return <p>Not found</p>;
          }}
        />
      </Switch>
    </div>
  );
}

export default Navigationbar;
