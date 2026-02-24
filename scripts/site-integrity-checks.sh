#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

errors=0

fail() {
  echo "ERROR: $1" >&2
  errors=1
}

for file in public/robots.txt public/sitemap.xml public/llms.txt public/llm.txt; do
  if [[ ! -f "$file" ]]; then
    fail "Missing required file: $file"
  fi
done

if [[ ! -f index.html ]]; then
  fail "Missing index.html"
else
  rg -qi '<link rel="canonical"' index.html || fail "Missing canonical link tag in index.html"
  rg -qi '<meta property="og:url"' index.html || fail "Missing og:url meta tag in index.html"
fi

FOOTER_FILE="src/components/Footer.tsx"
if [[ ! -f "$FOOTER_FILE" ]]; then
  fail "Missing footer component at $FOOTER_FILE"
else
  rg -qi 'ai content disclaimer|assistance of ai|artificial intelligence|generated or assisted by artificial intelligence' "$FOOTER_FILE" || fail "Missing AI disclaimer language in footer"

  if rg -n 'href="#"|href="https://instagram.com"|href="https://x.com"|href="https://twitter.com"' "$FOOTER_FILE" > /tmp/site_integrity_placeholders.log; then
    echo "ERROR: Placeholder social links detected in $FOOTER_FILE" >&2
    cat /tmp/site_integrity_placeholders.log >&2
    errors=1
  fi
fi

if [[ "$errors" -ne 0 ]]; then
  exit 1
fi

echo "Site integrity checks passed."
