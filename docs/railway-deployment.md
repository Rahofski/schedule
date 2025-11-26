# Deployment на Railway

## Переменные окружения для Production

### Frontend (Next.js)

Добавь в Railway переменные окружения:

```bash
# Public (доступны в браузере)
NEXT_PUBLIC_FRONTEND_URL=https://frontend-production-bd28.up.railway.app
NEXT_PUBLIC_SERVICE_TITLE=Школьное расписание
NODE_ENV=production

# Private (только на сервере, для Next.js API routes)
BACKEND_URL=http://schoolschedule.railway.internal/api
```

### Backend

```bash
# Твои переменные бэкенда
DATABASE_URL=...
JWT_SECRET=...
# и т.д.
```

## Как работает проксирование

```
[Браузер] --HTTPS--> [Next.js Frontend на Railway]
                            |
                            | HTTP (внутренняя сеть Railway)
                            v
                     [Backend на Railway]
                     (schoolschedule.railway.internal)
```

1. **Клиент → Frontend**: HTTPS (безопасно, публичный интернет)
2. **Frontend API Routes → Backend**: HTTP (безопасно, внутри Railway сети)
3. **Backend → Frontend**: HTTP (внутри сети)
4. **Frontend → Клиент**: HTTPS (безопасно)

## Endpoints

### Клиентские запросы (из браузера)
- `GET /api/proxy/schedule` → проксируется на бэкенд
- `GET /api/proxy/classes` → проксируется на бэкенд
- `POST /api/auth/login` → мок или проксируется

### Прямые запросы на бэкенд (не используются в браузере)
- ❌ `http://schoolschedule.railway.internal/api/schedule` - blocked by mixed content
- ✅ `/api/proxy/schedule` - работает через Next.js proxy

## Проверка

После деплоя проверь в браузере:
```javascript
// В консоли браузера
fetch('/api/proxy/schedule', { credentials: 'include' })
  .then(r => r.json())
  .then(console.log)
```

Не должно быть ошибок Mixed Content! ✅
