import React from 'react';
import { Formik } from 'formik';
import './SignUp.css';
import { Button } from 'react-bootstrap';
import AuthService from '../../services/auth.service';
import { useHistory } from 'react-router-dom';

export default function SignUp() {
  // const [user, setUser] = useState({
  //   name: '',
  //   email: '',
  //   password: '',
  // });

  const history = useHistory();

  const login = () => {
    let path = `/login`;
    history.push(path);
  };

  return (
    <div>
      <Formik
        initialValues={{ email: '', password: '', name: '' }}
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

          if (!values.name) {
            errors.name = 'Required';
          } else if (!/^([^0-9]*)$/i.test(values.name)) {
            errors.name = 'Invalid name';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            //alert(JSON.stringify(values, null, 2));

            // const { name, email, password } = values;
            // setUser({
            //   name: name,
            //   email: email,
            //   password: password,
            // });

            if (values.name && values.email && values.password) {
              AuthService.signup(
                values.name,
                values.email,
                values.password
              ).then(
                () => {
                  //console.log(values.name, values.email, values.password);
                  alert('Account created! Login to continue');
                  login();
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
          <div>
            <div className="sign-up-div">
              <div style={{ height: '100%' }}>
                <h1 className="sign-up-heading">Sign up now!</h1>
                <form onSubmit={handleSubmit}>
                  {/* =================================================== INPUT NAME =================================================== */}
                  <div className="sign-up-input-div">
                    {' '}
                    <input
                      type="name"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      placeholder="Display name"
                    />
                    <div
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        margin: '0',
                        padding: '0',
                      }}
                    >
                      {errors.name && touched.name && errors.name ? (
                        <div
                          style={{
                            color: 'red',
                            fontSize: '12px',
                            margin: '0',
                            padding: '0',
                          }}
                        >
                          <p>{errors.name}</p>
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
                  </div>
                  {/* =================================================== INPUT EMAIL =================================================== */}
                  <div className="sign-up-input-div">
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
                  <div className="sign-up-input-div">
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
                      marginTop: '10px',
                      marginBottom: '10px',
                      backgroundColor: '#e0662d',
                      border: 'none',
                      height: '50px',
                      width: '120px',
                      fontSize: '22px',
                    }}
                  >
                    Sign Up
                  </Button>{' '}
                </form>
              </div>
              {/* =================================================== OPTION TO LOG IN =================================================== */}
              <div>
                <p onClick={login} className="login-text">
                  Already have an account? Login!
                </p>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}
