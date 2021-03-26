import React, { useState, useRef } from 'react';
import { Platform, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import { addText } from '../store/actions';
import '../styles/app.sass';

import { DefaultRootState } from "../../types";

const App = () => {
 
    console.log(999, Platform);

    return (
        <View>
            <Text>Ciao</Text>
        </View>
    );
};

export default hot(App);
