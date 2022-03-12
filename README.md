<p align="center">
  <a href="https://github.com/leonhfr/linkedin-responder-action"><img alt="typescript-action status" src="https://github.com/leonhfr/linkedin-responder-action/workflows/build-test/badge.svg"></a>
</p>

# LinkedIn Responder

This action responds to your latest LinkedIn conversations with a predefined message.

## Why?

The approach is based on the Medium article [Never ignore a recruiter](https://index.medium.com/career-advice-nobody-gave-me-never-ignore-a-recruiter-4474eac9556). The author advocates to respond to all recruiter solicitations with the same script in order to find the very best opportunities, of which there are only a few. The goal is to reduce the cost of the response.

By using this Github Action, you can take it a step further. Instead of copy and pasting the same script several times, you will be able to automatically answer to all new solicitations.

The typical implementation is to use it in a scheduled job. Check out how I use it in my own linkedin responder repository.

## Usage

**Important note:** for this action to function correctly, the repository must be [checked out](https://github.com/actions/checkout) in a previous step.

```yml
- uses: leonhfr/linkedin-responder-action@v1
  with:
    # The LinkedIn username, usually an email.
    # Best practice is to store it in a GitHub secret.
    # Required.
    username: ${{ secrets.LINKEDIN_USERNAME }}

    # The LinkedIn password.
    # Best practice is to store it in a GitHub secret.
    # Required.
    username: ${{ secrets.LINKEDIN_PASSWORD }}

    # The message.
    # Optional, but either message or path must be provided.
    message: |
      Hello,

      this is a multiline text that will be used to respond to LinkedIn messages.

      Best

    # The path to the file containing the message.
    # Must start with a dot, which refers to the root of the repository.
    # Will be parsed as UTF-8.
    # Optional, but either message or path must be provided.
    path: ./message.md

    # Whether to trim the whitespace around the message.
    # Optional.
    # Default: true
    trim: true

    # Whether to only respond to InMail messages.
    # Optional.
    # Default: true
    inmailsOnly: true

    # Only respond to new conversations started since N minutes.
    # Optional.
    # Default: 60 minutes
    since: 60

    # Only process latest N conversations.
    # Works best in multiple of 20 to limit HTTP calls due to the internal LinkedIn API.
    # Optional.
    # Default: 20
    limit: 20

    # Only log actions, do not actually respond to messages.
    # Optional.
    # Default: false
    dryRun: false
```

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE)
