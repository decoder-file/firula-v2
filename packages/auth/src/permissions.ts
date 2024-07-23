import { AbilityBuilder } from '@casl/ability'

import { AppAbility } from '.'
import { User } from './models/user'
import { Role } from './roles'

type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>,
) => void

export const permissions: Record<Role, PermissionsByRole> = {
  ADMIN(_, { can }) {
    can('manage', 'all')
  },
  OWNER(user, { can, cannot }) {
    can('manage', 'all')

    cannot(['transfer_ownership', 'update'], 'Organization')
    can(['transfer_ownership', 'update'], 'Organization', {
      ownerId: { $eq: user.id },
    })
  },
  SECRETARY(_, { can }) {
    can(['create', 'get'], 'Class')
    can('create', 'Class')
  },
  PROFESSOR(user, { can }) {
    can('create', 'Class')
    can(['create', 'get'], 'Class')
    can(['update', 'delete'], 'Class', { ownerId: { $eq: user.id } })
  },
  CUSTOMER(_, { can }) {
    can('create', 'Class')
  },
}
