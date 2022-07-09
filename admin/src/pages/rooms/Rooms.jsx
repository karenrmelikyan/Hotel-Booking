import React from 'react';
import Header from "../../components/header/Header";
import RoomsContent from "../../components/contents/RoomsContent";

const Rooms = () => {
    return (
        <div style={{padding: '0.1% 20%'}}>
            <Header title={'Rooms'}/>
            <RoomsContent />
        </div>
    );
};

export default Rooms;