import { JwtProtocols } from '@/data/protocols/jwt/jwt-protocol'
import { FindOneUser } from '@/data/protocols/user/user-protocols'
import { BusinessError } from '@/domain/errors/business-error'
import { LoginModel } from '@/domain/models/login/login-model'
import { LoginProtocol } from '@/domain/protocols/login/login-protocols'

export class LogUser implements LoginProtocol {
  constructor (
    private readonly userRepository: FindOneUser,
    private readonly jwtAdapter: JwtProtocols
  ) { }

  async login (params: LoginModel.Input): Promise<LoginModel.Output> {
    const user = await this.userRepository.findOne(params.email)

    if (!user) {
      throw new BusinessError('Usuário não encontrado')
    }

    return {
      email: user.email,
      token: await this.jwtAdapter.signToken(user)
    }
  }
}
