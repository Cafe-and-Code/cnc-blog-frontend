'use client';

import React from 'react';
import Link from 'next/link'
import { useState } from 'react';
import axios from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';
import BaseDialog from '@/components/base/BaseDialog';

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('')
    const [title, setTilte] = useState('')

    const handleForgotPassword = () => {

    }

    const handleSubmit = () => {
        setIsOpen(false)
    }

    return (
        <div className="flex h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
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
          title={title}
          visible={isOpen}
          message={message}
          submitBtn='Submit'
          onSubmit={handleSubmit}
        />
      </div>
    )
}