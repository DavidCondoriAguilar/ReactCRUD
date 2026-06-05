import { ApiWebURL } from "../config/constants";

/**
 * Cliente API centralizado para manejar peticiones de red
 */
export const apiClient = {
  /**
   * Realiza una petición GET
   * @param {string} endpoint - Ruta del servicio (ej. "directores.php")
   * @param {object} [options] - Opciones adicionales (signal, timeout)
   * @returns {Promise<any>}
   */
  async get(endpoint, options = {}) {
    const url = endpoint.startsWith("http") ? endpoint : `${ApiWebURL}${endpoint}`;
    const controller = new AbortController();
    const timeout = options.timeout || 15000;
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    try {
      const response = await fetch(url, {
        signal: options.signal || controller.signal,
      });
      clearTimeout(timeoutId);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === "AbortError") throw error;
      console.error(`Error en GET ${url}:`, error);
      throw error;
    }
  },

  /**
   * Realiza una petición POST
   * @param {string} endpoint - Ruta del servicio (ej. "directoresinsert.php")
   * @param {FormData|object} data - Datos a enviar
   * @returns {Promise<any>}
   */
  async post(endpoint, data) {
    const url = endpoint.startsWith("http") ? endpoint : `${ApiWebURL}${endpoint}`;
    try {
      let body;
      const headers = {};

      if (data instanceof FormData) {
        body = data;
        // fetch infiere el Content-Type para FormData automáticamente (incluyendo boundary)
      } else {
        body = JSON.stringify(data);
        headers["Content-Type"] = "application/json";
      }

      const response = await fetch(url, {
        method: "POST",
        headers,
        body,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error en POST ${url}:`, error);
      throw error;
    }
  }
};
