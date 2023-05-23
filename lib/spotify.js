const spotifydlCore = require("spotifydl-core").default;
const ra = require("ra-api");
const path = process.cwd();
const fs = require('fs')

const credential = {
    clientId: "271f6e790fb943cdb34679a4adcc34cc",
    clientSecret: "c009525564304209b7d8b705c28fd294",
  };

const spotify = new spotifydlCore(credential);

async function spotifydl(url) {
  if (!/open|spotify|track/.test(url))
    return {
      status: false,
      message: "Link not valid!",
    };
  const getdata = await spotify.getTrack(url);
  const down = await spotify.downloadTrack(url);
  const filepath = path + `/tmp/${getdata.name}.mp3`;
  await fs.writeFileSync(filepath, down);
  const upload = await ra.UploadFile(filepath);
  try {
    fs.unlinkSync(filepath);
  } catch {}
  return {
    ...getdata,
    ...{ size: upload.result.size, url: upload.result.namaFile },
  };
}

module.exports = { spotifydl };
