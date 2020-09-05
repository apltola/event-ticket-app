import { useState, useRef, useEffect } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const SigninPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailInput = useRef();

  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push('/'),
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    doRequest();
  };

  useEffect(() => {
    emailInput.current.focus();
  }, []);

  return (
    <form className="signup-form" onSubmit={onSubmit}>
      <h1>Sign in</h1>
      <div>
        <label>Email Address</label>
        <input
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          ref={emailInput}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Sign in</button>
      {errors}
    </form>
  );
};

export default SigninPage;
