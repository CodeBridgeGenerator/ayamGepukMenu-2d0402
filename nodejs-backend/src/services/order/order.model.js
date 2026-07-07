
    module.exports = function (app) {
        const modelName = "order";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            receiptNumber: { type:  String , comment: "Receipt Number, p, false, true, true, true, true, true, true, , , , ," },
dateTime: { type: Number, comment: "Date Time, p_number, false, true, true, true, true, true, true, , , , ," },
itemsOrdered: { type:  String , comment: "Items Ordered, p, false, true, true, true, true, true, true, , , , ," },
total: { type: Number, comment: "Total, p_number, false, true, true, true, true, true, true, , , , ," },
paymentMethod: { type:  String , comment: "Payment Method, p, false, true, true, true, true, true, true, , , , ," },
type: { type:  String , comment: "Type, p, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };