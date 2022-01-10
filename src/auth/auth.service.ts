import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { User } from './schemas/user.schema';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as bcrypt from 'bcrypt';
import APIFeatures from 'src/utils/apiFeatures.utils';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService
    ){}

    //Register user
    async signup(signUpDto: SignUpDto): Promise<User> {
        const { name, email, password } = signUpDto;
        const userDB = await this.userModel.findOne({email});
        if(userDB){
            throw new NotFoundException('El email ya existe');
        }
        const hash = await bcrypt.hash(password, 10)
        try {
            const user = await this.userModel.create({
                name, 
                email, 
                password: hash
            })
            return user;
        } catch(e) {
            console.log(e);
        }
    }

    async login(loginDto: LoginDto):Promise<{ token: string }> {
        const { email, password } = loginDto;
        const user = await this.userModel.findOne({email}).select('password');
        //console.log('USER', user);
        
        if(!user){
            throw new UnauthorizedException('Password o constraseña inválida 1');
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if(!isPasswordMatched){
            throw new UnauthorizedException('Password o constraseña inválida 2');
        }

        const token = await APIFeatures.assignJwtToken(user._id, this.jwtService);
        return {token};
    }
}
