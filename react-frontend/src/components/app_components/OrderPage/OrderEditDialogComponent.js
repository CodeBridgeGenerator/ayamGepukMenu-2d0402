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

const OrderEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    

    const onSave = async () => {
        let _data = {
            receiptNumber: _entity?.receiptNumber,
dateTime: _entity?.dateTime,
itemsOrdered: _entity?.itemsOrdered,
total: _entity?.total,
paymentMethod: _entity?.paymentMethod,
type: _entity?.type,
        };

        setLoading(true);
        try {
            
        const result = await client.service("order").patch(_entity._id, _data);
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info order updated successfully" });
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
        <Dialog header="Edit Order" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="order-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="receiptNumber">Receipt Number:</label>
                <InputText id="receiptNumber" className="w-full mb-3 p-inputtext-sm" value={_entity?.receiptNumber} onChange={(e) => setValByKey("receiptNumber", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["receiptNumber"]) && (
              <p className="m-0" key="error-receiptNumber">
                {error["receiptNumber"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="dateTime">Date Time:</label>
                <InputNumber tooltip="Use only numbers" id="dateTime" className="w-full mb-3 p-inputtext-sm" value={_entity?.dateTime} onChange={(e) => setValByKey("dateTime", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["dateTime"]) && (
              <p className="m-0" key="error-dateTime">
                {error["dateTime"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="itemsOrdered">Items Ordered:</label>
                <InputText id="itemsOrdered" className="w-full mb-3 p-inputtext-sm" value={_entity?.itemsOrdered} onChange={(e) => setValByKey("itemsOrdered", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["itemsOrdered"]) && (
              <p className="m-0" key="error-itemsOrdered">
                {error["itemsOrdered"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="total">Total:</label>
                <InputNumber tooltip="Use only numbers" id="total" className="w-full mb-3 p-inputtext-sm" value={_entity?.total} onChange={(e) => setValByKey("total", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["total"]) && (
              <p className="m-0" key="error-total">
                {error["total"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="paymentMethod">Payment Method:</label>
                <InputText id="paymentMethod" className="w-full mb-3 p-inputtext-sm" value={_entity?.paymentMethod} onChange={(e) => setValByKey("paymentMethod", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["paymentMethod"]) && (
              <p className="m-0" key="error-paymentMethod">
                {error["paymentMethod"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="type">Type:</label>
                <InputText id="type" className="w-full mb-3 p-inputtext-sm" value={_entity?.type} onChange={(e) => setValByKey("type", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["type"]) && (
              <p className="m-0" key="error-type">
                {error["type"]}
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

export default connect(mapState, mapDispatch)(OrderEditDialogComponent);
