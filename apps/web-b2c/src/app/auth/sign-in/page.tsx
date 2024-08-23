import Image from 'next/image'
import Link from 'next/link'
import React from 'react' // Add this line

import FirulaLogo from '@/assets/logo-green.png'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { signInWithEmailAndPassword } from './actions'

export default function SignInPage() {
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
            Acessar Firula
          </h1>
          <p className="text-sm text-muted-foreground">
            Faça suas reservas de quadras de forma fácil e rápida.
          </p>
        </div>

        <form className="space-y-4" action={signInWithEmailAndPassword}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input name="email" type="email" id="email" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input name="password" type="password" id="password" />

            <div className="text-right">
              <Link
                href="/auth/forgot-password"
                className="cursor-pointer text-xs font-normal text-primary"
              >
                Esqueceu senha sua senha?
              </Link>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Entrar
          </Button>
        </form>

        <footer className="flex justify-center gap-1">
          <Link
            href="/auth/sign-up"
            className="flex cursor-pointer gap-1 text-sm font-semibold text-primary"
          >
            <Label className="text-sm font-semibold text-white">
              Não tem uma conta ainda?
            </Label>
            Inscrever-se
          </Link>
          <a></a>
        </footer>
      </div>
    </div>
  )
}
