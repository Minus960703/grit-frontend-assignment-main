// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

/**
 * DO NOT MODIFY THIS FILE
 */

import { createServer, Factory, Model, Response } from 'miragejs'
import { faker } from '@faker-js/faker'
import { z } from 'zod'

enum UserRoles {
  ADMIN = 'ADMIN',
  USER = 'USER',
  GUEST = 'GUEST',
}

const GetUsersQuerySchema = z.object({
  page: z.coerce.number().optional().default(1),
  perPage: z.coerce.number().optional().default(5),
  role: z.nativeEnum(UserRoles).optional(),
})

const PatchUserSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  role: z.nativeEnum(UserRoles).optional(),
  telephone: z.string().optional(),
})

const PostUserRoleSchema = z.object({
  ids: z.array(z.string()),
})

export default function () {
  createServer({
    models: {
      user: Model,
    },
    seeds(server) {
      server.createList('user', 30)
    },
    factories: {
      user: Factory.extend({
        firstName: () => faker.person.firstName(),
        lastName: () => faker.person.lastName(),
        email: () => faker.internet.email(),
        role: () => faker.helpers.enumValue(UserRoles),
        telephone: () => faker.phone.number('###-####-####'),
      }),
    },
    routes() {
      this.namespace = 'api'
      this.get('/users', (schema, request) => {
        try {
          const { page, perPage, role } = GetUsersQuerySchema.parse(
            request.queryParams
          )
          const filteredUsers = schema.users
            .all()
            .filter((user) => (role ? user.role === role : true))

          const maxPage = Math.ceil(filteredUsers.length / perPage)

          if (page > maxPage || page < 1) {
            return new Response(400, {}, { message: 'Invalid page' })
          }

          const users = filteredUsers.slice(
            (page - 1) * perPage,
            page * perPage
          )

          return new Response(
            200,
            {},
            {
              users: users.models,
              page,
              perPage,
              total: filteredUsers.length,
            }
          )
        } catch (e) {
          if (e instanceof z.ZodError) {
            return new Response(400, {}, { message: e.errors })
          }
          return new Response(500, {}, { message: 'Internal Server Error' })
        }
      })

      this.patch('/users/:id', (schema, request) => {
        try {
          const id = request.params.id
          const attrs = PatchUserSchema.parse(JSON.parse(request.requestBody))
          const user = schema.users.find(id)
          user.update(attrs)
          return user
        } catch (e) {
          if (e instanceof z.ZodError) {
            return new Response(400, {}, { message: e.errors })
          }
          return new Response(500, {}, { message: 'Internal Server Error' })
        }
      })

      this.post('/users/change-role-user', (schema, request) => {
        try {
          const attrs = PostUserRoleSchema.parse(
            JSON.parse(request.requestBody)
          )
          const users = schema.users.find(attrs.ids)
          users.update({ role: UserRoles.USER })
          return new Response(200, {}, { message: 'Success' })
        } catch (e) {
          if (e instanceof z.ZodError) {
            return new Response(400, {}, { message: e.errors })
          }
          return new Response(500, {}, { message: 'Internal Server Error' })
        }
      })
    },
  })
}
