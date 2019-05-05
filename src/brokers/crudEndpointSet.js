require('@babel/polyfill');

export default class CrudEndpointSet {
  constructor(db, endpointDefinition) {
    this.db = db;
    this.endpointDefinition = endpointDefinition;
  }

  getBasePath(method = 'GET', params) {
    const endpointParams = this.endpointDefinition.params || [];

    let defPath;
    if (method === 'GET' && this.endpointDefinition.getPath) {
      defPath = this.endpointDefinition.getPath;
    } else if (method === 'PUT' && this.endpointDefinition.putPath) {
      defPath = this.endpointDefinition.putPath;
    } else if (method === 'POST' && this.endpointDefinition.postPath) {
      defPath = this.endpointDefinition.postPath;
    } else if (method === 'DELETE' && this.endpointDefinition.deletePath) {
      defPath = this.endpointDefinition.deletePath;
    } else {
      defPath = this.endpointDefinition.path;
    }

    return Object.entries(endpointParams)
    .reduce(
      (pathAcc, [key, param]) => pathAcc.replace(`:${key}`, params[param.matchIndex - 1]),
      defPath
    );
  }

  async get(id = null, params = []) {
    if (id) {
      return await this.db.query(`${this.getBasePath('GET', params)}/${id}`);
    }

    return await this.db.query(`${this.getBasePath('GET', params)}`);
  }

  async update(body, params = []) {
    const transformedBody = await this.postTransform(body);

    return await this.db.query(`${this.getBasePath('PUT', params)}/${transformedBody.id}`, {
      body: JSON.stringify(transformedBody),
      method: 'PUT'
    });
  }

  async create(body, params = []) {
    const transformedBody = await this.postTransform(body);

    return await this.db.query(`${this.getBasePath('POST', params)}`, { body: JSON.stringify(transformedBody), method: 'POST' });
  }

  async postTransform(body) {
    if (typeof body !== 'object') {
      return body;
    }

    const transformedFields = await Promise.all(
      Object.entries(body).map(
        async ([key, value]) => {
          const field = Object.entries(this.endpointDefinition.fields).find(([fieldName]) => fieldName === key);

          if (!field) {
            return { [key]: value };
          }

          const fieldData = field[1];

          if (fieldData.postTransform) {
            const transformedValue = await fieldData.postTransform(value);

            return { [key]: transformedValue };
          }

          return { [key]: value };
        }
      )
    );

    return transformedFields.reduce((acc, val) => ({ ...acc, ...val }));
  }

  async upsert(body, params = []) {
    if (body.id) {
      try {
        return await this.update(body, params);
      } catch (e) {
        return await this.create(body, params);
      }
    }

    return await this.create(body, params);
  }

  async delete(id, params = []) {
    return await this.db.query(`${this.getBasePath('DELETE', params)}/${id}`, { method: 'DELETE' });
  }
}