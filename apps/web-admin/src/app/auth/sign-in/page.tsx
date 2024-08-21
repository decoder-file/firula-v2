import Image from 'next/image'
import React from 'react'

import LogoFirula from '@/assets/logo-green.png'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function SignInPage() {
  return (
    <form action="" className="space-y-4">
      <div className="flex justify-center">
        <Image src={LogoFirula} alt="Firula Icon" className="size-24 " />
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
