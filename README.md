# What is RudderStack?

[RudderStack](https://rudderstack.com/) is a **customer data pipeline** tool for collecting, routing and processing data from your websites, apps, cloud tools, and data warehouse.

More information on RudderStack can be found [here](https://github.com/rudderlabs/rudder-server).

## RudderStack Config Generator

Rudderstack has two components: _control plane_ and _data plane_.

The data plane reliably delivers your event data, while the control plane manages the configuration of your sources and destinations.
This configuration can also be read from a file instead of from the control plane, if you want remove an extra dependency.

RudderStack Config Generator provides the UI to manage the source and destination configurations without needing to sign up. All the source and destination configuration stays on your local storage. You can export/import config to a JSON file.

## Setup

1. `npm install`
2. `npm start`

RudderStack config generator starts on the default port i.e., http://localhost:3000.
On a successful setup, you should see the following

![image](https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-Lq586FOQtfjJPKbd01W%2F-M0LidOVklHOkLYEulS4%2F-M0M3fzyrb-UHiNBG7j0%2FScreenshot%202020-02-18%20at%2012.20.57%20PM.png?alt=media&token=a3f24ad8-fe72-4fed-8953-8e4c790f6cfd)

## Export workspace config

After adding the required sources and destinations, export your workspace config. This workspace-config is required by the RudderStack Server.
To learn more about adding sources and destinations in RudderStack, refer [Adding a Source and Destination in RudderStack](https://docs.rudderstack.com/getting-started/adding-source-and-destination-rudderstack)

Update the [config](https://docs.rudderstack.com/administrators-guide/config-parameters) variables `configFromFile` and `configJSONPath` in rudder-server to read workspace config from the exported JSON file.

## Start RudderStack with the workspace config file

* Download the workspace config file on your machine.
* In `docker-compose.yml`, uncomment `volumes` section under `backend` service. Specify the path to your workspace config.
* In `build/docker.env`, set the environment variable `RSERVER_BACKEND_CONFIG_CONFIG_FROM_FILE=true`
* Start RudderStack with `docker-compose up`

## Export source configuration

After adding the required sources and destinations, export your source config for the sources. This source config is required by the RudderStack SDKs. After downloading the source config file, you need to host that file at a `/sourceConfig` end-point.

Then you can specify that link as your `controlPlaneUrl` while initializing the SDK.

## More information

For more information and documentation related to the RudderStack Config Generator, check out our [documentation](https://docs.rudderstack.com/how-to-guides/rudderstack-config-generator).

## Contact us

If you come across any issues while configuring or using the RudderStack Config Generator, please feel free to start a conversation on our [Slack](https://resources.rudderstack.com/join-rudderstack-slack) channel. We will be happy to help you.

