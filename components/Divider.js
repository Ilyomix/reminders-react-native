import React from 'react';
import { 
    View,
    StyleSheet,
} from 'react-native';

export default function Divider() {
    return (
        <View style={styleDivider.main} />
    )
}

const styleDivider = StyleSheet.create({
    main: {
        backgroundColor: 'rgba(0, 0, 0, 0.03)',
        height: 1,
        flexDirection: 'row',
        marginTop: 7,
        marginLeft: 17,
        marginRight: 17,
        marginBottom: -7,
    }
});