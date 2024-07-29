import React from "react";
import {View, Text, StyleSheet, Pressable} from "react-native";
import Colors from "@/constants/Colors";
import DropdownSelect from "@/components/choice/DropdownSelect";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {BodyS, Caption} from "@/constants/Fonts";
import {observer} from "mobx-react-lite";
import GraphViewModel from "@/utils/viewmodels/Stats/GraphViewModel";

const graphViewModel = new GraphViewModel();

const Graph = observer(() => {
    return (
        <View style={ styles.graphicsContainer }>
            <View style={ graphStyles.graphContainer }>
                {
                    graphViewModel.consumptionData.map((item, index) => (
                        <View key={ index } style={ graphStyles.columnContainer }>
                            <View style={ graphStyles.barContainer }>
                                {
                                    graphViewModel.selected == index &&
                                    <View style={ styles.infoContainer }>
                                        <Text style={[ Caption.Regular, { color: Colors.light.base["0"] } ]}>
                                            { item.amount + ' kWh'}
                                        </Text>
                                    </View>
                                }

                                <Pressable onPress={ () => graphViewModel.setSelected(index) }
                                           style={ [
                                               graphStyles.bar,
                                               { height: `${20 + ((item.amount - graphViewModel.min) / (graphViewModel.max - graphViewModel.min)) * (90 - 20)}%` },
                                               graphViewModel.selected == index ? graphStyles.barSelected : {}
                                           ] }
                                />
                            </View>

                            <Text style={[ BodyS.Regular, { textAlign: 'center' }]}>
                                { item.unit }
                            </Text>
                        </View>
                    ))
                }
            </View>

            <View style={ styles.selectContainer }>
                <DropdownSelect placeholder={ 'Period' }
                                options={ ['Day', 'Week', 'Month'] }
                                selectedOption={ graphViewModel.period }
                                onOptionSelected={ graphViewModel.setPeriod }
                                leftIcon={ true }
                                style={{ flex: 1 }}>
                    <MaterialCommunityIcons name={ "calendar-month" } size={ 24 } color={ Colors.light.blue["50"] }/>
                </DropdownSelect>

                <DropdownSelect options={ ['All', 'Air', 'Lights', 'Audio'] }
                                selectedOption={ graphViewModel.devicesCategory }
                                onOptionSelected={ graphViewModel.setDevicesCategory }
                                leftIcon={ true }
                                style={{ flex: 1 }}>
                    <MaterialIcons name={ "devices-other" } size={ 24 } color={ Colors.light.blue["50"] }/>
                </DropdownSelect>
            </View>
        </View>
    );
})

const styles = StyleSheet.create({
    graphicsContainer: {
        flex: 1,
    },
    selectContainer: {
        paddingVertical: 16,
        paddingHorizontal: 4,
        gap: 16,
        flexDirection: 'row',
    },
    infoContainer: {
        height: 28,
        width: 64,
        backgroundColor: Colors.light.blue["50"],
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        zIndex: 0,
    },
})

const graphStyles = StyleSheet.create({
    graphContainer: {
        flex: 1,
        padding: 4,
        gap: 8,
        flexDirection: 'row',
    },
    columnContainer: {
        flex: 1,
        height: '100%',
        flexDirection: 'column',
        overflow: 'visible',
    },
    barContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        position: 'relative',
        gap: 6,
    },
    bar: {
        backgroundColor: Colors.light.blue["5"],
        borderRadius: 6,
        zIndex: -1,
    },
    barSelected: {
        backgroundColor: Colors.light.blue["50"],
        borderRadius: 6,
    }
});

export default Graph;
