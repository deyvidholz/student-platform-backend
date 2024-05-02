import { CorsOptions, CorsOptionsDelegate } from 'cors';

const { env } = process;

export default {
  origin: env.CONFIG_CORS_ORIGIN || '*',
} as CorsOptions | CorsOptionsDelegate;
