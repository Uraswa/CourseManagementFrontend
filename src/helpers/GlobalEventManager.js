export default class GlobalEventManager {

  subscribtions = {}
  send(type, data){
    if (!this.subscribtions[type]) {
      return;
    }

    for (let uuid in this.subscribtions[type]) {
      this.subscribtions[type][uuid](data);
    }
  }

  subscribe(eventType, uid, callback) {
    if (!this.subscribtions[eventType]) {
      this.subscribtions[eventType] = {}
    }

    this.subscribtions[eventType][uid] = callback;
  }

  unsubscribe(eventType, uid) {
    if (!this.subscribtions[eventType]) {
      return;
    }

    delete this.subscribtions[eventType][uid];
  }

}
