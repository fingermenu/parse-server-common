// @flow

import { Common, ImmutableEx } from '@microbusiness/common-javascript';
import Immutable, { Map } from 'immutable';
import { BaseObject } from '@microbusiness/parse-server-common';
import Restaurant from './Restaurant';
import Table from './Table';

export default class Order extends BaseObject {
  static spawn = (info) => {
    const object = new Order();

    Order.updateInfoInternal(object, info);

    return object;
  };

  static updateInfoInternal = (object, info) => {
    const details = info.get('details');

    if (Common.isNull(details)) {
      object.set('details', []);
    } else if (details) {
      object.set('details', details.toJS());
    }

    BaseObject.createPointer(object, info, 'table', Table);
    BaseObject.createPointer(object, info, 'restaurant', Restaurant);
    object.set('numberOfAdults', info.get('numberOfAdults'));
    object.set('numberOfChildren', info.get('numberOfChildren'));
    BaseObject.createStringColumn(object, info, 'customerName');
    BaseObject.createStringColumn(object, info, 'notes');
    object.set('totalPrice', info.get('totalPrice'));
    object.set('placedAt', info.get('placedAt'));
    object.set('cancelledAt', info.get('cancelledAt'));
  };

  constructor(object) {
    super(object, 'Order');
  }

  updateInfo = (info) => {
    Order.updateInfoInternal(this.getObject(), info);

    return this;
  };

  getInfo = () => {
    const object = this.getObject();
    const restaurant = object.get('restaurant');
    const table = object.get('table');

    return ImmutableEx.removeUndefinedProps(Map({
      id: this.getId(),
      details: Immutable.fromJS(object.get('details')),
      restaurant,
      restaurantId: restaurant ? restaurant.id : undefined,
      table,
      tableId: table ? table.id : undefined,
      numberOfAdults: object.get('numberOfAdults'),
      numberOfChildren: object.get('numberOfChildren'),
      customerName: object.get('customerName'),
      notes: object.get('notes'),
      totalPrice: object.get('totalPrice'),
      placedAt: object.get('placedAt'),
      cancelledAt: object.get('cancelledAt'),
    }));
  };
}