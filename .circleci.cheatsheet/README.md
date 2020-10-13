## Hello world (config.0.yml)

First, branch the repository. Then `mkdir .circleci` to say hello world!

To be honest, this stage is one of the biggest challenge for biginners, because file name and syntax of the are quite important.
Starting from successful hello world helps you good start.

Syntax can be checked using `circleci config validate` command.

## Meagningful things (config.1.yml)

Do meaningful things then. Here, we will do dependency installation (`yarn install`), and build a webpacked script.

Four gimmicks here:

* Code checkout from VCS. Without this you will end up with an empty executor.
* Dynamic calculation of version number. In this way you can include the job number and digest of Git commits in version number, and easily distinguish which version is built in which job with which Git commit.
* Arming dependency cache so that jobs triggered in the future can take advantage of caches for better execution speed.
* Storing deliverable as artifacts.

## Rebuilt with SSH (config.2.yml)

Use "Rebuild with SSH" to debug.
You can easily find out misspellings.

## Workflows and parallism (config.3.yml)

Next step is to implement tests.

To do so, we will do four things.

* Configure sequential jobs to use the same results of dependency resolution in tests and builds: For better trustworthiness of tests.
* Configure parallel jobs to run tests besides builds.
* Configure parallelism to distribute tests.
* Use larger resource class in tests to use more computation resources in tests.

## Deployment (config.4.yml)

First, define the deployment job.
Deployment can be done to staging or production.
Where to deploy depends on how you want to configure CI/CD operations.

Then, configure workflows.
We will add two jobs: One is an approval job, then the second is the actual deployemnt job.

The approval job is a functionality provided by CircleCI.
It provides a chance to intervene automated processes.
In this example, engineers have a chance to say go or no-go on releases, before proceeding to deployement.

After approval is given, actualy deployment is conducted.
For deployment, context is configured.
Contexts on CircleCI provide safe places for confidential data, such as passwords.
In this example, API key for Heroku issaved in contexts.
