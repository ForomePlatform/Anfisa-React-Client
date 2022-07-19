import dotenv from 'dotenv'

export default (on: any, config: any) => {
  dotenv.config({
    path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env',
  })

  config.env.basic_username = process.env.BASIC_AUTH_USERNAME
  config.env.basic_password = process.env.BASIC_AUTH_PASSWORD
  config.env.basic_url = process.env.BASIC_URL

  return config
}
