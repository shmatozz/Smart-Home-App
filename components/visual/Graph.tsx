import React, { useEffect, useState} from "react";
import {View, Text, StyleSheet, Pressable} from "react-native";
import Colors from "@/constants/Colors";
import DropdownSelect from "@/components/choice/DropdownSelect";

const Graph = () => {
    const [period, setPeriod] = useState('Day');
    const [devicesCategory, setDevicesCategory] = useState('All');
    const [data, setData] = useState(dayData)

    const [max, setMax] = useState(0);
    const [min, setMin] = useState(Number.MAX_VALUE);

    const [selected, setSelected] = useState<number | null>(null);

    useEffect(() => {
        setData(period === 'Day' ? dayData : (period === 'Week' ? weekData : monthData));
        setSelected(null)
    }, [period]);

    useEffect(() => {
        setMax(Math.max(...data.map(item => item.consumption)))
        setMin(Math.min(...data.map(item => item.consumption)))
    }, [data]);

    return (
        <View style={ styles.graphicsContainer }>
            <View style={ graphStyles.graphContainer }>
                { data.map((item, index) => (
                    <View key={ index } style={ graphStyles.columnContainer }>
                        <View style={ graphStyles.barContainer }>
                            {
                                selected == index &&
                                <View style={ styles.infoContainer }>
                                    <Text style={ styles.infoText }>{ item.consumption + ' kWh'}</Text>
                                </View>
                            }

                            <Pressable style={ [
                                graphStyles.bar,
                                { height: `${20 + ((item.consumption - min) / (max - min)) * (90 - 20)}%` },
                                selected == index ? graphStyles.barSelected : {}
                            ] }
                                       onPress={ () => setSelected(index) }/>
                        </View>
                        <Text style={ graphStyles.unitText }>{ item.unit }</Text>
                    </View>
                )) }
            </View>

            <View style={ styles.selectContainer }>
                <DropdownSelect placeholder={ 'Period' }
                                options={ ['Day', 'Week', 'Month'] }
                                selectedOption={ period }
                                onOptionSelected={ setPeriod }
                                leftIcon={ 'edit-calendar' }
                                style={{ flex: 1 }}/>

                <DropdownSelect options={ ['All', 'Air', 'Lights', 'Audio'] }
                                selectedOption={ devicesCategory }
                                onOptionSelected={ setDevicesCategory }
                                leftIcon={ 'devices-other' }
                                style={{ flex: 1 }}/>
            </View>
        </View>
    );
};

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
        zIndex: 1,
    },
    infoText: {
        fontSize: 12,
        fontFamily: "Inter",
        color: Colors.light.base["0"],
    }
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
    unitText: {
        fontSize: 14,
        fontFamily: 'Inter',
        color: Colors.light.base["90"],
        textAlign: 'center',
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
    },
    barSelected: {
        backgroundColor: Colors.light.blue["50"],
        borderRadius: 6,
    }
});

const dayData = [
    { unit: '7', consumption: 11, },
    { unit: '8', consumption: 9, },
    { unit: '9', consumption: 6, },
    { unit: '10', consumption: 7, },
    { unit: '11', consumption: 8, },
    { unit: '12', consumption: 5, },
    { unit: '13', consumption: 12, },
    { unit: '14', consumption: 11, },
    { unit: '15', consumption: 14, },
    { unit: '16', consumption: 4, },
];

const weekData = [
    { unit: 'Wed', consumption: 55, },
    { unit: 'Thu', consumption: 45, },
    { unit: 'Fri', consumption: 35, },
    { unit: 'Sat', consumption: 30, },
    { unit: 'Sun', consumption: 60, },
    { unit: 'Mon', consumption: 56, },
    { unit: 'Today', consumption: 30, },
];

const monthData = [
    { unit: 'Jan', consumption: 900, },
    { unit: 'Feb', consumption: 1000, },
    { unit: 'Mar', consumption: 750, },
    { unit: 'Apr', consumption: 780, },
    { unit: 'May', consumption: 660, },
    { unit: 'Jun', consumption: 700, },
];

export default Graph;
