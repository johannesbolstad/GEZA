import {
    Feather,
    FontAwesome,
    FontAwesome5,
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons
} from '@expo/vector-icons';
import React from 'react';
import { Image } from 'react-native';

/**
 * A function that returns type of icon based on subcategory name
 *
 * @param name is the name of the wiki subcategory
 * @param size is the size of the icon
 * @param color is the color of the icon
 * @returns icon based on subcategory name
 */

export const FindSubCategoryIcon = ({
    name,
    size,
    color
}: {
    name: string;
    size: number;
    color: string;
}) => {
    let Icon;
    switch (name) {
        case 'Brief history':
            Icon = <FontAwesome5 name="history" size={size} color={color} />;
            break;
        case 'Job':
            Icon = <FontAwesome5 name="suitcase" size={size} color={color} />;
            break;
        case 'Education':
            Icon = <Ionicons name="school-outline" size={size} color={color} />;
            break;
        case 'Kindergarten':
            Icon = (
                <MaterialIcons
                    name="family-restroom"
                    size={size}
                    color={color}
                />
            );
            break;
        case 'School':
            Icon = <FontAwesome5 name="school" size={size} color={color} />;
            break;
        case 'Emergency':
            Icon = <Feather name="phone" size={size} color={color} />;
            break;
        case 'Coronavirus':
            Icon = (
                <MaterialIcons name="coronavirus" size={size} color={color} />
            );
            break;
        case 'Hospital':
            Icon = (
                <MaterialCommunityIcons
                    name="hospital-box-outline"
                    size={size}
                    color={color}
                />
            );
            break;
        case 'Emergency numbers':
            Icon = <Feather name="phone" size={size} color={color} />;
            break;
        default:
            Icon = <Feather name="link-2" size={size} color={color} />;
            break;
    }
    return Icon;
};

/**
 * A function that returns type of icon based on Wiki category name
 *
 * @param name is the name of the wiki category
 * @param size is the size of the icon
 * @returns icon based on the wiki category name
 */

export const FindWikiIcon = ({
    name,
    size
}: {
    name: string;
    size: number;
}) => {
    let Icon;
    switch (name) {
        case 'New in Norway':
            Icon = <FontAwesome name="flag" size={size} color="red" />;
            break;
        case 'Family':
            Icon = (
                <MaterialIcons
                    name="family-restroom"
                    size={size}
                    color="#1E4161"
                />
            );
            break;
        case 'Health':
            Icon = (
                <FontAwesome name="stethoscope" size={size} color="#000000" />
            );
            break;
        case 'Economy':
            Icon = (
                <MaterialIcons
                    name="attach-money"
                    size={size}
                    color="#10520A"
                />
            );
            break;
        case 'Sparetime':
            Icon = (
                <MaterialIcons name="sports-soccer" size={size} color="black" />
            );
            break;
        case 'SOS':
            Icon = (
                <Image
                    style={{ width: 90, height: size }}
                    source={require('../assets/SOS.png')}
                />
            );
            break;
        default:
            Icon = <></>;
            break;
    }
    return Icon;
};
