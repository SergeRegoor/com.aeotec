'use strict';
const path = require('path');
const ZwaveDriver = require('homey-zwavedriver');
// http://www.cd-jackson.com/zwave_device_uploads/355/9-Multisensor-6-V1-07.pdf

module.exports = new ZwaveDriver(path.basename(__dirname), {
	capabilities: {
		measure_battery: {
			command_class: 'COMMAND_CLASS_BATTERY',
			command_report: 'BATTERY_REPORT',
			command_report_parser: function (report) {
				if (report['Battery Level (Raw)']) {
					return report['Battery Level (Raw)'][0];
				} else {
					return null;
				}
			}
		},
		alarm_motion: {
			command_class: 'COMMAND_CLASS_BASIC',
			command_report: 'BASIC_SET',
			command_report_parser: function (report) {
				return report['Value'] === 255;
			}
		},
		measure_temperature: {
			command_class: 'COMMAND_CLASS_SENSOR_MULTILEVEL',
			command_report: 'SENSOR_MULTILEVEL_REPORT',
			command_report_parser: function (report) {
				if (report['Sensor Type'] === 'Temperature (version 1)')
					return report['Sensor Value (Parsed)'];
				return null;
			}

		},
		measure_luminance: {
			command_class: 'COMMAND_CLASS_SENSOR_MULTILEVEL',
			command_report: 'SENSOR_MULTILEVEL_REPORT',
			command_report_parser: function (report) {
				if (report['Sensor Type'] === 'Luminance (version 1)') {
					return report['Sensor Value (Parsed)'];
				} else {
					return null;
				}
			}
		},
		measure_humidity: {
			command_class: 'COMMAND_CLASS_SENSOR_MULTILEVEL',
			command_report: 'SENSOR_MULTILEVEL_REPORT',
			command_report_parser: function (report) {
				if (report['Sensor Type'] === 'Relative humidity (version 2)') {
					return report['Sensor Value (Parsed)'];
				} else {
					return null;
				}
			}
		}
	},
	settings: {
		1: {
			index: 1,
			size: 1
		},
		2: {
			index: 2,
			size: 1
		},
		3: {
			index: 3,
			size: 2
		},
		4: {
			index: 4,
			size: 1
		},
		101: {
			index: 101,
			size: 4
		},
		102: {
			index: 102,
			size: 4
		},
		103: {
			index: 103,
			size: 4
		},
		111: {
			index: 111,
			size: 4
		},
		112: {
			index: 112,
			size: 4
		},
		113: {
			index: 113,
			size: 4
		}
	}
});