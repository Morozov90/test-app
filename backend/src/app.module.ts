import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Models } from './models';
import { Controllers } from './controllers';
import { Services, AuthService } from './services';
import { JwtStrategy } from './common/auth';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwt } from './constants';
const { secret, expiresIn } = jwt;
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env` }),
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_HOSTNAME || 'localhost'}:${
        process.env.MONGO_PORT
      }`,
      {
        dbName: 'my-app',
      },
    ),
    MongooseModule.forFeature(Models),
    PassportModule,
    JwtModule.register({
      secret,
      signOptions: { expiresIn },
    }),
  ],
  controllers: [...Controllers],
  providers: [...Services, JwtStrategy],
  exports: [AuthService],
})
export class AppModule {}
