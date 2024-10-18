'use client';

import { Lock,UserRound } from 'lucide-react';
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
  const dispatch = useDispatch();

  const [cookies, setCookie] = useCookies(['token']);

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataLogin((prev) => ({ ...prev, password: e.target.value }));
  };

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataLogin((prev) => ({ ...prev, username: e.target.value }));
  };

  const [isOpen, setIsOpen] = useState(false);

  const [message, setMessage] = useState('')

  const [title, setTilte] = useState('')

  const handleSubmit = () => {
    setIsOpen(false)
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
      setIsOpen(true)
      setTilte('Error')
      setMessage(`Error posting data: ${error}`)
    }
  };

  return (
    <div className="flex h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className='text-center text-4xl font-bold text-[var(--color-01)]'>
          CNC BLOG
        </h1>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Card>
          <CardHeader>
            <h2 className="text-center text-xl font-bold leading-9 tracking-tight text-[var(--color-01)]">
              Sign in to your account
            </h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="relative">
                <UserRound className="absolute inset-y-2 left-2 flex items-center"/>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  placeholder="Username"
                  autoComplete="username"
                  value={dataLogin.username}
                  onChange={handleChangeUsername}
                  className="pl-10"
                />
              </div>
              <div className="relative">
                <Lock className="absolute inset-y-2 left-2 flex items-center"/>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Password"
                  autoComplete="current-password"
                  value={dataLogin.password}
                  onChange={handleChangePassword}
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
        title={title} 
        visible={isOpen} 
        message={message}
        submitBtn='Submit'
        onSubmit={handleSubmit}
      />
    </div>
  );
}