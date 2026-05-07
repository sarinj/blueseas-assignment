type Environment = Record<string, string | undefined>

export function validateEnvironment(config: Environment) {
  const requiredVariables = ["DATABASE_URL"]
  const missingVariables = requiredVariables.filter((key) => !config[key])

  if (missingVariables.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVariables.join(", ")}`,
    )
  }

  return {
    ...config,
    DATABASE_URL: config.DATABASE_URL!,
  }
}
