import xhr from 'xhr';
import {isErrorCode} from "../utils/statusCodes";
import CrudEndpointSet from "./crudEndpointSet";
import endpointDefinitions from '../defs/endpoints';
import { encrypt } from "../utils/rsa";
import { promisify } from 'util';

class ServerBroker {
  constructor() {
    this.serverUrl = 'https://centcom.ddmers.com:3000'; //TODO: Temporary fix because I'm lazy

    this.endpoints = Object.entries(endpointDefinitions)
    .map(([key, endpointDefinition]) => ({ [key]: new CrudEndpointSet(this, endpointDefinition) }))
    .reduce((acc, cur) => ({ ...acc, ...cur }), {});
  }

  async get(key, id = null, params = []) {
    return await this.endpoints[key].get(id, params);
  }

  async create(key, body, params = []) {
    return await this.endpoints[key].create(body, params);
  }

  async encrypt(value) {
    const publicKey = await this.query('/publicKey', {
      plainText: true,
    });

    return encrypt(value, publicKey);
  }

  async update(key, body, params = []) {
    let outputPromises = [];

    const endpoint = this.endpoints[key];
    const endpointDefinition = endpoint.endpointDefinition;

    await endpoint.update(body, params);

    console.log(body);
    endpointDefinition.fields &&
      Object.entries(endpointDefinition.fields)
      .filter(([key, field]) => field.saveHandler && body[key])
      .forEach(([key, field]) => outputPromises.push(field.saveHandler(this, body[key], params)));

    return await outputPromises;
  }

  async delete(key, id, params = []) {
    return await this.endpoints[key].delete(id, params);
  }

  async upsert(key, body, params = []) {
    return await this.endpoints[key].upsert(body, params);
  }

  async query(queryString, {
    method = 'GET',
    body = undefined,
    headers = {},
    plainText = false,
  } = {}) {
    const finalHeaders = {
      'Accept': plainText ? 'text/plain' : 'application/json',
      ...((method === 'POST' || method === 'PUT') && {
        'Content-Type': plainText ? 'text/plain' : 'application/json',
      }),
      ...headers,
    };

    const results = await promisify(xhr)({
      uri: `${this.serverUrl}${queryString}`,
      method,
      body,
      headers: finalHeaders,
      withCredentials: true,
    });

    if(isErrorCode(results.statusCode)) {
      throw JSON.parse(results.body);
    }

    return plainText ? results.body : JSON.parse(results.body);
  }

  async login(username, password) {
    const encryptedPassword = await this.encrypt(password);

    return await this.query('/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password: encryptedPassword,
      }),
    });
  }

  async register(username, email, password) {
    const encryptedPassword = await this.encrypt(password);

    return await this.query('/register', {
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
        password: encryptedPassword,
      }),
    });
  }

  async logout() {
    return await this.query('/logout');
  }
}

export default ServerBroker;
