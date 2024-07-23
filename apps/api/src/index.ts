import { classSchema, defineAbilityFor } from '@saas/auth'

const ability = defineAbilityFor({ role: 'PROFESSOR', id: 'user-id' })

const project = classSchema.parse({ id: 'project-id', ownerId: 'user-id' })

console.log(ability.can('get', 'Class'))
console.log(ability.can('delete', project))
console.log(ability.can('update', project))
