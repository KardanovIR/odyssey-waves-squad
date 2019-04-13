// goodsController.js
// Import contact mode

goodsRep = require('../repository/goodsRepository');

CreateGoodsRequsetModel = require('../models/api/goods/CreateGoodsRequest');
GoodsResponceModel = require('../models/api/goods/GetGoodsResponce');

async function index (req, res) {
    try {
        console.log("api goods index");
        var goods = await goodsRep.getGoods();
        res.json({
            status: "success",
            message: "Goods retrieved successfully",
            data: goods
        });
    }
    catch (e) {
        console.log(e);
        res.json(e);
    }
};

// Handle view goods info
async function view (req, res) {
    try {
        console.log("api goods view");
        var goodsId = req.params.goods_id
        var goods = await goodsRep.findGoodsById(goodsId);
        res.json({
            status: "success",
            message: "Goods details successfully",
            data: goods
        });
    }
    catch (e) {
        console.log(e);
        res.json(e);
    }
};

async function create (req, res) {
    console.log("api goods create");
    var goods = req.body;
    // save the claim and check for errors
    try {
         await goodsRep.createGoods(goods);

        res.json({
                message: 'New goods created!',
                data: goods
        });
    }
    catch (e) {
        res.json(e);
    }
};

module.exports = {
    index: index,
    view: view,
    create: create,
};
