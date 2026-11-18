# Auditoría inicial de Libra — Samuel Store 2.0

Fecha: 2026-11-18. Alcance: inspección estática parcial, **sin ejecutar código**.

## Origen y aislamiento
- Fuente: vaoan/Libra, rama develop, snapshot b5ca55153330fac0fe38a84c45b995f02f560f6b.
- Importación: rama libra-import, commit 0a8d53f3cf67bec29f744a84cd644f83458f44ce.
- Licencia: MIT, archivo LICENSE preservado.
- main mantiene documentación y automatización manual; no se ha mezclado libra-import.

## Hallazgos verificados
1. Monorepo pnpm/Turborepo con seis aplicaciones Next.js 16, React 19, TypeScript y Supabase (README, package.json, pnpm-workspace.yaml).
2. El README indica que la plataforma de origen está vinculada a infraestructura y servicios de producción propios (VPS, Cloudflare Tunnel, Clerk). No reutilizar esa configuración.
3. package.json contiene scripts operativos potencialmente peligrosos fuera de un entorno aislado: user:grant-admin, sync-secrets, provision:account, backup:prod, e2e:prod, supabase:reset, supabase:docker y docker:teardown. No ejecutarlos.
4. pnpm-workspace.yaml permite scripts de instalación para dependencias nativas y Supabase CLI. Revisar antes de instalar.
5. La importación omitió .github/workflows originales y algunos nombres comunes de archivos secretos. Esto **no equivale a una auditoría completa de secretos**.
6. Las aplicaciones no están compiladas ni probadas para Samuel Store.

## Bloqueos antes de ejecutar
- Revisar todas las variables de entorno, referencias a dominios, servicios externos y credenciales.
- Revisar scripts de instalación y arranque, y dependencias con efectos secundarios.
- Ejecutar un escaneo de secretos y dependencias en un runner aislado sin secretos de producción.
- No ejecutar migraciones ni comandos Supabase contra proyectos existentes.
- Diseñar el esquema de perfiles de streaming y permisos de revendedores por separado.

## Siguiente fase recomendada
1. Crear rama de trabajo a partir de libra-import, sin mezclar con main.
2. Sanitizar scripts/configuración de terceros y generar .env.example con valores ficticios.
3. Habilitar CI de solo lectura, sin secretos y sin despliegue, para lint/typecheck/tests/build.
4. Crear un proyecto Supabase de desarrollo nuevo solo cuando el código haya superado auditoría estática.
5. Probar flujo de recarga por ID, perfil de streaming y revendedor antes de migrar datos.

## Protección de producción
Prohibido cambiar PRUEBAS-WW, su Netlify o su Supabase; no usar claves, URLs o datos reales de producción en este repositorio.
