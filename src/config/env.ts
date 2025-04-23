// Helpers para variáveis de ambiente
export const getEnv = (key: string, fallback?: string): string => {
  const value = process.env[key];
  if (!value) {
    if (fallback !== undefined) return fallback;
    throw new Error(`Variável de ambiente não encontrada: ${key}`);
  }
  return value;
};
