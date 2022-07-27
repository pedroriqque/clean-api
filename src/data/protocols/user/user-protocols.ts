import { UserModel } from '@/domain/models/user/user-model'

export interface FindAllUsers {
  findAll: () => Promise<Array<UserModel.Output>>
}

export interface FindOneUser {
  findOne: (email: string) => Promise<UserModel.Output>
}
