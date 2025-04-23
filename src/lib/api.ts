// Funções utilitárias para integração com APIs externas
export async function fetchApi<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error('Erro ao buscar API');
  return res.json();
}
