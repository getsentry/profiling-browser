<p align="center">
  <a href="https://sentry.io/?utm_source=github&utm_medium=logo" target="_blank">
    <img src="https://sentry-brand.storage.googleapis.com/sentry-wordmark-dark-280x84.png" alt="Sentry" width="280" height="84">
  </a>
</p>

# Contributing

We welcome suggested improvements and bug fixes to the `@sentry/*` family of packages, in the form of pull requests on [`GitHub`](https://github.com/getsentry/profiling-browser). The guide below will help you get started, but if you have further questions, please feel free to reach out on [Discord](https://discord.gg/Ww9hbqr).


## Building the package

Since we are using [`TypeScript`](https://www.typescriptlang.org/) and native node addons, you will need use tsc to transpile the the TypeScript source code to executable JavaScript code.

- `npm run build` will compile the ts files.
## Tests

Tests are colocated with source files and should have a .test.ts suffix. The entire test suite can be ran using the `npm run test` command.

## Linting

Similar to building and testing, linting can be done via `npm run lint` command.

## Considerations Before Sending Your First PR

When contributing to the codebase, please note:

- Non-trivial PRs will not be accepted without tests (see above).
- We encourage you to open issues and discuss the change you want to make before opening PR's. This is especially true if you are considering adding new functionality. Remember that your requirements may differ from the direction that we want this SDK to take.
- Please do not bump version numbers yourself.

## Publishing a Release

_These steps are only relevant to Sentry employees when preparing and publishing a new SDK release._

1. Determine what version will be released (we use [semver](https://semver.org)).
2. Update [`CHANGELOG.md`](https://github.com/getsentry/profiling-browser/edit/master/CHANGELOG.md) to add an entry for the next release number and a list of changes since the last release. (See details below.)
3. Run the [Prepare Release](https://github.com/getsentry/profiling-browser/actions/workflows/release.yml) workflow.
4. A new issue should appear in https://github.com/getsentry/publish/issues.
5. Ask a member of the [@getsentry/releases team](https://github.com/orgs/getsentry/teams/releases/members) to approve the release.
