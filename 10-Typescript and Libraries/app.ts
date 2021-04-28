//To use 3rd party JS libraries in TS, you need to install the npm package that has the type definitions:

//e.g. to use lodash, install '@types/lodash'
import _ from 'lodash';

// _.

//IF YOU CAN'T FIND TYPES FOR A LIBRARY:
//how to tell ts that something will exist
declare const global: string;