import { Collection, _ } from 'okta';
import FactorOptions from '../components/FactorOptions';
import FactorUtil from '../../util/FactorUtil';

const changeLabelToTop = (opt) => {
  return Object.assign({}, opt, { 'label-top': true });
};

const createFactorSelectView = (opt) => {
  var optionItems = (opt.options || [])
    .map(opt => {
      return Object.assign({}, FactorUtil.getFactorData(opt.factorType), opt);
    });
  return {
    View: FactorOptions,
    options: {
      name: opt.name,
      collection: new Collection(optionItems),
    }
  };
};

const createAuthenticatorSelectView = (opt) => {
  var optionItems = (opt.options || [])
    .map(opt => {
      return Object.assign({}, FactorUtil.getFactorData(opt.authenticatorType), opt);
    });
  return {
    View: FactorOptions,
    options: {
      name: opt.name,
      collection: new Collection(optionItems),
    }
  };
};

const inputCreationStrategy = {
  text: changeLabelToTop,
  password: changeLabelToTop,
  factorSelect: createFactorSelectView,
  authenticatorSelect: createAuthenticatorSelectView,
};

const create = function (uiSchemaObj) {
  const strategyFn = inputCreationStrategy[uiSchemaObj.type] || _.identity;
  return strategyFn(uiSchemaObj);
};
module.exports = {
  create,
};
