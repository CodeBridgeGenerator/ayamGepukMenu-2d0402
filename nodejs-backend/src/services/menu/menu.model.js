
    module.exports = function (app) {
        const modelName = "menu";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            productCode: { type:  String , comment: "Product Code, p, false, true, true, true, true, true, true, , , , ," },
name: { type:  String , comment: "Name, p, false, true, true, true, true, true, true, , , , ," },
category: { type:  String , comment: "Category, p, false, true, true, true, true, true, true, , , , ," },
price: { type: Number, comment: "Price, p_number, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };