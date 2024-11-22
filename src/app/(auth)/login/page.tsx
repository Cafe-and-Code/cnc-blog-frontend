'use client';

import { Lock, UserRound } from 'lucide-react';
import Link from 'next/link'
import React from 'react';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';

import '@/styles/components/login-form.scss';

import axios from '@/lib/axios';

import BaseDialog from '@/components/base/BaseDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import { login } from '@/store/auth';

import { API_URL } from '@/app/constant/api-config';

type loginType = {
  username: string;
  password: string;
  //checkAgree: boolean;
};

export default function LoginPage() {
  const [dataLogin, setDataLogin] = useState<loginType>({
    username: '',
    password: '',
    //checkAgree: false,
  });
  const [dialogList, setDialogList] = useState({
    visible: false,
    message: '',
    title: '',
    submitBtn: 'Submit',
  });
  const dispatch = useDispatch();

  const [cookies, setCookie] = useCookies(['token', 'userId', 'userRole']);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setDataLogin((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = () => {
    setDialogList((prev) => ({
      ...prev,
      visible: false,
    }))
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      username: dataLogin.username,
      password: dataLogin.password
    }
    try {
      const response = await axios.post(API_URL.LOGIN, payload);
      const data = response.data;
      const token = data.token;
      const userId = data.userId;
      const userRole = data.userRole;

      setCookie('token', token);
      setCookie('userId', userId);
      setCookie('userRole', userRole);

      window.location.href = '/';
      setDataLogin({
        username: '',
        password: '',
      });

      dispatch(login(userId));
    } catch (error: any) {
      const data = error?.response?.data
      const messages = data?.errors.join('\n')
      setDialogList((prev) => ({
        ...prev,
        visible: true,
        message: messages,
        title: 'Error',
        submitBtn: 'Submit',
      }))
    }
  };

  return (
    <div className="flex h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 sm:h-screen">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className='text-center text-4xl font-bold text-[var(--color-01)]'>
          CNC BLOG
        </h1>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Card className="shadow-2xl backdrop-blur-md">
          <CardHeader>
            <h2 className="text-center text-xl font-bold leading-9 tracking-tight text-[var(--color-01)]">
              Sign in to your account
            </h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="relative">
                <UserRound className="absolute inset-y-2 left-2" />
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  placeholder="Username"
                  autoComplete="username"
                  value={dataLogin.username}
                  onChange={e => handleChangeInput(e, 'username')}
                  className="pl-10"
                />
              </div>
              <div className="relative">
                <Lock className="absolute inset-y-2 left-2" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Password"
                  autoComplete="current-password"
                  value={dataLogin.password}
                  onChange={e => handleChangeInput(e, 'password')}
                  className="pl-10"
                />
              </div>
              <div>
                <Button type="submit" size="full">
                  Sign in
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <div className="justify-center">
              <Link
                href={{ pathname: '/forgot-password' }}
                className="mt-10 text-center text-sm text-[var(--color-01)] hover:underline"
              >
                Forget Password?
              </Link>
              <p className="text-sm text-gray-500 dark:text-dark-6">
                <span className="pr-0.5">Not a member yet? </span>
                <Link
                  href={{ pathname: '/create-account' }}
                  className="text-primary hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
      <BaseDialog
        dialogList={dialogList}
        onSubmit={handleSubmit}
      />
    </div>
  );
}