import React from 'react';
import './AdminLogin.css';
import { Button } from 'react-bootstrap';
import { Formik } from 'formik';
import AuthService from '../../services/auth.service';
import { useHistory } from 'react-router-dom';

export default function AdminLogin() {
  const history = useHistory();

  const routeChange = () => {
    let path = `/`;
    history.push(path);
  };

  const signup = () => {
    let path = `/adminsignup`;
    history.push(path);
  };

  return (
    <div>
      <Formik
        initialValues={{ username: '', password: '' }}
        validate={(values) => {
          const errors = {};
          if (!values.username) {
            errors.username = 'Required';
          }

          if (!values.password) {
            errors.password = 'Required';
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));

            if (values.username && values.password) {
              AuthService.adminLogin(values.username, values.password).then(
                () => {
                  //console.log(values.name, values.email, values.password);
                  alert('Logged in');
                },
                (error) => {
                  const resMessage =
                    (error.response &&
                      error.response.data &&
                      error.response.data.message) ||
                    error.message ||
                    error.toString();

                  alert(JSON.stringify(resMessage));
                }
              );
            }
            setSubmitting(false);
            routeChange();
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <div style={{ color: 'rgba(79, 81, 140, 1.0)' }}>
            {' '}
            <div className="admin-login-div">
              <h1 className="admin-login-heading">Login as Admin</h1>
              <form onSubmit={handleSubmit}>
                {/* =================================================== INPUT USERNAME =================================================== */}
                <div className="admin-input-div">
                  {' '}
                  <input
                    type="username"
                    name="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    placeholder="Username"
                  />
                  {errors.username && touched.username && errors.username ? (
                    <div
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        margin: '0',
                        padding: '0',
                      }}
                    >
                      <p>{errors.username}</p>
                    </div>
                  ) : (
                    <div
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        margin: '0',
                        padding: '0',
                        visibility: 'hidden',
                      }}
                    >
                      <p>temp</p>
                    </div>
                  )}
                </div>
                {/* =================================================== INPUT PASSWORD =================================================== */}
                <div className="admin-input-div">
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder="Password"
                  />
                  {errors.password && touched.password && errors.password ? (
                    <div
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        margin: '0',
                        padding: '0',
                      }}
                    >
                      <p>{errors.password}</p>
                    </div>
                  ) : (
                    <div
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        margin: '0',
                        padding: '0',
                        visibility: 'hidden',
                      }}
                    >
                      <p>temp</p>
                    </div>
                  )}
                </div>
                {/* =================================================== SUBMIT BUTTON =================================================== */}
                <Button
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    marginTop: '30px',
                    marginBottom: '30px',
                    backgroundColor: '#d16939',
                    border: 'none',
                    height: '50px',
                    width: '120px',
                    fontSize: '22px',
                  }}
                >
                  Submit
                </Button>{' '}
              </form>
              <div>
                <p onClick={signup} className="admin-signup-text">
                  Don't have an account yet? Sign up!
                </p>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}
