import passport from 'passport';
import passportJWT from 'passport-jwt';
import { InitFunctionParam } from 'src/global/typing';
import { User } from './user.entity';
import { JWTPayload } from './user.typing';

export default function (params: InitFunctionParam) {
  const { app, dataSource } = params;
  const extractJWT = passportJWT.ExtractJwt;
  const JWTStrategy = passportJWT.Strategy;

  const JWTOptions = {
    secretOrKey: process.env.JWT_SECRET_KEY,
    jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
  };

  let strategy = new JWTStrategy(JWTOptions, async function (
    payload: JWTPayload,
    next
  ) {
    const id = payload.id;
    const user = await dataSource
      .getRepository(User)
      .findOne({ where: { id } });

    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  });

  passport.use(strategy);
  app.use(passport.initialize());
}
