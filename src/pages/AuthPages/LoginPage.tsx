import { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { post } from 'helpers/request';

import { useAppSelector, useAppDispatch } from 'store';
import { paths } from 'routes/helpers';
import Input from 'components/Input';
import Button from 'components/Button';
import { selectIsAppLoading } from 'features/App/selectors';
import { setIsAppLoading, setIsLogged } from 'features/App/reducer';
import logo from 'assets/img/logo.png';
import {
  PageWrapper,
  FormWrapper,
  Logo,
  Heading,
  SubHeading,
  VerticalCol,
  AuthForm,
  GoToWrapper,
} from './styled';

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAppLoading = useAppSelector(selectIsAppLoading);

  const [fields, setFields] = useState({
    loginOrEmail: process.env.REACT_APP_DEV_LOGIN || '',
    password: process.env.REACT_APP_DEV_PASSWORD || '',
  });

  const onChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFields({
        ...fields,
        [e.target.name]: e.target.value,
      });
    },
    [fields]
  );

  const isLoginDisabled = useCallback(() => {
    return !fields['loginOrEmail'] || !fields['password'];
  }, [fields]);

  const handleLogin = useCallback(async () => {
    dispatch(setIsAppLoading(true));

    const res = await post('/users/login', {
      loginOrEmail: fields['loginOrEmail'],
      password: fields['password'],
    });

    const { status } = res;

    if (status === 'error') {
      toast.error('Введённые данные неверны');
      dispatch(setIsAppLoading(false));
      return;
    }

    dispatch(setIsLogged(true));

    navigate(paths.home);

    dispatch(setIsAppLoading(false));
  }, [dispatch, fields, navigate]);

  const handleFormKeyPress = useCallback(
    ({ code }: React.KeyboardEvent<HTMLFormElement>) => {
      if (['Enter', 'NumpadEnter'].includes(code) && !isLoginDisabled()) {
        handleLogin();
      }
    },
    [handleLogin, isLoginDisabled]
  );

  return (
    <PageWrapper>
      <Helmet>
        <title>Login - My Marketplace</title>
      </Helmet>

      <FormWrapper>
        <Logo src={logo} />
        <Heading>Wellcome!</Heading>
        <SubHeading>Please, log in or sign up</SubHeading>

        <AuthForm>
          <VerticalCol onKeyDown={handleFormKeyPress}>
            <Input
              name="loginOrEmail"
              label="Login or E-mail"
              placeholder="Enter login or e-mail"
              autocomplete="username"
              value={fields['loginOrEmail']}
              onChange={onChangeInput}
            />

            <Input
              name="password"
              label="Password"
              placeholder="Enter password"
              autocomplete="current-password"
              value={fields['password']}
              onChange={onChangeInput}
              type="password"
            />
          </VerticalCol>

          <Button
            block
            onClick={handleLogin}
            disabled={isLoginDisabled() || isAppLoading}
          >
            Enter
          </Button>
        </AuthForm>

        <GoToWrapper>
          <span>Don't have login?</span>
          &nbsp;
          <Link to={paths.register}>Please, register</Link>
        </GoToWrapper>

        <GoToWrapper>
          <Link to={paths.home}>HomePage</Link>
        </GoToWrapper>
      </FormWrapper>
    </PageWrapper>
  );
};

export default LoginPage;
