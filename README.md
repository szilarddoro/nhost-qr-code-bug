# QR code generation problem in nhost

## Run project locally

```
nhost dev
```

Click URL:
http://localhost:1337/v1/functions/generate-qr?locationId=1&address=some-address&description=some-description

It will generate and display the QR code as a PNG.

It generates a QR with the contents of the passed parameters

## Run in production

Once deployed to nhost, you can access it like this:

https://veywluagclwbyvxhgycw.functions.eu-central-1.nhost.run/v1/generate-qr?locationId=1&address=some-address&description=some-description

It will generate _something_ and force to download. It looks like PNG, but we receive it as `application/octet` and the PNG content is not valid.
