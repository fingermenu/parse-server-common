// @flow

import { ImmutableEx } from '@microbusiness/common-javascript';
import { BaseObject } from '@microbusiness/parse-server-common';
import Immutable, { List, Map } from 'immutable';

export default class Tag extends BaseObject {
  static spawn = info => {
    const object = new Tag();

    Tag.updateInfoInternal(object, info);

    return object;
  };

  static updateInfoInternal = (object, info) => {
    object.set('key', info.get('key'));
    BaseObject.createMultiLanguagesStringColumn(object, info, 'name');
    BaseObject.createMultiLanguagesStringColumn(object, info, 'description');
    object.set('level', info.get('level'));
    object.set('forDisplay', info.get('forDisplay'));
    BaseObject.createPointer(object, info, 'parentTag', Tag);
    BaseObject.createUserPointer(object, info, 'ownedByUser');
    BaseObject.createUserArrayPointer(object, info, 'maintainedByUser');
  };

  constructor(object) {
    super(object, 'Tag');
  }

  updateInfo = info => {
    Tag.updateInfoInternal(this.getObject(), info);

    return this;
  };

  getInfo = () => {
    const object = this.getObject();
    const parentTagObject = object.get('parentTag');
    const parentTag = parentTagObject ? new Tag(parentTagObject) : undefined;
    const ownedByUser = object.get('ownedByUser');
    const maintainedByUsers = Immutable.fromJS(object.get('maintainedByUsers'));

    return ImmutableEx.removeUndefinedProps(
      Map({
        id: this.getId(),
        createdAt: object.get('createdAt'),
        updatedAt: object.get('updatedAt'),
        key: object.get('key'),
        name: this.getMultiLanguagesString('name'),
        description: this.getMultiLanguagesString('description'),
        level: object.get('level'),
        forDisplay: object.get('forDisplay'),
        parentTag: parentTag ? parentTag.getInfo() : undefined,
        parentTagId: parentTag ? parentTag.getId() : undefined,
        ownedByUser,
        ownedByUserId: ownedByUser ? ownedByUser.id : undefined,
        maintainedByUsers,
        maintainedByUserIds: maintainedByUsers ? maintainedByUsers.map(maintainedByUser => maintainedByUser.id) : List(),
      }),
    );
  };
}
