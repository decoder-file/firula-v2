import { Label } from '@radix-ui/react-label'
import Image from 'next/image'
import React from 'react' // Add this line

import FirulaLogo from '@/assets/logo-green.png'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function SignInPage() {
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

      <Button className="w-full bg-primary" type="submit">
        Entrar
      </Button>
    </form>
  )
}
