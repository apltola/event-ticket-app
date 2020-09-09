import nats, { Stan } from 'node-nats-streaming';

class NatsWrapper {
  // question mark tells typescript that variable might be undefined for some period of time
  private _client?: Stan;

  // export client instance
  get client() {
    if (!this._client) {
      throw new Error('Cannot access NATS client before connecting');
    }

    return this._client;
  }

  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, { url });

    // return a Promise so that async await can be used when this is imported
    return new Promise((resolve, reject) => {
      this.client.on('connect', () => {
        console.log('🚀 CONNECTED TO NATS');
        resolve();
      });

      this.client.on('error', (err) => {
        reject(err);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();
