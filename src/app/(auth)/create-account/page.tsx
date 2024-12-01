'use client';

import dayjs from 'dayjs'
import { Calendar, Lock, Mail, UserRound, UserRoundPlus, Users } from 'lucide-react';
import React from 'react';
import { useState } from 'react';

import axios from '@/lib/axios';

import BaseDialog from '@/components/base/BaseDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import UploadImage from '@/components/uploadImage';

import { API_URL } from '@/app/constant/api-config';
import { DATE_FORMAT } from '@/app/constant/constants';

type CreateAccountType = {
  username: string;
  password: string | number;
  confirmPassword: string | number,
  fullName: string,
  email: string,
  dateOfBirth: string,
  avatarImageUrl: string
  //checkAgree: boolean;
};

type GenderType = {
  name: string,
  value: string
}

export default function CreateAccountPage() {
  const [dialogList, setDialogList] = useState({
    visible: false,
    message: '',
    title: '',
    submitBtn: 'Submit',
  });

  const cloneCreateAccount = {
    username: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    email: '',
    dateOfBirth: '',
    avatarImageUrl: ''
  }

  const listGender = [
    { name: 'Male', value: 'Male' },
    { name: 'Female', value: 'Female' },
    { name: 'LGBT', value: 'LGBT' },
  ]

  const [dataCreateAccount, setDataCreateAccount] = useState<CreateAccountType>({ ...cloneCreateAccount });

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setDataCreateAccount((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = () => {
    setDialogList((prev) => ({
      ...prev,
      visible: false,
    }))
  }

  const handleUploadImage = async (file: any) => {
    setDataCreateAccount((prev) => ({ ...prev, avatarImageUrl: file }))
  }

  const handleCreateAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      username: dataCreateAccount.username,
      password: dataCreateAccount.password,
      confirmPassword: dataCreateAccount.confirmPassword,
      fullName: dataCreateAccount.fullName,
      email: dataCreateAccount.email,
      dateOfBirth: dayjs(dataCreateAccount.dateOfBirth).format(DATE_FORMAT.SERVER_DATE),
      avatarImageUrl: dataCreateAccount.avatarImageUrl
    }
    try {
      await axios.post(API_URL.CREATE_USER, payload);
      window.location.href = '/login';
      setDataCreateAccount({
        username: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        email: '',
        dateOfBirth: '',
        avatarImageUrl: ''
      });
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
        <Card>
          <CardHeader>
            <h2 className="text-center text-xl font-bold leading-9 tracking-tight text-[var(--color-01)]">
              Create new account
            </h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateAccount} className="space-y-6">
              <div className="relative">
                <UploadImage isAvatar classCustom='h-[80px] w-[80px] rounded-[50%] mb-[30px] mx-auto' onChange={handleUploadImage} />
              </div>
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
                <Users className="absolute inset-y-2 left-2" />
                <Select>
                  <SelectTrigger className="w-full pl-10">
                    <SelectValue placeholder="Select a gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {listGender.map((item: GenderType, index) => (
                        <SelectItem key={index} value={item.value}>{item.name}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
                <Calendar className="absolute inset-y-2 left-2" />
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  required
                  placeholder="Date Of Birth"
                  autoComplete="dateOfBirth"
                  value={dataCreateAccount.dateOfBirth}
                  onChange={e => handleChangeInput(e, 'dateOfBirth')}
                  className="pl-10 "
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
                  Create Account
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <BaseDialog
        dialogList={dialogList}
        onSubmit={handleSubmit}
      />
    </div>
  );
}