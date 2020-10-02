import {ProfileCard, ProfileId, PublicProfile, PublicProfileReference} from '@dorders/model-profile';
import {SimplePublicProfileReference} from './SimplePublicProfileReference';
import {valueAsString} from '@dorders/fwk-model-core';
import {ProfileMap, ProfileMapKey} from '../map';

export class SimplePublicProfile implements PublicProfile {

  constructor(
    public readonly repositoryId: string,
    public readonly profileId: ProfileId,
    public readonly map: ProfileMap
  ) {
  }

  get card(): ProfileCard {
    try {
      const profileCardAsString = this.map.get(ProfileMapKey.publicCard);
      if (profileCardAsString && profileCardAsString.startsWith('{')) {
        return JSON.parse(profileCardAsString);
      }
      return profileCardAsString;
    } catch (e) {
      console.trace('unable to get the card for profile (%s)', this.profileId, e);
      return this.profileId;
    }
  }

  get name() {
    const card = this.card;
    if (!card) {
      return this.profileId;
    }
    if (typeof card === 'string') {
      return card;
    }
    if (card.name) {
      return valueAsString(card.name)
    }
    return valueAsString(card.alternateName) || this.profileId;
  }

  async getReference(): Promise<PublicProfileReference> {
    return new SimplePublicProfileReference(this.profileId, this.name);
  }

}
