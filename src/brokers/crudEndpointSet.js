export default class CrudEndpointSet {
  constructor(db, endpointDefinition) {
    this.db = db;
    this.endpointDefinition = endpointDefinition;
  }

  getBasePath(method = 'GET', params) {
    const endpointParams = this.endpointDefinition.params || [];

    let defPath;
    if(method === 'GET' && this.endpointDefinition.uiGetPath) {
      defPath = this.endpointDefinition.uiGetPath;
    } else if(method === 'PUT' && this.endpointDefinition.uiPutPath) {
      defPath = this.endpointDefinition.uiPutPath;
    } else if(method === 'POST' && this.endpointDefinition.uiPostPath) {
      defPath = this.endpointDefinition.uiPostPath;
    } else if(method === 'DELETE' && this.endpointDefinition.uiDeletePath) {
      defPath = this.endpointDefinition.uiDeletePath;
    } else if(this.endpointDefinition.uiPath) {
      defPath = this.endpointDefinition.uiPath;
    } else {
      defPath = this.endpointDefinition.path;
    }

    return Object.entries(endpointParams)
    .reduce(
      (pathAcc, [key, param]) => pathAcc.replace(`:${key}`, params[param.matchIndex - 1]),
      defPath
    );

  }

  get(id = null, params = []) {
    if(id) {
      return this.db.query(`${this.getBasePath('GET', params)}/${id}`);
    }

    return this.db.query(`${this.getBasePath('GET', params)}`);
  }

  update(body, params = []) {
    return this.db.query(`${this.getBasePath('PUT', params)}/${body.id}`, { body: JSON.stringify(body), method: 'PUT' });
  }

  create(body, params = []) {
    return this.db.query(`${this.getBasePath('POST', params)}`, { body: JSON.stringify(body), method: 'POST' });
  }

  upsert(body, params = []) {
    if(body.id) {
      try {
        return this.update(body, params);
      } catch (e) {
        return this.create(body, params);
      }
    }

    return this.create(body, params);
  }

  delete(id, params = []) {
    return this.db.query(`${this.getBasePath('DELETE', params)}/${id}`, { method: 'DELETE' });
  }
}