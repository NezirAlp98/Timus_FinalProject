import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { Users } from "src/users/users.model";
import { LoginDto } from "./dto/login.dto";
import { RefreshTokenDto } from "./dto/refresh-token.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<Users> {
    // find the user by email
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // compare the password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return user;
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string; refresh_token: string }> {
    // validate the user credentials
    const user = await this.validateUser(loginDto.email, loginDto.password);

    // generate the access token and the refresh token
    const payload = { email: user.email, sub: user.id };
    const access_token = this.jwtService.sign(payload);
    const refresh_token = this.jwtService.sign(payload, { expiresIn: '7d' });

    return { access_token, refresh_token };
  }

  async refresh(refreshTokenDto: RefreshTokenDto): Promise<{ access_token: string }> {
    // verify the refresh token
    const payload = this.jwtService.verify(refreshTokenDto.refresh_token);

    // generate a new access token
    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }
}