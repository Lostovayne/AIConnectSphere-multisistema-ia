import { experimental_createMCPClient } from 'ai';
import { Experimental_StdioMCPTransport } from 'ai/mcp-stdio';

async function connectToMCPServer() {
  try {
    console.log('Iniciando conexión al servidor MCP...');
    const mcpClient = await experimental_createMCPClient({
      transport: new Experimental_StdioMCPTransport({
        command: 'npx',
        args: ['-y', '@upstash/context7-mcp@1.0.6'], // Versión específica
      }),
    });
    console.log('Conexión al servidor MCP establecida.');
    return mcpClient;
  } catch (error) {
    console.error('Error al conectar con el servidor MCP:', error);
    throw error;
  }
}

export async function getMCPTools() {
  try {
    const mcpClient = await connectToMCPServer();
    console.log('Obteniendo herramientas del servidor MCP...');
    const tools = await mcpClient.tools();
    console.log('Herramientas disponibles:', tools);
    return { mcpClient, tools };
  } catch (error) {
    console.error('Error al obtener herramientas:', error);
    throw error;
  }
}