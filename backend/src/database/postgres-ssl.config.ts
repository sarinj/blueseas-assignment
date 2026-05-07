export type PostgresSslConfig = boolean | { rejectUnauthorized: boolean };
export type PostgresExtraConfig = { enableChannelBinding?: boolean };

export function getPostgresSslConfig(
  databaseUrl: string,
  databaseSsl?: string | boolean,
): PostgresSslConfig | undefined {
  const sslMode = getSslMode(databaseUrl);

  if (sslMode === 'disable') {
    return false;
  }

  if (sslMode) {
    return undefined;
  }

  if (databaseSsl === true || databaseSsl === 'true') {
    return { rejectUnauthorized: false };
  }

  return false;
}

export function getPostgresExtraConfig(databaseUrl: string): PostgresExtraConfig {
  if (getChannelBinding(databaseUrl) === 'require') {
    return { enableChannelBinding: true };
  }

  return {};
}

function getSslMode(databaseUrl: string): string | undefined {
  try {
    return new URL(databaseUrl).searchParams.get('sslmode') ?? undefined;
  } catch {
    return undefined;
  }
}

function getChannelBinding(databaseUrl: string): string | undefined {
  try {
    return new URL(databaseUrl).searchParams.get('channel_binding') ?? undefined;
  } catch {
    return undefined;
  }
}
