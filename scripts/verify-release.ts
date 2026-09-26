import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();

type CheckResult = { name: string; ok: boolean; detail?: string };
const results: CheckResult[] = [];

function check(name: string, ok: boolean, detail?: string) {
  results.push({ name, ok, detail });
  const icon = ok ? "\x1b[32m✓\x1b[0m" : "\x1b[31m✗\x1b[0m";
  console.log(`  ${icon} ${name}${detail ? ` \x1b[2m(${detail})\x1b[0m` : ""}`);
}

function run(cmd: string, args: string[]) {
  const result = spawnSync(cmd, args, {
    cwd: ROOT,
    stdio: "inherit",
    env: {
      ...process.env,
      DATABASE_URL:
        process.env.DATABASE_URL ||
        "postgresql://postgres:password@localhost:5432/next_agent_db",
    },
  });
  return result.status === 0;
}

console.log("\n\x1b[1m=== Release & Quality Audit ===\x1b[0m");

// 1. Agent Rules Health
console.log("\n\x1b[1m[1/3] Agent Rules & Context Window\x1b[0m");
const rootAgents = join(ROOT, "AGENTS.md");
const agentsExist = existsSync(rootAgents);
const agentsSize = agentsExist ? readFileSync(rootAgents, "utf-8").length : 0;
check(
  "Root AGENTS.md exists and is within 32KB context limit",
  agentsExist && agentsSize < 32768,
  `${agentsSize} bytes / max 32768 bytes`,
);

const moduleRules = [
  "src/lib/auth/AGENTS.md",
  "src/lib/payments/AGENTS.md",
  "src/lib/security/AGENTS.md",
];
for (const rule of moduleRules) {
  check(`Module rule exists: ${rule}`, existsSync(join(ROOT, rule)));
}

// 2. SEO & Accessible Render Health (Anti-Blank Screen)
console.log("\n\x1b[1m[2/3] SEO & Machine-Readable Content (AEO/GEO)\x1b[0m");
const landingPath = join(ROOT, "src/app/page.tsx");
const landingContent = readFileSync(landingPath, "utf-8");
check(
  "Landing page renders content immediately without JS opacity-0 masking",
  !landingContent.includes("opacity-0"),
  "fully accessible to crawlers and LLM engines",
);

check(
  "LLM manifest exists (/llms.txt)",
  existsSync(join(ROOT, "src/app/llms.txt/route.ts")),
);

// 3. Technical Verification Suite
console.log(
  "\n\x1b[1m[3/3] Running Full Linter, Types, Tests & Build\x1b[0m\n",
);
const suiteOk =
  run("pnpm", ["run", "lint"]) &&
  run("pnpm", ["run", "knip"]) &&
  run("pnpm", ["run", "check"]) &&
  run("pnpm", ["run", "format:check"]) &&
  run("pnpm", ["run", "test"]) &&
  run("pnpm", ["run", "build"]);

check("All automated quality gates passed", suiteOk);

const failed = results.filter((r) => !r.ok);
if (failed.length > 0) {
  console.error(
    `\n\x1b[31mRelease verification failed with ${failed.length} issues.\x1b[0m\n`,
  );
  process.exit(1);
} else {
  console.log(
    "\n\x1b[32m✔ All release quality checks passed successfully!\x1b[0m\n",
  );
  process.exit(0);
}
