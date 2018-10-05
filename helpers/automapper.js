/* eslint-disable no-param-reassign, no-prototype-builtins */
const mapper = require('automapper-ts');
const cloneDeep = require('lodash/cloneDeep');

class AutoMapper {
  constructor() {
    this._mappings = [];
    this.mapper = cloneDeep(mapper);
    this.copyOwnProperties = this.copyOwnProperties.bind(this);
    this.copyDefinedProperties = this.copyDefinedProperties.bind(this);
  }

  _canWriteToProperty(model, prop) {
    if (Object.getOwnPropertyDescriptor) {
      const descriptor = Object.getOwnPropertyDescriptor(model, prop);

      if (descriptor && descriptor.get && !descriptor.set) {
        return false;
      }
    }

    return true;
  }

  createMap(sourceType, destinationType) {
    const existingMapping = this._mappings.find(mapping => mapping.sourceType === sourceType && mapping.destinationType === destinationType);

    if (existingMapping) {
      const sourceName = sourceType.name || sourceType;
      const destinationName = destinationType.name || destinationType;

      throw new Error(`Mapping from ${sourceName} to ${destinationName} already exists`);
    }

    this._mappings.push({
      sourceType,
      destinationType
    });

    return this.mapper.createMap(sourceType, destinationType);
  }

  map(sourceType, destinationType, source) {
    if (source) {
      return this.mapper.map(sourceType, destinationType, source);
    }

    return null;
  }

  mapArray(sourceType, destinationType, list) {
    if (Array.isArray(list)) {
      return list.map(source => this.mapper.map(sourceType, destinationType, source));
    }

    return null;
  }

  copyOwnProperties(model, prop, value) {
    if (model.hasOwnProperty(prop) && this._canWriteToProperty(model, prop)) {
      model[prop] = value;
    }
  }

  copyDefinedProperties(model, prop, value) {
    if (value !== undefined && this._canWriteToProperty(model, prop)) {
      model[prop] = value;
    }
  }

  copyUsingDictionary(dictionary) {
    return (model, prop, value) => {
      const modelProp = dictionary[prop];
      if (modelProp) {
        model[modelProp] = value;
      }
    };
  }
}

module.exports = AutoMapper;
