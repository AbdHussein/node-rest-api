export default{
    port: 1337,
    host: 'localhost',
    dbURI: 'mongodb+srv://admin_usr:mRQZ9S3jUqpkdJFS@cluster0.3xayr.mongodb.net/rest_api?retryWrites=true&w=majority',
    saltWorkFactor: 10,
    accessTokenTtl: '15m',
    refreshTokenTtl: '1y',
    privateKey: `
-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgQCPjiEN4W/M5AZowttFPUrfYgCTYqfAT1VH1CQ8D1Z1FXzN4RBI
3sDymWPWhdktdsgy4QhJbsACAoiOtWFKdkqORj1CwKKWxlktg3oButejVUD5iLnq
gGhtGwIwdEXD3MNB+MoLatFIRKiwfq+QrauagF1CRUzOpeUq42LleI3DUwIDAQAB
AoGANwLGE+WhzChNdHPHRv834+ZQRip2EjHUglP/Fqzh+rgjPVnTvbjuw4iYQ6rD
ELMGAMlPPaSdG6gQ4G8NO1WdN9XAoT8FUgz9PAmmcFj4ne5n9v3NAgkmpLS+ZDYz
KaDFjjZlAnTqiaZJkUW/fXvbTKvPxoiCa5LnGRZURF7yIcECQQDt8Bb+/Ajket5J
3b8zaQa4brroCR2E3RGm3DjRgtsLZTweQ+9ylRDdFuXTJOGVJwIVOchS6bkfVJYR
P31orHrDAkEAmnPgL23TmlEzSSks0qaA+kwAjTNcZ11N7Eclzm/QSvv4uZDipF+K
mHxpALYDpcBYKuo0pfyzFWO1plqBaUBsMQJAASh9BCq35FzQvi1NI/Pr63PmhwCc
Wyw0TMqfoC1x4YFRpJgSD024cksNPVTdoDs7YF0So4ytsQBZZqYXdy33vwJAKfAa
yGYW1ckElvHyNMR3Mv9eCvkONxbTqLts3Y/oy+N9Fs3rbFxw4pStYj8J4IDIr+Zm
I0fpTH6FfUUH7I9MkQJAcuFSjuJl/WO/stgoZ9v191KRQMt+6U6uCWDuD1HPTsMD
jjkcJLRrbEw1OVIZPyCOnGrWs1NFQSavrO0ISaQnsg==
-----END RSA PRIVATE KEY-----`,
    publicKey:`
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCPjiEN4W/M5AZowttFPUrfYgCT
YqfAT1VH1CQ8D1Z1FXzN4RBI3sDymWPWhdktdsgy4QhJbsACAoiOtWFKdkqORj1C
wKKWxlktg3oButejVUD5iLnqgGhtGwIwdEXD3MNB+MoLatFIRKiwfq+QrauagF1C
RUzOpeUq42LleI3DUwIDAQAB
-----END PUBLIC KEY-----`,
}