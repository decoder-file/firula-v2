import Image from 'next/image'
import React from 'react' // Add this line

import FirulaLogo from '@/assets/logo-green.png'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ForgotPasswordNewPasswordPage() {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex max-w-max flex-col justify-center gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <Image
            src={FirulaLogo}
            alt="Logo Firula"
            className="w-20 md:hidden"
          />
          <h1 className="text-2xl font-semibold tracking-tight">
            Esqueceu sua senha?
          </h1>
          <p className="text-sm text-muted-foreground">
            Insira seu token e a nova senha.
          </p>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="token">Token</Label>
            <Input name="token" type="token" id="token" />
          </div>

          <div className="flex justify-between gap-2">
            <div className="w-full  space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input name="password" type="password" id="password" />
            </div>
            <div className="w-full space-y-2">
              <Label htmlFor="confirmPassword">Confirmar senha</Label>
              <Input
                name="confirmPassword"
                type="confirmPassword"
                id="confirmPassword"
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            trocar senha
          </Button>
        </form>
      </div>
    </div>
  )
}
