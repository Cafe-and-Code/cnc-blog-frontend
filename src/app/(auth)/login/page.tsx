'use client';

import { Lock, UserRound } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';

import '@/styles/components/login-form.scss';

import BaseDialog from '@/components/base/BaseDialog';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { login } from '@/store/auth.store';

import { isApiError } from '@/app/utils/error';
import { loginRequest } from '@/requests/auth/loginRequest';

import { ISelect } from '@/types/common/components';
import { ILoginType } from '@/types/model/auth';

export default function LoginPage() {
  const [dataLogin, setDataLogin] = useState<ILoginType>({
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
  const [language, setLanguage] = useState('en');
  const languageList = [
    { name: 'EngLish', value: 'en' },
    { name: 'Viet Nam', value: 'vi' },
    { name: 'Japan', value: 'ja' },
  ];
  const dispatch = useDispatch();

  const [cookies, setCookie] = useCookies(['userId', 'userRole']);

  const selectedStatus = languageList.find((item) => item.value === language);

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => {
    setDataLogin((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = () => {
    setDialogList((prev) => ({
      ...prev,
      visible: false,
    }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      username: dataLogin.username,
      password: dataLogin.password,
    };
    try {
      const response = await loginRequest(payload);
      const userId = response.userId;
      const userRole = response.userRole;

      setCookie('userId', userId);
      setCookie('userRole', userRole);

      window.location.href = '/';
      setDataLogin({
        username: '',
        password: '',
      });

      dispatch(login(userId));
    } catch (error: unknown) {
      let message = '';
      if (isApiError(error)) {
        message = error.message;
      }
      setDialogList((prev) => ({
        ...prev,
        visible: true,
        message,
        title: 'Error',
        submitBtn: 'Submit',
      }));
    }
  };

  return (
    <div className="flex h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-center text-4xl font-bold text-[var(--color-01)]">
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
                  onChange={(e) => handleChangeInput(e, 'username')}
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
                  onChange={(e) => handleChangeInput(e, 'password')}
                  className="pl-10"
                />
              </div>
              <div>
                <Button type="submit" size="full">
                  Sign in
                </Button>
              </div>
            </form>
            <div className="mt-6 flex items-center justify-center gap-4">
              <div className="mb-2 text-sm text-[var(--color-01)]">
                Language
              </div>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-full">
                  <SelectValue>
                    {selectedStatus && (
                      <div className="flex items-center gap-2">
                        <span>{selectedStatus.name}</span>
                      </div>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {languageList.map((item: ISelect, index) => (
                      <SelectItem key={index} value={item.value}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <div>
              <Link
                href={{ pathname: '/forgot-password' }}
                className="mt-10 text-center text-sm text-[var(--color-01)] hover:underline"
              >
                Forget Password?
              </Link>
              <p className="dark:text-dark-6 text-sm text-gray-500">
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
      <BaseDialog dialogList={dialogList} onSubmit={handleSubmit} />
    </div>
  );
}
