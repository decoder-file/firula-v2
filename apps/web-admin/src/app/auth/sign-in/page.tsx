'use client'

import { Label } from '@radix-ui/react-label'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

import FirulaLogo from '@/assets/logo-green.png'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function SignInPage() {
  const router = useRouter()

  const handleSignIn = () => {
    router.push('/main/home')
  }
  return (
    <form action="" className="space-y-4">
      <div className="flex justify-center">
        <Image src={FirulaLogo} alt="" className="size-24" />
      </div>
      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input name="email" type="email" id="email" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Senha</Label>
        <Input name="password" type="password" id="password" />
      </div>

      <Button
        className="w-full bg-primary"
        type="submit"
        onClick={handleSignIn}
      >
        Entrar
      </Button>
    </form>
  )
}
