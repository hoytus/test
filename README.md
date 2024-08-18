# test

```bash
brew install act
```

```bash
act --workflows .github/workflows/verify-review-requirements.yml \
  --container-architecture linux/amd64 \
  --eventpath .github/fixtures/pull_request_event.json
```
