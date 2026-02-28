---
description: Commit + push after each change
---

1. Check what changed
   - `git status`

2. Stage only the intended files
   - `git add <file1> <file2> ...`

3. Commit with a short, descriptive message (present tense)
   - `git commit -m "<message>"`

4. Push to the current branch
   - `git push`

Notes:
- If `git push` fails due to authentication, pause and resolve auth (SSH or HTTPS token) before retrying.
- If the change is experimental or you want a multi-step batch, explicitly say so and we can defer the commit/push.
