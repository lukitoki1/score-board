import { Env } from "../values/env";

export const useEnv = () => {
  const apiURL = process.env[Env.API_URL] || ''

  return { apiURL }
}