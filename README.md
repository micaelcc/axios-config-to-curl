# axios-config-to-curl
## A configuration converter for Axios to cURL

### Example
```js
import axios from "axios";
import { toCurl } from "axios-config-to-curl";

const instance = axios.create({
  baseURL: "http://test.com",
  headers: {
    Accept: "*",
  },
  timeout: 1
});

instance.interceptors.request.use((config) => {
  console.log(`cURL: ${toCurl(config)}`);
  return config;
});

instance.get("/users", {
    params: {
      name: "name1",
      mail: "mail@mail.com",
    },
}).catch(_ => {})
```

## License

MIT

**Free Software, Hell Yeah!**
