# Samuel Store 2.0 — entorno aislado

Estado: **preparación técnica**. Este repositorio es independiente de `ElKevinSC/PRUEBAS-WW`.

## Reglas de seguridad
- No conectar este repositorio al sitio de producción de Netlify.
- No reutilizar variables de entorno, claves de servicio ni credenciales de Supabase de producción.
- Crear una base Supabase separada exclusivamente para desarrollo.
- No subir datos reales de clientes, contraseñas, PIN ni comprobantes.
- No ejecutar migraciones en la base de datos de producción.
- Revisar y aprobar el código antes de habilitar despliegues automáticos.

## Base propuesta
[Libra](https://github.com/vaoan/Libra), rama `develop`, licencia MIT. La importación del código **está pendiente**. Al incorporarlo, conservar el archivo LICENSE y los avisos originales. Revisar las licencias de dependencias y eliminar configuraciones, secretos, URLs y cuentas específicas del proyecto original.

## Validación requerida
1. Congelar un commit exacto de Libra y revisar la estructura.
2. Auditar scripts de instalación, arranque, compilación y despliegue.
3. Preparar un entorno local aislado.
4. Ejecutar typecheck, tests, build y análisis de secretos.
5. Diseñar módulos propios: streaming, recargas por ID, revendedores, saldos y renovaciones.
6. Probar roles y RLS en Supabase de desarrollo.
7. Migrar datos solo tras respaldos y ensayos de restauración.

No se autoriza modificar `PRUEBAS-WW`, Supabase ni Netlify actuales desde este proyecto.
