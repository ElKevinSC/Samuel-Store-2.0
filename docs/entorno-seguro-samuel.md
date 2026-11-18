# Entorno de desarrollo seguro — Samuel Store 2.0

Rama de trabajo: `samuel-dev`. Base: `libra-import`.

## Hallazgos de inspección
- `scripts/start.mjs` carga por defecto `.env.dev`, inicia seis aplicaciones y un proxy. No ejecutarlo hasta configurar un entorno local aislado.
- `docs/environment.md` describe `.env.dev`, `.env.staging`, `.env.prod` y `.secrets`; los archivos de entorno fueron excluidos durante la importación. Por tanto, no se puede arrancar directamente con configuración completa.
- El proyecto original contempla Supabase, Clerk, Cloudflare y operaciones de producción; no reutilizar cuentas, URLs, tokens ni secretos del autor.
- Los comandos `supabase:reset`, `sync-secrets`, `backup:prod`, `user:grant-admin` y `e2e:prod` quedan **prohibidos** hasta adaptar su implementación.
- `pnpm-workspace.yaml` permite scripts postinstall de algunas dependencias: una instalación requiere runner aislado y revisión.

## Primer chequeo seguro
`node scripts/samuel-preflight.mjs` solo lee archivos locales, no instala dependencias ni contacta servicios. Que pase no significa que la aplicación compile.

## Puertas antes de compilar
1. Revisar código para secretos y URLs de producción incrustados.
2. Diseñar `.env.dev` con valores ficticios y servicios de prueba, nunca de producción.
3. Auditar instalación de dependencias y permisos de GitHub Actions.
4. Configurar CI sin secretos, sin migraciones, sin despliegue y con permisos de solo lectura.
5. Ejecutar pruebas y build en un entorno desechable.

No modificar PRUEBAS-WW, Supabase o Netlify existentes.
