const mongoose = require("mongoose")

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://127.0.0.1:27017/express_test")
// 插入集合和数据，数据库express_test会自动创建