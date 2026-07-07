/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const InventoryEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    

    const onSave = async () => {
        let _data = {
            stockNo: _entity?.stockNo,
itemName: _entity?.itemName,
currentStock: _entity?.currentStock,
unit: _entity?.unit,
reorderLevel: _entity?.reorderLevel,
supplier: _entity?.supplier,
        };

        setLoading(true);
        try {
            
        const result = await client.service("inventory").patch(_entity._id, _data);
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info inventory updated successfully" });
        props.onEditResult(result);
        
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    

    return (
        <Dialog header="Edit Inventory" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="inventory-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="stockNo">Stock No:</label>
                <InputText id="stockNo" className="w-full mb-3 p-inputtext-sm" value={_entity?.stockNo} onChange={(e) => setValByKey("stockNo", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["stockNo"]) && (
              <p className="m-0" key="error-stockNo">
                {error["stockNo"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="itemName">Item Name:</label>
                <InputText id="itemName" className="w-full mb-3 p-inputtext-sm" value={_entity?.itemName} onChange={(e) => setValByKey("itemName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["itemName"]) && (
              <p className="m-0" key="error-itemName">
                {error["itemName"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="currentStock">Current Stock:</label>
                <InputNumber tooltip="Use only numbers" id="currentStock" className="w-full mb-3 p-inputtext-sm" value={_entity?.currentStock} onChange={(e) => setValByKey("currentStock", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["currentStock"]) && (
              <p className="m-0" key="error-currentStock">
                {error["currentStock"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="unit">Unit:</label>
                <InputText id="unit" className="w-full mb-3 p-inputtext-sm" value={_entity?.unit} onChange={(e) => setValByKey("unit", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["unit"]) && (
              <p className="m-0" key="error-unit">
                {error["unit"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="reorderLevel">Reorder Level:</label>
                <InputText id="reorderLevel" className="w-full mb-3 p-inputtext-sm" value={_entity?.reorderLevel} onChange={(e) => setValByKey("reorderLevel", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["reorderLevel"]) && (
              <p className="m-0" key="error-reorderLevel">
                {error["reorderLevel"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="supplier">Supplier:</label>
                <InputText id="supplier" className="w-full mb-3 p-inputtext-sm" value={_entity?.supplier} onChange={(e) => setValByKey("supplier", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["supplier"]) && (
              <p className="m-0" key="error-supplier">
                {error["supplier"]}
              </p>
            )}
          </small>
            </div>
                <div className="col-12">&nbsp;</div>
                <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(InventoryEditDialogComponent);
