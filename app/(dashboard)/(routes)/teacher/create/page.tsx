'use client'
import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import toast from "react-hot-toast"

const formSchema = z.object({
  title: z.string().min(1, { message: "Título é obrigatório" }),
})

const CreatePage = () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post('/api/courses', values)
      router.push(`/teacher/courses/${response.data.id}`)
    } catch {
      toast.error('Aconteceu um erro inesperado')
      console.error('Aconteceu um erro inesperado')
    }
  }
  return (
    <div className="flex h-full max-w-5xl p-6 mx-auto md:items-center md:justify-center">
      <div>
        <h1 className="text-2xl">
          Name your course
        </h1>
        <p className="text-sm text-slate-600">
          Você gostaria de dizer o nome do seu novo curso? Não se preocupe, você pode alterar isso depois.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nome do curso
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Introdução a Ciência da Computação"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Oque você vai ensinar neste curso?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href="/">
                <Button
                  type="button"
                  variant="ghost"
                >
                  Cancelar
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={isSubmitting || !isValid}
              >
                Continuar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default CreatePage