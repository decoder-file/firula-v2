import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import React from 'react'
import { createTypeBlock } from '../../services/type-block'

const createTypeBlockForm = z.object({
  name: z.string().min(2, 'Nome é obrigatório').max(255, 'Nome muito longo'),
})

type CreateTypeBlockForm = z.infer<typeof createTypeBlockForm>

export default function CreateTypeBlockPage() {
  const navigate = useNavigate()

  const [loading, setLoading] = React.useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm<CreateTypeBlockForm>({
    resolver: zodResolver(createTypeBlockForm),
  })

  async function handleSubmitCreateTypeBlock(data: CreateTypeBlockForm) {
    setLoading(true)
    const response = await createTypeBlock(data)
    if (response.success) {
      toast.success('Tipo de quadra criado com sucesso!')
      navigate('/type-block')
    }
    setLoading(false)
  }

  return (
    <>
      <Helmet title="Quadras" />
      <div className="w-full">
        <form
          className="max-w-xs space-y-4"
          onSubmit={handleSubmit(handleSubmitCreateTypeBlock)}
        >
          <div className="space-y-2">
            <Label htmlFor="email">Nome</Label>
            <Input id="name" {...register('name')} />
            {errors.name && (
              <span className="text-xs text-red-600">
                {errors.name.message}
              </span>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || loading || !isValid}
          >
            Criar
          </Button>
        </form>
      </div>
    </>
  )
}
