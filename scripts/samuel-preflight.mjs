#!/usr/bin/env node
// Static, read-only checks. Does not install packages, load env, or contact services.
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
const root = process.cwd();
const errors = [];
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const required = ["build", "typecheck", "test"];
for (const name of required) if (!pkg.scripts?.[name]) errors.push(`Missing script: ${name}`);
if (!existsSync(join(root, "LICENSE"))) errors.push("LICENSE missing");
if (!existsSync(join(root, "pnpm-workspace.yaml"))) errors.push("pnpm workspace missing");
const dangerous = Object.keys(pkg.scripts ?? {}).filter(x => /^(backup:prod|e2e:prod|supabase:reset|sync-secrets|user:grant-admin)$/.test(x));
console.log("Samuel Store 2.0 — static preflight");
console.log("Project:", pkg.name, "version:", pkg.version);
console.log("Operational scripts requiring isolation:", dangerous.join(", ") || "none");
console.log("No dependencies installed, no database commands executed.");
if (errors.length) { console.error(errors.join("\n")); process.exitCode = 1; }
else console.log("Basic repository structure: OK (not a build or security certification).");
