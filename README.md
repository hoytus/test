# test

Create GitHub token with org read access and then save it to a `.secrets` file.

```bash
echo REPO_TOKEN=your-github-token > .secrets
```

Use homebrew to install [act](https://github.com/nektos/act) for running GitHub Actions locally.

```bash
brew install act
```

Run the workflow locally.

```bash
act --workflows .github/workflows/verify-review-requirements.yml \
  --container-architecture linux/amd64 \
  --eventpath .github/fixtures/pull_request_event.json
```
