// @flow

import Chance from 'chance';
import { Map } from 'immutable';
import TestHelper from '../../../TestHelper';
import { ChoiceItemPrice } from '../';
import createChoiceItems from '../../services/__tests__/ChoiceItemService.test';

const chance = new Chance();

export const createChoiceItemPriceInfo = async () => {
  const choiceItem = (await createChoiceItems(chance.integer({ min: 1, max: 1 }))).first();
  const addedByUser = await TestHelper.createUser();
  const removedByUser = await TestHelper.createUser();
  const choiceItemPrice = Map({
    currentPrice: chance.floating(),
    wasPrice: chance.floating(),
    validFrom: new Date(),
    validUntil: new Date(),
    choiceItemId: choiceItem.get('id'),
    addedByUserId: addedByUser.id,
    removedByUserId: removedByUser.id,
  });

  return {
    choiceItemPrice,
    choiceItem,
    addedByUser,
    removedByUser,
  };
};

export const createChoiceItemPrice = async object => ChoiceItemPrice.spawn(object || (await createChoiceItemPriceInfo()).choiceItemPrice);

export const expectChoiceItemPrice = (object, expectedObject, { choiceItemPriceId, expectedChoiceItem } = {}) => {
  expect(object.get('currentPrice')).toBe(expectedObject.get('currentPrice'));
  expect(object.get('wasPrice')).toBe(expectedObject.get('wasPrice'));
  expect(object.get('validFrom')).toEqual(expectedObject.get('validFrom'));
  expect(object.get('validUntil')).toEqual(expectedObject.get('validUntil'));
  expect(object.get('choiceItemId')).toBe(expectedObject.get('choiceItemId'));
  expect(object.get('addedByUserId')).toBe(expectedObject.get('addedByUserId'));
  expect(object.get('removedByUserId')).toBe(expectedObject.get('removedByUserId'));

  if (choiceItemPriceId) {
    expect(object.get('id')).toBe(choiceItemPriceId);
  }

  if (expectedChoiceItem) {
    expect(object.get('choiceItemId')).toEqual(expectedChoiceItem.get('id'));
  }
};

describe('constructor', () => {
  test('should set class name', async () => {
    expect((await createChoiceItemPrice()).className).toBe('ChoiceItemPrice');
  });
});

describe('static public methods', () => {
  test('spawn should set provided info', async () => {
    const { choiceItemPrice } = await createChoiceItemPriceInfo();
    const object = await createChoiceItemPrice(choiceItemPrice);
    const info = object.getInfo();

    expectChoiceItemPrice(info, choiceItemPrice);
  });
});

describe('public methods', () => {
  test('getObject should return provided object', async () => {
    const object = await createChoiceItemPrice();

    expect(new ChoiceItemPrice(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', async () => {
    const object = await createChoiceItemPrice();

    expect(new ChoiceItemPrice(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', async () => {
    const object = await createChoiceItemPrice();
    const { choiceItemPrice: updatedChoiceItemPrice } = await createChoiceItemPriceInfo();

    object.updateInfo(updatedChoiceItemPrice);

    const info = object.getInfo();

    expectChoiceItemPrice(info, updatedChoiceItemPrice);
  });

  test('getInfo should return provided info', async () => {
    const { choiceItemPrice } = await createChoiceItemPriceInfo();
    const object = await createChoiceItemPrice(choiceItemPrice);
    const info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectChoiceItemPrice(info, choiceItemPrice);
  });
});
