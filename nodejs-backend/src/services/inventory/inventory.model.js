
    module.exports = function (app) {
        const modelName = "inventory";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            stockNo: { type:  String , comment: "Stock No, p, false, true, true, true, true, true, true, , , , ," },
itemName: { type:  String , comment: "Item Name, p, false, true, true, true, true, true, true, , , , ," },
currentStock: { type: Number, comment: "Current Stock, p_number, false, true, true, true, true, true, true, , , , ," },
unit: { type:  String , comment: "Unit, p, false, true, true, true, true, true, true, , , , ," },
reorderLevel: { type:  String , comment: "Reorder Level, p, false, true, true, true, true, true, true, , , , ," },
supplier: { type:  String , comment: "Supplier, p, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };