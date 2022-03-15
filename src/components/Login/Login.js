import React from 'react';
import './Login.css';
import { Button } from 'react-bootstrap';
import { Formik } from 'formik';
import AuthService from '../../services/auth.service';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const history = useHistory();

  const routeChange = () => {
    let path = `/`;
    history.push(path);
  };

  const signup = () => {
    let path = `/signup`;
    history.push(path);
  };

  return (
    <div>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }

          if (!values.password) {
            errors.password = 'Required';
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            //alert(JSON.stringify(values, null, 2));

            if (values.email && values.password) {
              AuthService.login(values.email, values.password).then(
                () => {
                  if (AuthService.getCurrentUser()) {
                    routeChange();
                  }
                },
                (error) => {
                  const resMessage =
                    (error.response &&
                      error.response.data &&
                      error.response.data.message) ||
                    error.message ||
                    error.toString();

                  console.log(resMessage);
                  alert(resMessage);
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
          <div className="login-div">
            <h1 className="login-heading">Login</h1>
            <form onSubmit={handleSubmit}>
              {/* =================================================== INPUT EMAIL =================================================== */}
              <div className="login-input-div">
                {' '}
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Email"
                />
                {errors.email && touched.email && errors.email ? (
                  <div
                    style={{
                      color: 'red',
                      fontSize: '12px',
                      margin: '0',
                      padding: '0',
                    }}
                  >
                    <p>{errors.email}</p>
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
              <div className="login-input-div">
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
                  backgroundColor: '#e0662d',
                  border: 'none',
                  height: '50px',
                  width: '120px',
                  fontSize: '22px',
                }}
              >
                Log In
              </Button>{' '}
            </form>
            <div>
              <p onClick={signup} className="signup-text">
                Don't have an account yet? Sign up!
              </p>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}
