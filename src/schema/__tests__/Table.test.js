// @flow

import Chance from 'chance';
import { Map } from 'immutable';
import '../../../bootstrap';
import TestHelper from '../../../TestHelper';
import { Table } from '..';
import createRestaurants from '../../services/__tests__/RestaurantService.test';
import createTableStates from '../../services/__tests__/TableStateService.test';

const chance = new Chance();

export const createTableInfo = async () => {
  const restaurant = (await createRestaurants(1)).first();
  const tableState = (await createTableStates(1)).first();
  const ownedByUser = await TestHelper.createUser();
  const maintainedByUsers = await TestHelper.createUsers();
  const table = Map({
    customers: TestHelper.createRandomList(),
    name: TestHelper.createRandomMultiLanguagesString(),
    status: chance.string(),
    restaurantId: restaurant.get('id'),
    tableStateId: tableState.get('id'),
    ownedByUserId: ownedByUser.id,
    maintainedByUserIds: maintainedByUsers.map(maintainedByUser => maintainedByUser.id),
    notes: chance.string(),
    sortOrderIndex: chance.integer(),
    lastOrderCorrelationId: chance.string(),
  });

  return {
    table,
    restaurant,
    tableState,
    ownedByUser,
    maintainedByUsers,
  };
};

export const createTable = async object => Table.spawn(object || (await createTableInfo()).table);

export const expectTable = (object, expectedObject, { tableId, expectedRestaurant, expectedTableState } = {}) => {
  expect(object.get('details')).toEqual(expectedObject.get('details'));
  expect(object.get('name')).toEqual(expectedObject.get('name'));
  expect(object.get('state')).toBe(expectedObject.get('state'));
  expect(object.get('status')).toBe(expectedObject.get('status'));
  expect(object.get('restaurantId')).toBe(expectedObject.get('restaurantId'));
  expect(object.get('tableStateId')).toBe(expectedObject.get('tableStateId'));
  expect(object.get('ownedByUserId')).toBe(expectedObject.get('ownedByUserId'));
  expect(object.get('maintainedByUserIds')).toEqual(expectedObject.get('maintainedByUserIds'));
  expect(object.get('notes')).toBe(expectedObject.get('notes'));
  expect(object.get('sortOrderIndex')).toBe(expectedObject.get('sortOrderIndex'));
  expect(object.get('lastOrderCorrelationId')).toBe(expectedObject.get('lastOrderCorrelationId'));

  if (tableId) {
    expect(object.get('id')).toBe(tableId);
  }

  if (expectedRestaurant) {
    expect(object.get('restaurantId')).toEqual(expectedRestaurant.get('id'));
  }

  if (expectedTableState) {
    expect(object.get('tableStateId')).toEqual(expectedTableState.get('id'));
  }
};

describe('constructor', () => {
  test('should set class name', async () => {
    expect((await createTable()).className).toBe('Table');
  });
});

describe('static public methods', () => {
  test('spawn should set provided info', async () => {
    const { table } = await createTableInfo();
    const object = await createTable(table);
    const info = object.getInfo();

    expectTable(info, table);
  });
});

describe('public methods', () => {
  test('getObject should return provided object', async () => {
    const object = await createTable();

    expect(new Table(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', async () => {
    const object = await createTable();

    expect(new Table(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', async () => {
    const object = await createTable();
    const { table: updatedTable } = await createTableInfo();

    object.updateInfo(updatedTable);

    const info = object.getInfo();

    expectTable(info, updatedTable);
  });

  test('getInfo should return provided info', async () => {
    const { table } = await createTableInfo();
    const object = await createTable(table);
    const info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectTable(info, table);
  });
});
