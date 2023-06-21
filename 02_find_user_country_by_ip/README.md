# Find User Country By IP

Project showcases API with one POST route ("/") where user have to provide IP address in the body of the request in JSON format

```json
{
  "ip": "IP"
}
```

API will return the user's address range and country from CSV file. CSV file yet have some mistakes, for example if user provide IP address of Spain

```json
{
  "ip": "83.229.33.3"
}
```

API will return

```json
{
  "country": "Congo (Democratic Republic of the)",
  "startOfRange": "83.229.33.0",
  "endOfRange": "83.229.33.255"
}
```

But that is the problem of CSV file

#### Setup

```bash
npm install
```

## Author

👤 **Mykhailo Krachun**

- GitHub: [@mykhailokrachun](https://github.com/mykhailokrachun)
- LinkedIn: [Mykhailo K](https://www.linkedin.com/in/mykhailo-krachun-98516025a/)
