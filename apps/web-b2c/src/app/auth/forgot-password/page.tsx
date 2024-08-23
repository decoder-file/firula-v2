'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import FirulaLogo from '@/assets/logo-green.png'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ForgotPasswordPage() {
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
            Insira seu email para recuperar sua senha.
          </p>
        </div>

        <form className="space-y-4">
          <div className="mb-3 space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input name="email" type="email" id="email" />
          </div>

          <Link href="/auth/forgot-password/new-password">
            <Button type="submit" className="w-full">
              Enviar
            </Button>
          </Link>
        </form>
      </div>
    </div>
  )
}
