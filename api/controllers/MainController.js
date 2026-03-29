/**
 * MainController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const axios = require("axios");

const tokenEndpoint = "https://icdaccessmanagement.who.int/connect/token";
const clientId =
  "d62202c6-3cf1-4996-8758-5001c555c7be_6045c347-8013-46d0-8b90-a2070bb1661b";
const clientSecret = "k0YxuVArC3Dk1mueHUsl035RoQcJttK02M5xBpkM5Dw=";
const scope = "icdapi_access";

module.exports = {
  isAlive: function (req, res) {
    res.send(
      `Hello World! The code is in ${process.env.NODE_ENV} @ PORT ${process.env.PORT}`,
    );
  },

  getICDAPIToken: function (req, res) {
    // Step 1: Get access token
    async function getAccessToken() {
      const response = await fetch(tokenEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: clientId,
          client_secret: clientSecret,
          scope: scope,
        }),
      });

      if (!response.ok) {
        throw new Error(`Token request failed: ${Object.keys(response)}`);
      }

      const data = await response.json();
      console.log(data.access_token);
      return data.access_token;
    }

    // Step 2: Call API with token
    async function callApi() {
      try {
        const accessToken = await getAccessToken();

        const response = await fetch("https://id.who.int/icd/entity", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
            "Accept-Language": "en",
            "API-Version": "v2",
          },
        });

        if (!response.ok) {
          console.log("Error:", response.status);
          return;
        }

        const content = await response.text();
        console.log(content);
      } catch (error) {
        console.error("Error:", error.message);
      }
    }

    // Run it
    callApi();
  },
};
