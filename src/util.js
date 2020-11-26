const { uid } = require("uid");
const config = require("./config.json");
const { RtcRole, RtcTokenBuilder } = require("agora-access-token");

const genToken = () => {
    console.log("TOKENNNNN")
    const appId = config.AGORA_APP_ID;
    const appCertificate = config.AGORA_APP_CERTIFICATE;
    const role = RtcRole.PUBLISHER;

    //KEPT ZERO TO ALLOW CLIENTS TO JOIN CHANNEL WITHOUT AGORA AUTH
    const appUid = 0;

    const channelName = uid(16);
    const expirationTimeInSeconds = 3600;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    const token = RtcTokenBuilder.buildTokenWithUid(
        appId,
        appCertificate,
        channelName,
        appUid,
        role,
        privilegeExpiredTs
    );


    console.log("INSIDE gentoken", token)


    return { channelName, token };
};

module.exports = genToken;