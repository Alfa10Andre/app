#!/usr/bin/env node

"use strict";

const fs = require("fs");
const download = require("download");
const unzipper = require("unzipper");
const path = require("path");

const LANGS_FOLDER = path.join(__dirname, "../..", "src/totara/locale/languages/");
const LANGS_URL = "https://download.totaralms.com/lang/T13/";
const ZIP_FILE_NAME = "mobile.json.zip";

const downloadURL = `${LANGS_URL}${ZIP_FILE_NAME}`;

async function main() {
  console.log(`Downloading translations from ${downloadURL}`);
  const fetched = await download(downloadURL, LANGS_FOLDER);

  const zipFile = LANGS_FOLDER + ZIP_FILE_NAME;
  console.log(`Downloaded ${zipFile} with size of ${fetched.length / 1024} KB`);

  await fs
    .createReadStream(zipFile)
    .pipe(unzipper.Extract({ path: LANGS_FOLDER }))
    .on("entry", function (entry) {
      console.log(`extracted ${entry.path}`);
    })
    .promise();

  const folder = fs.readdirSync(LANGS_FOLDER);
  const filter = folder.filter((x) => path.extname(x).toLowerCase() === ".json" && x !== "all.json");

  console.log(`${filter.length} translations have been found.`);
  console.log(filter);

  const body = {};

  filter.forEach((x) => {
    console.log(x);
    const lang = x.split(".")[0];
    const content = fs.readFileSync(LANGS_FOLDER + x, "utf8");
    body[lang] = JSON.parse(content);
  });

  fs.writeFileSync(`${LANGS_FOLDER}all.json`, JSON.stringify(body, null, 2));
  console.info(`Written all.json to ${LANGS_FOLDER}`);

  fs.unlinkSync(zipFile);
  console.log(`Deleted ${zipFile}`);
}

main();
