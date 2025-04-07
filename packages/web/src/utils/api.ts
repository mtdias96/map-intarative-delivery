/**
 * URL base da API, obtida das variáveis de ambiente
 */
export const API_URL = import.meta.env.VITE_API_URL;

/**
 * Função de exemplo para fazer requisições à API
 */
export const fetchFromApi = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  const url = `${API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });
  
  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`);
  }
  
  return response.json() as Promise<T>;
}; 