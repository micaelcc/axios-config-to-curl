class CurlGenerator {
  constructor(config) {
    this.axiosConfig = config;
  }

  generate() {
    return `curl --location ${this._getMethod()} "${this._getUrl()}" ${this._getHeaders()} ${this._getBody()}`.trim();
  }

  _getMethod() {
    return `--request ${this.axiosConfig.method.toUpperCase()}`;
  }

  _getUrl() {
    const { baseURL, url, params } = this.axiosConfig;

    let requestUrl = baseURL ? baseURL + url : url;

    if (!params) return requestUrl;

    requestUrl += "?";

    Object.keys(params).forEach((key) => {
      const param = params[key];

      if (Array.isArray(param) && param.length > 0) {
        param.forEach((item) => {
          requestUrl += `${key}=${item}&`;
        });
      } else if (param) {
        requestUrl += `${key}=${param}&`;
      }
    });
    return requestUrl.slice(0, -1);
  }

  _getHeaders() {
    const headers = Object.keys(this.axiosConfig.headers ?? {});

    if (headers.length === 0) return "";

    let curlHeaders = "";

    headers.forEach((key) => {
      let header = this.axiosConfig.headers[key];

      if (!header && key === "Content-Type") header = "application/json";

      if (header) curlHeaders = curlHeaders + `--header '${key}: ${header}' `;
    });

    return curlHeaders;
  }

  _getBody() {
    const { data } = this.axiosConfig;

    if (
      this._getMethod() === "GET" ||
      !data ||
      data === "" ||
      data === "undefined"
    )
      return "";

    return `--data '${JSON.stringify(data)}'`;
  }
}

export { CurlGenerator };
