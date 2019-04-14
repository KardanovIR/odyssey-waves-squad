wavesClient = require('../services/wavesClient')


async function getLastBlock (req, res) {
    try {
        
    console.log("api waves lastBlock");
        var lastBlock = await wavesClient.getLastBlock();
        res.json({
            status: "success",
            message: "last block",
            data: lastBlock
        });
    }
    catch (e) {
        console.log(e);
        res.json(e);
    }
};

module.exports = {
    getLastBlock: getLastBlock,
};
