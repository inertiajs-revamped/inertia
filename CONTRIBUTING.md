# Contributing

When contributing to this repository, please make sure to read through these guidelines. Note that no matter how you contribute, your participation is governed by our [Code of Conduct](https://github.com/inertiajs-revamped/inertia/tree/main/CODE_OF_CONDUCT.md).

## Table of Contents

- [Submit a bug report or feature request](#submit-a-bug-report-or-feature-request)
- [Prerequisites](#prerequisites)
- [Make changes to the code or docs](#make-changes-to-the-code-or-docs)
- [Develop the docs](#develop-the-docs)
- [Develop packages](#develop-packages)
- [Submit a Pull Request](#submit-a-pull-request)
- [Commit message format](#commit-message-format)

## Submit a bug report or feature request

Please use the GitHub [issue tracker](https://github.com/inertiajs-revamped/inertia/issues) to submit bug reports and feature requests.

### Submission checklist

1. Make sure you are using the [latest version](https://www.npmjs.com/org/inertiajs-revamped) of the library.
2. Check the [open issues](https://github.com/inertiajs-revamped/inertia/issues/?q=is%3Aissue+is%3Aopen+) to ensure you are reporting a new issue.

## Prerequisites

Ensure that your environment meets the minimum installation requirements:

- [Node.js](https://nodejs.org/en/) >= 18.12.0
- [PHP](https://www.php.net/manual/de/intro-whatis.php) >= 8.1
- [Composer](https://getcomposer.org/) >= 2.4.4
- [Laravel](https://laravel.com/) >= 9.x

## Make changes to the code or docs

Your contributions are welcome. Here's our suggested workflow:

1. Fork and clone the repository.
2. Run `pnpm install` to install dependencies.
3. Create a new branch for each feature, fix, or improvement.
4. Send a pull request from each feature branch to the **main** branch.
    - We use [Husky](https://typicode.github.io/husky) to auto-format and lint code on the `pre-commit` hook.
    - We use standardized commit messages following the [Conventional commit](https://www.conventionalcommits.org) specification. See [Commit message format](#commit-message-format).
5. Continue reading [Develop the docs](#develop-the-docs) or [Develop packages](#develop-packages).

> It is very important to separate new features or improvements into separate feature branches and to send a pull request for each branch. This allows us to review and pull in new features or improvements individually.

Make sure you read and follow the instructions in the [pull request template](https://github.com/inertiajs-revamped/inertia/tree/main/.github/pull_request_template.md). Note that all participation in this project (including code submissions) is governed by our [Code of Conduct](https://github.com/inertiajs-revamped/inertia/tree/main/CODE_OF_CONDUCT.md).

## Develop the docs

Follow the setup instructions at [Make changes to the code or docs](#make-changes-to-the-code-or-docs).

At the workspace `root`, run the following command:

```shell
pnpm run dev:docs
```

> Alternatively, if you only want to make changes to markdown files, you can [edit the pages](https://github.com/inertiajs-revamped/inertia/tree/main/docs/src) directly on GitHub.

Continue reading [Submit a Pull Request](#submit-a-pull-request).

## Develop packages

Work in progress.

### Sandbox environment (experimental)

> At the moment, the sandbox only works with the React adapter.

It's often helpful to develop using a real application. You can set a sandbox environment for each of the adapters by running the following command at the workspace `root`:

```shell
pnpm run sandbox

# outputs
 Inertia.js-Revamped  sandbox-setup

 INFO  This command will auto-install a sandbox environment in the workspace.

? Select a UI Framework: ... (Press <up> / <down> to select, <return> to confirm)
    Preact
  ❯ React
    Vue
```

You will be prompted with a list of available adapters to choose from. The following will happen afterward:

- Run `pnpm build` for core and adapter package of your choice.
- A folder `sandboxes/<ui>` will be created inside the workspace root (e.g., `sandboxes/react`).
- A fresh Laravel application will be installed using composer.
  - A [symbolic storage link](https://laravel.com/docs/master/filesystem#the-public-disk) will be created automatically (`php artisan storage:link`).
  - An application key will be generated automatically (`php artisan key:generate`).
- The `@inertiajs-revamped/presets` starter-kit installs:
The default starter template for the framework of your choice.
  - The `@inertiajs-revamped/laravel` package resolved from the workspace packages folder.
  - The adapter for the framework of your choice is resolved from the workspace packages folder.

> Please be patient when running the setup. It may take up to 1-3 minutes to complete all installation tasks!

#### Run the application

> This has not yet been optimized but will be in the future.

Currently, you need to `cd` into e.g., `sandboxes/react`:

- Run `pnpm run build:prod` to build with Vite.
- Run `php artisan serve` to start the Laravel development server.
- In addition, run `php artisan inertia:start-ssr` to start the Inertia.js-Revamped SSR server.

## Submit a Pull Request

Once you're done making the changes, you can now open a pull request (PR). Go to the forked repository on GitHub and select your feature branch. Click the 'Pull Request' button and fill out the form.

When naming your Pull Request, make sure to read the following [commit message guidelines](#commit-message-format).

## Commit message format

We use standardized commit messages following the [Conventional commit](https://www.conventionalcommits.org) specification.

### Commit message header

```text
<type>(<scope>): <short summary>
  │       │             │
  │       │             └─⫸ Summary in present tense. Not capitalized. No period at the end.
  │       │
  │       └─⫸ Commit Scope: docs|core|preact|react|svelte|vue|laravel|presets
  │
  └─⫸ Commit Type: feat|fix|docs|style|refactor|perf|test|build|chore|revert
```

The `<type>` and `<summary>` fields are mandatory; the `(<scope>)` field is optional but should be used.

<details>
  <summary>Click here to see a more detailed description of the commit message format.</summary>

#### Type

Must be one of the following:

- **feat:** A new feature.
- **fix:** A bug fix.
- **docs:** Documentation-only changes.
- **style:** Changes that do not affect the meaning of the code.
- **refactor:** A code change that neither fixes a bug nor adds a feature.
- **perf:** A code change that improves performance.
- **test:** Adding missing tests or correcting existing tests.
- **build:** Changes that affect the build system or external dependencies.
- **chore:** Other changes that don't modify src or test files.
- **ci:** Changes to our CI configuration files and scripts.
- **revert:** Reverts a previous commit.

#### Scope

The scope should be the name of the npm package affected (as perceived by the person reading the changelog generated from commit messages).

The following is the list of supported scopes:

- `docs`
- `core`
- `preact`
- `react`
- `svelte`
- `vue`
- `laravel`
- `presets`

#### Summary

Use the summary field to provide a succinct description of the change:

- use the imperative, present tense: `change` not `changed` nor `changes`;
- don't capitalize the first letter;
- no dot (.) at the end.

#### Body

Just as in the **summary**, use the imperative, present tense: “change” not “changed” nor “changes”. The body should include the motivation for the change and contrast this with previous behavior.

#### Footer

The footer should contain any information about **Breaking Changes** and is also the place to reference GitHub issues that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two new lines. The rest of the commit message is then used for this.

> A detailed explanation of Conventional Commits messages can be found at [Conventional Commits examples](https://www.conventionalcommits.org/en/v1.0.0/#examples).

</details>
