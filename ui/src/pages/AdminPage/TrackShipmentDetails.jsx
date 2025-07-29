import React from "react";
import styled from "styled-components";
import { Header } from "../../component/header_footer/header";
import { Link } from "react-router-dom";


const steps = [
    { label: "Order Placed", completed: true },
    { label: "Shifted to India Post", completed: true },
    { label: "Order Packed", completed: true },
    { label: "Order Delivered", completed: false },
];

function TrackShipmentDetails() {
    return (
        <>
            <Header label={'Track Order'} />
            <section style={{ padding: '1rem' }}>
                <h2 style={{ textAlign: 'center' }}>Your Shipment Details</h2>
                <br />
                <div className="row">
                    <div className="col-6">Your Order Id:</div>
                    <div className="col-6">3354654654526</div>
                </div>
                <br />
                <div className="row">
                    <div className="col-6">Your Tracking / Consignment Number</div>
                    <div className="col-6">6754ADRE77LE956</div>
                </div>
                <br />
                <TimelineContainer>
                    {steps.map((step, index) => (
                        <TimelineItem key={index}>
                            <Circle completed={step.completed} />
                            {index !== steps.length - 1 && <Line />}
                            <Label>{step.label}</Label>
                        </TimelineItem>
                    ))}
                </TimelineContainer>
                <div style={{ width: '100%', display: 'grid', alignItems: 'center' }}>
                    <Link to={'/TrackShipment'}>
                    <button className="btn btn-dark text-white" style={{ backgroundColor: '#501924', borderRadius: '5px', width: '90%', margin: 'auto' }}>
                        Ok
                    </button></Link>
                </div>
            </section>
        </>
    );
}
const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px;
`;

const TimelineItem = styled.div`
  display: flex;
//   align-items: center;
  position: relative;
//   margin-bottom: 30px;
  height: 70px;
`;

const Circle = styled.div`
  width: 16px;
  height: 16px;
  background-color: ${(props) => (props.completed ? "#490909" : "#d3d3d3")};
  border-radius: 50%;
  z-index: 1;
`;

const Line = styled.div`
  width: 2px;
  height: 100%;
  background-color: #490909;
  position: absolute;
  left: 7px;
  top: 16px;
  z-index: 0;
`;

const Label = styled.div`
  margin-left: 20px;
  font-size: 16px;
  color: #333;
`;

export default TrackShipmentDetails;
