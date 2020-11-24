const path = require("path");

module.exports = {
    contracts_build_directory: path.join(__dirname, "/src/abi"),
    networks: {
        develop: {
            port: 8545
        }
    }
};