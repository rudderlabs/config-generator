


// copy the {destination}.json into src/components/destination/destinationList/
// copy the {destination}.svg into src/icons/svg/ 
//copy the {destination}.md into src/components/destinationsCatalogue/destinationsConfigure 
//can ignore the destinationsSettins.json file. 

// copy into /Users/rudderstack/rudderstack/config-generator/src/components/destination/destinationList/dst.ts
const KSUID = require('ksuid');


const printDST = (x) => {
  console.log(`${x}: require('./${x}.json')`);
}

const print1= (x) => {
   console.log(`import {ReactComponent as ${(x)}} from '@svg/${x.toLowerCase()}.svg';`)
}

const print2 = (x) => {
    console.log(`case '${x.toLowerCase()}':
     return <${(x)} width={width} height={height} />;`)
} 

// function to capitalise the first letter of the source / destination name 
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
}

// function to get the names with spaces "First Name"
const  spacedUpperCamelCase = (string) => {
  return string.split('_').reduce((strPrev,strCurr) => { return`${strPrev} ${capitalizeFirstLetter(strCurr)}`},
  ''
  )
}

//function to get the names without spaces "FirstName"
const upperCamelCase = (string) => {
  return string.split('_').reduce((strPrev,strCurr) => { return`${strPrev}${capitalizeFirstLetter(strCurr)}`},
  ''
  )
}
const print3 = (x) => {
  console.log(`import {ReactComponent as ${upperCamelCase(x)}} from './${x.toLowerCase()}.svg';`)
}

const print4 = (x) => {
    console.log(` case '${x.toLowerCase()}':
    Icon = ${upperCamelCase(x)};
    break;
   `)
}

const print6 = (x) => {
  console.log(`${upperCamelCase(x)}: raw('./${upperCamelCase(x)}.md'),`);
}

const printConfig = (x) => {
    console.log( `{
    "options": null,
    "category":null,
    "id": "${KSUID.randomSync().string}",
    "name":"${x}",
    "displayName":"${capitalizeFirstLetter(x)}",
    "createdAt": "2019-09-02T08:08:05.613Z",
    "updatedAt":"2021-10-20T18:06:26.219Z"
  },`)
}

const generate = (arr) => {
  console.log('***** copy into /Users/rudderstack/rudderstack/config-generator/src/components/destination/destinationList/dst.ts ****');
  for( const a in arr) {
    printDST(arr[a])
  }

  console.log('******* copy into src/icons/svg/index.tsx *******')
  for( const a in arr) {
    print3(arr[a])
  }

  for( const a in arr) {
    print4(arr[a])
  }

  console.log('**** for destinations.json to update the list of destinations src/stores/destinations.json *****');
  for( const a in arr) {
    printConfig(arr[a])
  }

  console.log('**** for destination icon   src/components/icons/destinationIcon.tsx ****');
  for( const a in arr) {
    print1(arr[a])
  }

  for( const a in arr) {
    print2(arr[a])
  }

  console.log('**  for /Users/rudderstack/rudderstack/config-generator/src/components/sourcesCatalogue/sourcesConfigure/index.tsx  **')
  for( const a in arr) {
    print6(arr[a])
  }
}

//update the array for the destiations required. 

const arr = ['APPCENTER','BQ','CORDOVA','CUSTOM','GOOGLE_SHEETS','HUBSPOT','MSSQL','RS','SALESFORCE','WEBHOOK','ZENDESK'];
generate(arr);


