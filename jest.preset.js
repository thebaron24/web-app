const nxPreset = require('@nrwl/jest/preset');

module.exports = {
  ...nxPreset,
  testRunner: "jest-jasmine2" //temp fox for https://github.com/ike18t/ng-mocks/issues/610
};
