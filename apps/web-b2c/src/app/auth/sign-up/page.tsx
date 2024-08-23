import Image from 'next/image'
import Link from 'next/link'
import React from 'react' // Add this line

import FirulaLogo from '@/assets/logo-green.png'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { signUp } from './actions'

export default function SignUnPage() {
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
            Criar sua conta Firula
          </h1>
          <p className="text-sm text-muted-foreground">
            Comece a fazer suas reservas de quadras de forma fácil e rápida.
          </p>
        </div>

        <form className="space-y-4" action={signUp}>
          <div className="flex justify-between gap-2">
            <div className="w-full space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input name="name" type="name" id="name" />
            </div>
            <div className="w-full space-y-2">
              <Label htmlFor="lastName">Sobrenome</Label>
              <Input name="lastName" type="lastName" id="lastName" />
            </div>
          </div>
          <div className="flex justify-between gap-2">
            <div className="w-full space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input name="phone" type="phone" id="phone" />
            </div>
            <div className="w-full space-y-2">
              <Label htmlFor="email">CPF</Label>
              <Input name="cpf" type="cpf" id="cpf" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input name="email" type="email" id="email" />
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
            Criar conta
          </Button>
        </form>

        <footer className="flex justify-center gap-1">
          <Link
            href="/auth/sign-in"
            className="flex cursor-pointer gap-1 text-sm font-semibold text-primary"
          >
            <Label className="text-sm font-semibold text-white">
              Já tem uma conta Firula?
            </Label>
            Acessar conta
          </Link>
        </footer>
      </div>
    </div>
  )
}
