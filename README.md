# user_system

使用 Express + TypeSrcipt 開發

## Docker run
```bash
$ docker-compose build --no-cache
$ docker-compose up -d
```

## API
```bash
API Prefix /api/user/

{POST} /register
{POST} /login
{GET}  /dummy-data
{POST} /change-password
{POST} /validate-refresh-token
```