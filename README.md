# MCP Server — Testing & Configuration

## 1. Run MCP Inspector

Una vez creado el MCP Server, podemos utilizar **MCP Inspector** para probarlo y debuggearlo localmente.

Ejecutar:

```bash
npx @modelcontextprotocol/inspector@latest
```

Esto levanta **MCP Inspector**, que proporciona una interfaz cliente local para conectarse al MCP Server y probar sus herramientas, recursos y demás funcionalidades.

Por defecto, MCP Inspector se encuentra disponible en:

```text
http://localhost:6274
```

### Agregar nuestro MCP Server

Dentro de MCP Inspector:

1. Seleccionar **Add Servers**.
2. Agregar un nuevo servidor de tipo **STDIO**.
3. Configurar el servidor con el comando necesario para ejecutar nuestro MCP.

Por ejemplo, si utilizamos `tsx`:

```text
Command:
npx

Arguments:
tsx
src/index.ts
```

Esto es equivalente a ejecutar:

```bash
npx tsx src/index.ts
```

### Working Directory

Si el proyecto tiene una estructura similar a:

```text
model-context-protocol/
├── package.json
├── node_modules/
└── src/
    └── index.ts
```

podemos configurar el **Working Directory** con la ruta del proyecto:

```text
C:\Users\ignac\OneDrive\Documentos\GitHub\model-context-protocol
```

Y utilizar:

```text
Command:
npx

Arguments:
tsx
src/index.ts
```

También podemos utilizar la ruta absoluta al archivo:

```text
Command:
npx

Arguments:
tsx
C:\ruta\al\proyecto\src\index.ts
```

> **Importante:** `npx` debe estar configurado como `Command` y `tsx` como uno de los `Arguments`. No debemos poner `tsx` como `Command` y volver a incluir `tsx` dentro de los argumentos.

Una vez configurado, activar el servidor mediante el toggle.

Si la conexión es correcta, MCP Inspector permitirá probar y debuggear las herramientas (`Tools`), recursos (`Resources`), prompts y demás capacidades expuestas por nuestro MCP Server.

---

## 2. Probar el MCP con un cliente de IA

Una vez que todo funciona correctamente con MCP Inspector, podemos probar el servidor utilizando un cliente de IA compatible con MCP, por ejemplo:

- Claude Code
- Claude Desktop

### Claude Desktop

En **Claude Desktop**:

1. Abrir **Settings**.
2. Ir a la pestaña **Developer**.
3. Seleccionar **Edit Config** para abrir:

```text
claude_desktop_config.json
```

4. Dentro de `mcpServers`, registrar nuestro MCP Server.

Por ejemplo:

```json
{
  "mcpServers": {
    "weather-mcp": {
      "command": "npx",
      "args": [
        "tsx",
        "C:/ruta/al/proyecto/weather-mcp/server.ts"
      ]
    }
  }
}
```

### Configuración

En este ejemplo:

- `weather-mcp` → nombre con el que identificaremos nuestro MCP Server.
- `command` → comando utilizado para ejecutar el servidor.
- `npx` → ejecuta el comando sin necesidad de instalarlo globalmente.
- `args` → argumentos que recibe `npx`.
- `tsx` → permite ejecutar directamente el archivo TypeScript.
- `C:/ruta/al/proyecto/weather-mcp/server.ts` → ruta al archivo principal del MCP Server.

> **Importante:** reemplazar la ruta del ejemplo por la ruta al archivo principal del MCP Server.

Después de guardar la configuración, reiniciar Claude Desktop para que detecte el MCP Server.

---

## Flujo recomendado

El flujo de desarrollo recomendado es:

```text
MCP Server
    ↓
MCP Inspector
    ↓
Agregar servidor STDIO
    ↓
Probar Tools / Resources / Prompts
    ↓
Verificar que todo funciona
    ↓
Claude Desktop / Claude Code
    ↓
Registrar el MCP Server
    ↓
Probar el MCP desde el cliente de IA
```

Primero conviene asegurarse de que el servidor funciona correctamente con **MCP Inspector**.

Una vez validado, podemos conectarlo a un cliente de IA como **Claude Desktop** o **Claude Code** para probar la integración completa.