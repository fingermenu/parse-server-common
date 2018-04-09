// @flow

import { ImmutableEx } from '@microbusiness/common-javascript';
import Immutable, { List, Map } from 'immutable';
import { BaseObject } from '@microbusiness/parse-server-common';
import ChoiceItem from './ChoiceItem';
import Size from './Size';
import Tag from './Tag';

export default class ChoiceItemPrice extends BaseObject {
  static spawn = info => {
    const object = new ChoiceItemPrice();

    ChoiceItemPrice.updateInfoInternal(object, info);

    return object;
  };

  static updateInfoInternal = (object, info) => {
    object.set('currentPrice', info.get('currentPrice'));
    object.set('wasPrice', info.get('wasPrice'));
    object.set('validFrom', info.get('validFrom'));
    object.set('validUntil', info.get('validUntil'));
    BaseObject.createPointer(object, info, 'choiceItem', ChoiceItem);
    BaseObject.createPointer(object, info, 'size', Size);
    BaseObject.createUserPointer(object, info, 'addedByUser');
    BaseObject.createUserPointer(object, info, 'removedByUser');
    BaseObject.createArrayPointer(object, info, 'tag', Tag);
  };

  constructor(object) {
    super(object, 'ChoiceItemPrice');
  }

  updateInfo = info => {
    ChoiceItemPrice.updateInfoInternal(this.getObject(), info);

    return this;
  };

  getInfo = () => {
    const object = this.getObject();
    const choiceItem = object.get('choiceItem');
    const size = object.get('size');
    const addedByUser = object.get('addedByUser');
    const removedByUser = object.get('removedByUser');
    const tagObjects = object.get('tags');
    const tags = tagObjects ? Immutable.fromJS(tagObjects).map(tag => new Tag(tag).getInfo()) : undefined;

    return ImmutableEx.removeUndefinedProps(
      Map({
        id: this.getId(),
        currentPrice: object.get('currentPrice'),
        wasPrice: object.get('wasPrice'),
        validFrom: object.get('validFrom'),
        validUntil: object.get('validUntil'),
        choiceItem,
        choiceItemId: choiceItem ? choiceItem.id : undefined,
        size,
        sizeId: size ? size.id : undefined,
        addedByUser,
        addedByUserId: addedByUser ? addedByUser.id : undefined,
        removedByUser,
        removedByUserId: removedByUser ? removedByUser.id : undefined,
        tags,
        tagIds: tags ? tags.map(tag => tag.get('id')) : List(),
      }),
    );
  };
}
