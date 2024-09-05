import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import React from 'react'
import { getByIdTypeBlock, updateTypeBlock } from '../../services/type-block'
import { ScreenLoading } from '../../components/screen-loading'

const createTypeBlockForm = z.object({
  name: z.string().min(2, 'Nome é obrigatório').max(255, 'Nome muito longo'),
})

type CreateTypeBlockForm = z.infer<typeof createTypeBlockForm>

export default function UpdateTypeBlockPage() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [loading, setLoading] = React.useState<boolean>(false)
  const [getTypeBlockLoading, setGetTypeBlockLoading] =
    React.useState<boolean>(true)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors, isValid },
  } = useForm<CreateTypeBlockForm>({
    resolver: zodResolver(createTypeBlockForm),
  })

  async function handleSubmitCreateTypeBlock(data: CreateTypeBlockForm) {
    setLoading(true)
    const response = await updateTypeBlock({
      typeBlockId: id || '',
      name: data.name,
    })

    if (response.success) {
      toast.success('Tipo de quadra atualizado com sucesso!')
      navigate('/type-block')
    }
    setLoading(false)
  }

  async function getTypeBlock() {
    const response = await getByIdTypeBlock({ typeBlockId: id || '' })
    if (
      !response.typeBlock ||
      (Array.isArray(response.typeBlock) && response.typeBlock.length === 0)
    ) {
      toast.error('Tipo de quadra não encontrado!')
      setGetTypeBlockLoading(false)
    }
    if (Array.isArray(response.typeBlock)) {
      setValue('name', '')
    } else {
      setValue('name', response.typeBlock.name || '')
    }

    setGetTypeBlockLoading(false)
  }

  React.useEffect(() => {
    getTypeBlock()
  }, [])

  return (
    <>
      <Helmet title="Quadras" />
      <div className="w-full">
        {getTypeBlockLoading ? (
          <ScreenLoading />
        ) : (
          <>
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
                Salvar
              </Button>
            </form>
          </>
        )}
      </div>
    </>
  )
}
