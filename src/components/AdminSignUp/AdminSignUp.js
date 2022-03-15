import React from 'react';
import './AdminSignUp.css';
import { Button } from 'react-bootstrap';
import { Formik } from 'formik';
import AuthService from '../../services/auth.service';
import { useHistory } from 'react-router-dom';

export default function AdminSignUp() {
  const history = useHistory();

  const login = () => {
    let path = `/adminlogin`;
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
          } else if (!/(\d)+/i.test(values.username)) {
            errors.username = 'Username must contain at least 1 digit';
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
              AuthService.adminSignup(values.username, values.password).then(
                () => {
                  //console.log(values.name, values.email, values.password);
                  alert('Account created! Login to continue');
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
            <div className="admin-signup-div">
              <h1 className="admin-signup-heading">Sign Up as Admin</h1>
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
                <div>
                  <p onClick={login} className="admin-login-text">
                    Already have an account? Login!
                  </p>
                </div>
              </form>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}
