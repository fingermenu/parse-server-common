// @flow

import { Common, ImmutableEx } from '@microbusiness/common-javascript';
import { BaseObject } from '@microbusiness/parse-server-common';
import Immutable, { List, Map } from 'immutable';
import Restaurant from './Restaurant';
import Table from './Table';

export default class Order extends BaseObject {
  static spawn = info => {
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

    const customers = info.get('customers');

    if (Common.isNull(customers)) {
      object.set('customers', []);
    } else if (customers) {
      object.set('customers', customers.toJS());
    }

    BaseObject.createPointer(object, info, 'table', Table);
    BaseObject.createPointer(object, info, 'restaurant', Restaurant);
    BaseObject.createStringColumn(object, info, 'notes');
    object.set('placedAt', info.get('placedAt'));
    object.set('cancelledAt', info.get('cancelledAt'));
    object.set('correlationId', info.get('correlationId'));
  };

  constructor(object) {
    super(object, 'Order');
  }

  updateInfo = info => {
    Order.updateInfoInternal(this.getObject(), info);

    return this;
  };

  getInfo = () => {
    const object = this.getObject();
    const restaurant = object.get('restaurant');
    const table = object.get('table');

    return ImmutableEx.removeUndefinedProps(
      Map({
        id: this.getId(),
        createdAt: object.get('createdAt'),
        updatedAt: object.get('updatedAt'),
        details: object.get('details') ? Immutable.fromJS(object.get('details')) : List(),
        customers: object.get('customers') ? Immutable.fromJS(object.get('customers')) : List(),
        restaurant,
        restaurantId: restaurant ? restaurant.id : undefined,
        table,
        tableId: table ? table.id : undefined,
        notes: object.get('notes'),
        placedAt: object.get('placedAt'),
        cancelledAt: object.get('cancelledAt'),
        correlationId: object.get('correlationId'),
      }),
    );
  };
}
