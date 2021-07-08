import React from "react";
import {
    Text,

} from 'react-native'


class Page extends React.Component {

    handlePress = () => {
        this.props.navigation.replace('TabNavigator')
    };

    render() {
        return (
            <Text>This is a text epic</Text>
        );
    }
}



export default Page