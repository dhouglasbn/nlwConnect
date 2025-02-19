import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { subscribeToEvent } from '../functions/subscribe-to-event'

export const subscribeToEventRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/subscriptions',
    {
      // schema zod
      schema: {
        summary: 'Subscribes someone to the event', // Especificação do doc swagger
        tags: ['Subscription'],
        description: 'Registrar um usuário',
        body: z.object({
          // Especificando a validação do zod do corpo da requisição
          name: z.string(),
          email: z.string().email(),
        }),
        response: {
          // Especificando a validação do zod do corpo da resposta
          201: z.object({
            subscriberId: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email } = request.body

      const { subscriberId } = await subscribeToEvent({
        name,
        email,
      })

      return reply.status(201).send({
        subscriberId,
      })
    }
  )
}
