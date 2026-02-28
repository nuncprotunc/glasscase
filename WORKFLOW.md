# Workflow

## Commit + push after each change

Default rule for this repo: whenever a change is made, commit and push immediately (unless you explicitly request batching, or push is blocked by authentication).

### Steps

1. `git status`
2. `git add <files>`
3. `git commit -m "<message>"`
4. `git push`

### Notes

- If `git push` fails due to GitHub authentication, resolve auth (SSH recommended, or HTTPS token) and retry.
- Keep commits small and scoped to the change just made.
