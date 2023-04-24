/**
 * This file is part of Totara Enterprise.
 *
 * Copyright (C) 2021 onwards Totara Learning Solutions LTD
 *
 * Totara Enterprise is provided only to Totara Learning Solutions
 * LTD’s customers and partners, pursuant to the terms and
 * conditions of a separate agreement with Totara Learning
 * Solutions LTD or its affiliate.
 *
 * If you do not have an agreement with Totara Learning Solutions
 * LTD, you may not access, use, modify, or distribute this software.
 * Please contact [sales@totaralearning.com] for more information.
 */
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { buildClientSchema } = require("graphql");
const introspectedSchema = require("./schema.json");
const { port, mockServerUrl, mockUsername, mockPassword } = require("./config");
const graphqlApiPath = "/totara/mobile/api.php";

let graphQLServerApp;
let httpServer;

const createServerWithMockedSchema = (customMocks = {}) => {
  const schema = buildClientSchema(introspectedSchema);

  const server = new ApolloServer({
    schema: schema,
    mocks: customMocks
  });
  return server;
};

const startHttpServer = () => {
  return new Promise((resolve) => {
    httpServer = graphQLServerApp.listen(port, () => {
      resolve();
    });
  });
};

const stopHttpServer = () => {
  return new Promise((resolve) => httpServer.close(() => resolve()));
};

const startGraphQLServer = async (mock = {}) => {
  if (httpServer) {
    console.warn("Tried to stop running server.");
    await stopGraphQLServer();
  }
  graphQLServerApp = express();
  const server = createServerWithMockedSchema(mock);
  graphQLServerApp.use(express.json());
  graphQLServerApp.use(express.text());
  graphQLServerApp.use(express.static(__dirname + "/public"));
  graphQLServerApp.use(express.static(__dirname + "/files"));
  graphQLServerApp.post("/totara/mobile/site_info.php", (req, res) => {
    res.json({
      data: {
        app_version: "1.0.7",
        auth: "native",
        siteMaintenance: "0",
        theme: {
          urlLogo: `${mockServerUrl}/images/logo-totara.jpg`,
          colorPrimary: "#1c5a94",
          colorText: "#FFFFFF"
        },
        version: "2020100100"
      }
    });
  });
  graphQLServerApp.get("/totara/mobile/login_setup.php", (req, res) => {
    res.json({ data: { loginsecret: "mocked_login_secret" } });
  });
  graphQLServerApp.post("/totara/mobile/login.php", (req, res) => {
    const requestData = JSON.parse(req.body);
    if (requestData && requestData.username == mockUsername && requestData.password == mockPassword) {
      res.json({
        data: {
          setupsecret: "mocked_setup_secret"
        }
      });
    } else {
      res.status(401).send();
    }
  });
  graphQLServerApp.post("/totara/mobile/device_register.php", function (req, res) {
    res.json({
      data: {
        apikey: "mocked_apikey",
        apiurl: `${mockServerUrl}/totara/mobile/api.php`,
        version: "2020100100"
      }
    });
  });
  graphQLServerApp.get("/totara/mobile/device_webview.php", function (req, res) {
    res.redirect("/mocked_page.html");
  });
  server.applyMiddleware({
    app: graphQLServerApp,
    path: graphqlApiPath
  });
  await startHttpServer();
};

const stopGraphQLServer = async () => {
  if (!httpServer) {
    console.warn("Tried to close null HTTP server.");
    return;
  }
  await stopHttpServer();
  httpServer = null;
  graphQLServerApp = null;
};

module.exports = {
  startGraphQLServer,
  stopGraphQLServer
};
