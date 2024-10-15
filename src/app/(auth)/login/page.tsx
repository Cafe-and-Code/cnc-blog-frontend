'use client';

import React from 'react';
import Link from 'next/link'
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import '@/styles/components/login-form.scss';
import { useDispatch } from 'react-redux';
import { login } from '@/store/auth';
import axios from '@/lib/axios';

import { Button } from '@/components/ui/button';
import { Card, CardContent,CardFooter,CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
  const dispatch = useDispatch();
  
  const [cookies, setCookie] = useCookies(['token']);

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataLogin((prev) => ({ ...prev, password: e.target.value }));
  };

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataLogin((prev) => ({ ...prev, username: e.target.value }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      username: dataLogin.username,
      password: dataLogin.password
    }
    try {
      const response = await axios.post(API_URL.LOGIN, payload);
      const data = response.data;

      const token = data;
      setCookie('token', token)
      window.location.href = '/';
      setDataLogin({
        username: '',
        password: '',
        //checkAgree: false,
      });
      const userId = '123'; // Thay thế bằng ID thật từ API
      dispatch(login(userId));
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <div className="flex h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className='text-center text-4xl font-bold'>CNC BLOG</h1>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Card>
          <CardHeader>
            <h2
              style={{ color: 'var(--next-theme-color)' }}
              className="text-center text-xl font-bold leading-9 tracking-tight text-gray-900"
            >
              Sign in to your account
            </h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <Label 
                  htmlFor="username"
                  style={{ color: 'var(--next-theme-color)' }}
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </Label>
                <div className="mt-2">
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    required
                    autoComplete="username"
                    value={dataLogin.username}
                    onChange={handleChangeUsername}
                    style={{ color: 'var(--next-theme-color)' }}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    style={{ color: 'var(--next-theme-color)' }}
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </Label>
                  <div className="text-sm">
                    <Link href={{pathname:'/forgot-password'}} className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    value={dataLogin.password}
                    onChange={handleChangePassword}
                    style={{ color: 'var(--next-theme-color)' }}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  style={{ color: 'var(--next-theme-color)' }}
                >
                  Sign in
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <p className="mt-10 text-center text-sm text-gray-500" style={{ color: 'var(--next-theme-color)' }}>
              Not a member?{' '}
              <Link href={{pathname:'/create-account'}} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                create account
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}