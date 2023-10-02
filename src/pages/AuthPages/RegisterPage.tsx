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
import { setIsAppLoading } from 'features/App/reducer';
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
import type { I_UniRes } from 'types/types';

const RegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAppLoading = useAppSelector(selectIsAppLoading);

  const [fields, setFields] = useState({
    login: 'TestUser',
    email: 'testuser@gmail.com',
    phone: '+89845124471',
    nameFirst: 'Test',
    nameLast: 'User',
    password: 'Qwerty1',
    passwordConfirm: 'Qwerty1',
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

  const isRegisterDisabled = useCallback(
    () =>
      !fields['nameFirst'].match(/^[A-Za-zА-Яа-я]{1,30}$/) ||
      !fields['nameLast'].match(/^[A-Za-zА-Яа-я]{1,30}$/) ||
      !fields['login'].match(/^[A-Za-z0-9_.]{4,20}$/) ||
      !fields['phone'].match(/^\+\d{11,15}$/) ||
      !fields['password'].match(/^[^\s]{6,}$/) ||
      !fields['passwordConfirm'].match(/^[^\s]{6,}$/) ||
      fields['password'] !== fields['passwordConfirm'],
    [fields]
  );

  const handleRegister = useCallback(async () => {
    dispatch(setIsAppLoading(true));

    const payload: { [k: string]: any } = {
      login: fields['login'],
      email: fields['email'],
      phone: fields['phone'],
      password: fields['password'],
      nameFirst: fields['nameFirst'],
      nameLast: fields['nameLast'],
    };

    const res = await post('/users/register', payload);
    const { status }: I_UniRes = res;

    if (status === 'error') {
      toast.error('Ошибка! Введённые данные пользователя не верны.');
      return;
    }

    toast.success('Вы успешно зарегистрированы');

    navigate(paths.login);

    dispatch(setIsAppLoading(false));
  }, [dispatch, fields, navigate]);

  return (
    <PageWrapper>
      <Helmet>
        <title>Sign up - My Marketplace</title>
      </Helmet>

      <FormWrapper>
        <Logo src={logo} />
        <Heading>Wellcome!</Heading>
        <SubHeading>Please, fill the form</SubHeading>

        <AuthForm>
          <VerticalCol>
            <Input
              name="nameFirst"
              label="FirstName"
              placeholder="Enter your firstname"
              value={fields['nameFirst']}
            />

            <Input
              name="nameLast"
              label="LastName"
              placeholder="Enter your lastname"
              value={fields['nameLast']}
            />

            <Input
              name="login"
              label="Login"
              placeholder="Enter your login"
              value={fields['login']}
            />

            <Input
              name="email"
              label="Email"
              placeholder="Your Email"
              value={fields['email']}
            />

            <Input
              name="phone"
              label="Phone"
              placeholder="Your phone"
              value={fields['phone']}
            />

            <Input
              name="password"
              label="Password"
              placeholder="Your password"
              value={fields['password']}
              onChange={onChangeInput}
              type="password"
            />

            <Input
              name="passwordConfirm"
              label="Repeat password"
              placeholder="Repeat password"
              value={fields['passwordConfirm']}
              onChange={onChangeInput}
              type="password"
            />
          </VerticalCol>

          <Button
            block
            onClick={handleRegister}
            disabled={isRegisterDisabled() || isAppLoading}
          >
            Sign up
          </Button>
        </AuthForm>

        <GoToWrapper>
          <span>Already have an account ?</span>
          &nbsp;
          <Link to={paths.login}>Login</Link>
        </GoToWrapper>

        <GoToWrapper>
          <Link to={paths.home}>HomePage</Link>
        </GoToWrapper>
      </FormWrapper>
    </PageWrapper>
  );
};

export default RegisterPage;
