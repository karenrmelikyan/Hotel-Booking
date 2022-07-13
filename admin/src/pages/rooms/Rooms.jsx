import React from 'react';
import Header from "../../components/header/Header";
import RoomsContent from "../../components/contents/RoomsContent";

const Rooms = () => {
    return (
        <div>
            <Header title={'Rooms'}/>
            <RoomsContent />
        </div>
    );
};

export default Rooms;