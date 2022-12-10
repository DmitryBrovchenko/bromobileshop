// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  dbConfig: {
    brandPath: 'dev_Brands',
    carouselPath: 'dev_Carousel',
    cataloguePath: 'dev_Catalogue',
    dictionaryPath: 'dev_Dictionary',
    imagesPath: 'dev_Images',
    structurePath: 'dev_Structure',
  },
  storageConfig: {
    brandPath: 'dev_Brands',
    carouselPath: 'dev_Carousel',
    cataloguePath: 'dev_Catalogue',
  },
  firebaseConfig: {
    apiKey: 'AIzaSyD11SypMc_BWbk4FVM0LuP2Qg_Z_1rnY2I',
    authDomain: 'bromobileshop.firebaseapp.com',
    databaseURL: 'https://bromobileshop.firebaseio.com',
    projectId: 'bromobileshop',
    storageBucket: 'bromobileshop.appspot.com',
    messagingSenderId: '531549808064',
    appId: '1:531549808064:web:b3181424692cdd76205425',
    measurementId: 'G-0FWTJ1MZCE'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
