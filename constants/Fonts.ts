import { StyleSheet } from 'react-native';
import Colors from "@/constants/Colors";

export const Headers = StyleSheet.create({
    H4: {
        fontSize: 26,
        fontFamily: 'Inter-Medium',
        color: Colors.light.base["90"],
    },
    H5: {
        fontSize: 20,
        fontFamily: 'Inter-Regular',
        color: Colors.light.base["90"],
    },
})

export const BodyM = StyleSheet.create({
    Regular: {
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        color: Colors.light.base["90"],
    },
    Medium: {
        fontSize: 16,
        fontFamily: 'Inter-Medium',
        color: Colors.light.base["90"],
    },
    Italic: {
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        fontStyle: 'italic',
        color: Colors.light.base["90"],
    },
})

export const BodyS = StyleSheet.create({
    Regular: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: Colors.light.base["90"],
    },
    Medium: {
        fontSize: 14,
        fontFamily: 'Inter-Medium',
        color: Colors.light.base["90"],
    },
    Italic: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        fontStyle: 'italic',
        color: Colors.light.base["90"],
    },
})

export const Caption = StyleSheet.create({
    Regular: {
        fontSize: 12,
        fontFamily: 'Inter-Regular',
        color: Colors.light.base["90"],
    },
    Medium: {
        fontSize: 12,
        fontFamily: 'Inter-Medium',
        color: Colors.light.base["90"],
    },
    Italic: {
        fontSize: 12,
        fontFamily: 'Inter-Regular',
        fontStyle: 'italic',
        color: Colors.light.base["90"],
    },
})