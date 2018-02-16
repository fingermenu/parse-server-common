// @flow

import { Common, ImmutableEx } from '@microbusiness/common-javascript';
import Immutable, { List, Map } from 'immutable';
import { BaseObject } from '@microbusiness/parse-server-common';
import ChoiceItemPrice from './ChoiceItemPrice';
import MenuItem from './MenuItem';
import Size from './Size';

export default class MenuItemPrice extends BaseObject {
  static spawn = info => {
    const object = new MenuItemPrice();

    MenuItemPrice.updateInfoInternal(object, info);

    return object;
  };

  static updateInfoInternal = (object, info) => {
    object.set('currentPrice', info.get('currentPrice'));
    object.set('wasPrice', info.get('wasPrice'));
    object.set('validFrom', info.get('validFrom'));
    object.set('validUntil', info.get('validUntil'));
    BaseObject.createPointer(object, info, 'menuItem', MenuItem);
    BaseObject.createPointer(object, info, 'size', Size);
    BaseObject.createArrayPointer(object, info, 'toBeServedWithMenuItemPrice', MenuItemPrice);
    BaseObject.createArrayPointer(object, info, 'choiceItemPrice', ChoiceItemPrice);
    BaseObject.createUserPointer(object, info, 'addedByUser');
    BaseObject.createUserPointer(object, info, 'removedByUser');

    const toBeServedWithMenuItemPriceSortOrderIndices = info.get('toBeServedWithMenuItemPriceSortOrderIndices');

    if (Common.isNull(toBeServedWithMenuItemPriceSortOrderIndices)) {
      object.set('toBeServedWithMenuItemPriceSortOrderIndices', {});
    } else if (toBeServedWithMenuItemPriceSortOrderIndices) {
      object.set('toBeServedWithMenuItemPriceSortOrderIndices', toBeServedWithMenuItemPriceSortOrderIndices.toJS());
    }

    const choiceItemPriceSortOrderIndices = info.get('choiceItemPriceSortOrderIndices');

    if (Common.isNull(choiceItemPriceSortOrderIndices)) {
      object.set('choiceItemPriceSortOrderIndices', {});
    } else if (choiceItemPriceSortOrderIndices) {
      object.set('choiceItemPriceSortOrderIndices', choiceItemPriceSortOrderIndices.toJS());
    }
  };

  constructor(object) {
    super(object, 'MenuItemPrice');
  }

  updateInfo = info => {
    MenuItemPrice.updateInfoInternal(this.getObject(), info);

    return this;
  };

  getInfo = () => {
    const object = this.getObject();
    const menuItem = object.get('menuItem');
    const size = object.get('size');
    const toBeServedWithMenuItemPriceObjects = object.get('toBeServedWithMenuItemPrices');
    const toBeServedWithMenuItemPrices = toBeServedWithMenuItemPriceObjects
      ? Immutable.fromJS(toBeServedWithMenuItemPriceObjects).map(toBeServedWithMenuItemPrice =>
        new MenuItemPrice(toBeServedWithMenuItemPrice).getInfo(),
      )
      : undefined;
    const choiceItemPriceObjects = object.get('choiceItemPrices');
    const choiceItemPrices = choiceItemPriceObjects
      ? Immutable.fromJS(choiceItemPriceObjects).map(choiceItemPrice => new ChoiceItemPrice(choiceItemPrice).getInfo())
      : undefined;
    const addedByUser = object.get('addedByUser');
    const removedByUser = object.get('removedByUser');

    return ImmutableEx.removeUndefinedProps(
      Map({
        id: this.getId(),
        currentPrice: object.get('currentPrice'),
        wasPrice: object.get('wasPrice'),
        validFrom: object.get('validFrom'),
        validUntil: object.get('validUntil'),
        menuItem,
        menuItemId: menuItem ? menuItem.id : undefined,
        size,
        sizeId: size ? size.id : undefined,
        toBeServedWithMenuItemPrices,
        toBeServedWithMenuItemPriceIds: toBeServedWithMenuItemPrices
          ? toBeServedWithMenuItemPrices.map(toBeServedWithMenuItemPrice => toBeServedWithMenuItemPrice.get('id'))
          : List(),
        choiceItemPrices,
        choiceItemPriceIds: choiceItemPrices ? choiceItemPrices.map(choiceItemPrice => choiceItemPrice.get('id')) : List(),
        addedByUser,
        addedByUserId: addedByUser ? addedByUser.id : undefined,
        removedByUser,
        removedByUserId: removedByUser ? removedByUser.id : undefined,
        toBeServedWithMenuItemPriceSortOrderIndices: Immutable.fromJS(object.get('toBeServedWithMenuItemPriceSortOrderIndices')),
        choiceItemPriceSortOrderIndices: Immutable.fromJS(object.get('choiceItemPriceSortOrderIndices')),
      }),
    );
  };
}
