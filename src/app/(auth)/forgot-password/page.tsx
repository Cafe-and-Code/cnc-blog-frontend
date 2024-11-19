'use client';

import { Mail } from 'lucide-react';
import React from 'react';
import { useState } from 'react';

import BaseDialog from '@/components/base/BaseDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [dialogList, setDialogList] = useState({
    visible: false,
    message: '',
    title: '',
    submitBtn: 'Submit',
  });

  const handleForgotPassword = () => {

  }

  const handleSubmit = () => {
    setDialogList((prev) => ({
      ...prev,
      visible: false,
    }))
  }

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
              Forgot Password
            </h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleForgotPassword} className="space-y-6">
              <div className="relative">
                <Mail className="absolute inset-y-2 left-2" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Email"
                  autoComplete="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div>
                <Button type="submit" size="full">
                  Send
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
  )
}