'use client';

import React from 'react';
import Link from 'next/link'
import { useState } from 'react';
import axios from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Lock, UserRound, Mail, UserRoundPlus, Calendar } from 'lucide-react';
import { BaseDatePicker } from '@/components/base/BaseDatePicker';
import { API_URL } from '@/app/constant/api-config';

type CreateAccountType = {
  username: string;
  password: string | number;
  confirmPassword: string | number,
  fullName: string,
  email: string,
  avatarImageUrl: string
  //checkAgree: boolean;
};

export default function CreateAccountPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const cloneCreateAccount = {
    username: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    email: '',
    avatarImageUrl: ''
  }
  const [dataCreateAccount, setDataCreateAccount] = useState<CreateAccountType>({...cloneCreateAccount});

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setDataCreateAccount((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const changeDate = (e: any) => {
    console.log(e);
    setDate(e)
  }

  const handleCreateAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      username: dataCreateAccount.username,
      password: dataCreateAccount.password,
      confirmPassword: dataCreateAccount.confirmPassword,
      fullName: dataCreateAccount.fullName,
      email: dataCreateAccount.email,
      dateOfBirth: date,
      avatarImageUrl: dataCreateAccount.avatarImageUrl
    }
    console.log(payload);
    try {
      const response = await axios.post(API_URL.CREATE_USER, payload);
      const data = response.data;

      window.location.href = '/login';
      setDataCreateAccount({
        username: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        email: '',
        avatarImageUrl: ''
      });
    } catch (error) {
      console.error('Error posting data:', error);
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
            <form onSubmit={handleCreateAccount} className="space-y-6">
              <div className="relative">
                <UserRound className="absolute inset-y-2 left-2" />
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  placeholder="Username"
                  autoComplete="username"
                  value={dataCreateAccount.username}
                  onChange={e => handleChangeInput(e, 'username')}
                  className="pl-10"
                />
              </div>
              <div className="relative">
                <UserRoundPlus className="absolute inset-y-2 left-2" />
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  placeholder="Full Name"
                  autoComplete="fullName"
                  value={dataCreateAccount.fullName}
                  onChange={e => handleChangeInput(e, 'fullName')}
                  className="pl-10"
                />
              </div>
              <div className="relative">
                <Mail className="absolute inset-y-2 left-2" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Email"
                  autoComplete="email"
                  value={dataCreateAccount.email}
                  onChange={e => handleChangeInput(e, 'email')}
                  className="pl-10"
                />
              </div>
              <div className="relative">
              {/* <Calendar className="absolute inset-y-2 left-2" /> */}
              <BaseDatePicker selectDate={date} onChange={changeDate}/>
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
                  value={dataCreateAccount.password}
                  onChange={e => handleChangeInput(e, 'password')}
                  className="pl-10"
                />
              </div>
              <div className="relative">
                <Lock className="absolute inset-y-2 left-2" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  placeholder="Confirm Password"
                  autoComplete="confirm-password"
                  value={dataCreateAccount.confirmPassword}
                  onChange={e => handleChangeInput(e, 'confirmPassword')}
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
        </Card>
      </div>
    </div>
  );
}